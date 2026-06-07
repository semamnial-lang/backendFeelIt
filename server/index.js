import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import validator from "validator";
import {
  connectToDatabase,
  getDb,
  getCollections,
  getUsersCollection,
  getUserHealthCollection,
} from "./db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
let isDbConnected = false;
let usersCollection = null;
let userHealthCollection = null;
try {
  await connectToDatabase();
  usersCollection = getUsersCollection();
  userHealthCollection = getUserHealthCollection();
  isDbConnected = true;
} catch (error) {
  if (error?.message?.includes("ENOTFOUND")) {
    console.error(
      "MongoDB connection failed: DNS could not resolve the Atlas hostname. Check MONGODB_URI cluster host and internet/DNS settings.",
    );
  } else {
    console.error("MongoDB connection failed:", error.message);
  }
}

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/health", (req, res) => {
  if (!isDbConnected) {
    return res.status(503).json({
      status: "degraded",
      dbConnected: false,
      message: "Database is not connected",
    });
  }

  const db = getDb();
  const collections = Object.keys(getCollections());
  return res.json({
    status: "ok",
    dbConnected: true,
    databaseName: db.databaseName,
    declaredCollectionsConnected: {
      users: Boolean(usersCollection),
      user_health: Boolean(userHealthCollection),
    },
    collections,
  });
});

app.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body, usersCollection);
    const { statusCode, success, message, user } = result;

    return res.status(statusCode).json({
      success,
      message,
      ...(user && { user }),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await signInUser(req.body, usersCollection);
    return res.status(200).json({
      success: true,
      message: "Signed in successfully.",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid email or password.",
    });
  }
});

app.get("/user-health/today", async (req, res) => {
  try {
    const result = await getTodayUserMood(req.query.email, userHealthCollection);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.post("/user-health/today", async (req, res) => {
  await saveTodayUserMood(req.body, userHealthCollection);
  res.status(501).json({ message: "saveTodayUserMood not implemented yet" });
});

async function registerUser(body, collection) {
  if (!collection) {
    return {
      success: false,
      statusCode: 500,
      message: "Database collection is not initialized.",
    };
  }

  const { email, password, name } = body;

  if (!email || !password) {
    return {
      success: false,
      statusCode: 400,
      message: "Email and password are required.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (!validator.isEmail(normalizedEmail)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid email format.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      statusCode: 400,
      message: "Password must be at least 8 characters long.",
    };
  }

  try {
    const existingUser = await collection.findOne({ email: normalizedEmail });
    if (existingUser) {
      return {
        success: false,
        statusCode: 409,
        message: "User with this email already exists.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: normalizedEmail,
      passwordHash: hashedPassword,
      name: name || null,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);

    return {
      success: true,
      statusCode: 201,
      message: "User registered successfully.",
      user: {
        _id: result.insertedId,
        email: newUser.email,
        name: newUser.name,
      },
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "An internal server error occurred during registration.",
    };
  }
}

async function signInUser(credentials, collection) {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (!collection) {
    throw new Error("Users collection is not initialized.");
  }

  const user = await collection.findOne({ email: email.trim().toLowerCase() });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash || user.password,
  );
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  return {
    _id: user._id,
    email: user.email,
    name: user.name,
  };
}

// Implement reading today's mood entry for the signed-in user from user_health.
async function getTodayUserMood(email, userHealthCollection) {
  const normalizedEmail = validateEmail(email);
  if (!normalizedEmail) {
    throw new Error("Email is required.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const record = await userHealthCollection.findOne({ email: normalizedEmail, date: today });

  if (!record) {
    return {
      answeredToday: false,
      email: normalizedEmail,
      mood: null,
      note: "",
      date: today,
      startDate: null,
    };
  }

  return {
    answeredToday: true,
    email: record.email,
    mood: record.mood,
    note: record.note || "",
    date: record.date,
    startDate: record.startDate || record.date,
  };
}

// Implement upserting today's mood entry for the signed-in user into user_health.
async function saveTodayUserMood({ email, mood, note }, userHealthCollection) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!normalizedEmail) {
    throw new Error("Email is required.");
  }
  if (!mood) {
    throw new Error("Mood is required.");
  }

  const today = new Date().toISOString().slice(0, 10);
  const existing = await userHealthCollection.findOne({ email: normalizedEmail, date: today });
  const startDate = existing?.startDate || today;

  await userHealthCollection.updateOne(
    { email: normalizedEmail, date: today },
    {
      $set: {
        email: normalizedEmail,
        mood,
        note: String(note || ""),
        date: today,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
        startDate,
      },
    },
    { upsert: true },
  );

  return {
    answeredToday: true,
    email: normalizedEmail,
    mood,
    note: String(note || ""),
    date: today,
    startDate,
  };
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
