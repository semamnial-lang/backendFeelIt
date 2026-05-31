import { MongoClient } from "mongodb";

const DEFAULT_DB_NAME = process.env.DB_NAME || "feelit";

const COLLECTION_DEFINITIONS = [
  {
    name: "users",
    indexes: [
      {
        key: { email: 1 },
        options: { unique: true, name: "users_unique_email" },
      },
    ],
  },
  {
    name: "user_health",
    indexes: [
      { key: { userId: 1 }, options: { name: "user_health_user" } },
      {
        key: { userId: 1, createdAt: -1 },
        options: { name: "user_health_user_created" },
      },
    ],
  },
];

let client = null;
let db = null;
let collections = {};

const fallbackData = {
  users: [],
  user_health: [],
};

function createObjectId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function matchesFilter(document, filter) {
  return Object.entries(filter).every(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      return Object.entries(value).every(([operator, compareValue]) => {
        if (operator === "$eq") {
          return document[key] === compareValue;
        }
        return false;
      });
    }

    return document[key] === value;
  });
}

function createFallbackCollection(name) {
  if (!fallbackData[name]) {
    fallbackData[name] = [];
  }

  const storage = fallbackData[name];
  return {
    async insertOne(document) {
      const doc = { ...document, _id: createObjectId() };
      storage.push(doc);
      return { insertedId: doc._id };
    },

    async findOne(filter) {
      return storage.find((doc) => matchesFilter(doc, filter)) || null;
    },

    async updateOne(filter, update, options = {}) {
      const existing = storage.find((doc) => matchesFilter(doc, filter));

      if (existing) {
        if (update.$set) {
          Object.assign(existing, update.$set);
        }
        return { matchedCount: 1, modifiedCount: 1, upsertedId: null };
      }

      if (options.upsert) {
        const newDoc = { ...filter, _id: createObjectId() };
        if (update.$setOnInsert) {
          Object.assign(newDoc, update.$setOnInsert);
        }
        if (update.$set) {
          Object.assign(newDoc, update.$set);
        }
        storage.push(newDoc);
        return { matchedCount: 0, modifiedCount: 0, upsertedId: newDoc._id };
      }

      return { matchedCount: 0, modifiedCount: 0, upsertedId: null };
    },

    async createIndex() {
      return null;
    },
  };
}

function createFallbackDatabase() {
  return {
    databaseName: DEFAULT_DB_NAME,
    async listCollections() {
      return {
        toArray: async () =>
          Object.keys(fallbackData).map((name) => ({ name })),
      };
    },
    async createCollection(name) {
      if (!fallbackData[name]) {
        fallbackData[name] = [];
      }
    },
    collection(name) {
      return createFallbackCollection(name);
    },
  };
}

async function ensureCollections(database) {
  const existing = await database
    .listCollections({}, { nameOnly: true })
    .toArray();
  const existingNames = new Set(existing.map((item) => item.name));

  for (const definition of COLLECTION_DEFINITIONS) {
    if (!existingNames.has(definition.name)) {
      await database.createCollection(definition.name);
      console.log(`Created collection: ${definition.name}`);
    }

    const collection = database.collection(definition.name);
    for (const indexDefinition of definition.indexes) {
      await collection.createIndex(
        indexDefinition.key,
        indexDefinition.options,
      );
    }

    collections[definition.name] = collection;
  }
}

export async function connectToDatabase() {
  if (db) {
    return { client, db, collections };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not set. Starting in-memory fallback database.");
    client = { close: async () => {} };
    db = createFallbackDatabase();
    await ensureCollections(db);

    console.log(`Using fallback database: ${db.databaseName}`);
    return { client, db, collections };
  }

  client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });

  try {
    await client.connect();
    db = client.db(DEFAULT_DB_NAME);
    await ensureCollections(db);

    console.log(`MongoDB connected: ${db.databaseName}`);
    return { client, db, collections };
  } catch (error) {
    console.warn("MongoDB connection failed, using fallback database:", error.message);
    client = { close: async () => {} };
    db = createFallbackDatabase();
    await ensureCollections(db);

    console.log(`Using fallback database: ${db.databaseName}`);
    return { client, db, collections };
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database is not connected. Call connectToDatabase first.");
  }
  return db;
}

export function getCollections() {
  if (!db) {
    throw new Error("Database is not connected. Call connectToDatabase first.");
  }
  return collections;
}

export function getUsersCollection() {
  if (!collections.users) {
    throw new Error(
      "users collection is not initialized. Call connectToDatabase first.",
    );
  }
  return collections.users;
}

export function getUserHealthCollection() {
  if (!collections.user_health) {
    throw new Error(
      "user_health collection is not initialized. Call connectToDatabase first.",
    );
  }
  return collections.user_health;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    collections = {};
  }
}
