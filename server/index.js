import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
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
    return res.status(201).json(result);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Unexpected server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await signInUser(req.body, usersCollection);
    return res.json({ success: true, message: "Login successful", user: result });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
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
  try {
    const result = await saveTodayUserMood(req.body, userHealthCollection);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

function validateEmail(email) {
  const trimmed = String(email || "").trim().toLowerCase();
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return trimmed && emailRegex.test(trimmed) ? trimmed : null;
}

async function registerUser({ email, password }, usersCollection) {
  const normalizedEmail = validateEmail(email);
  const normalizedPassword = String(password || "").trim();

  if (!normalizedEmail) {
    const error = new Error("A valid email is required.");
    error.statusCode = 400;
    throw error;
  }

  if (!normalizedPassword || normalizedPassword.length < 8) {
    const error = new Error("Password is required and must be at least 8 characters.");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await usersCollection.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error("A user with this email already exists.");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(normalizedPassword, 10);
  const userDocument = {
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date(),
  };

  const result = await usersCollection.insertOne(userDocument);
  return {
    success: true,
    message: "User created successfully.",
    user: {
      id: result.insertedId,
      email: normalizedEmail,
      createdAt: userDocument.createdAt,
    },
  };
}

async function signInUser({ email, password }, usersCollection) {
  const normalizedEmail = validateEmail(email);
  const normalizedPassword = String(password || "").trim();

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Email and password are required.");
  }

  const user = await usersCollection.findOne({ email: normalizedEmail });
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatch = await bcrypt.compare(normalizedPassword, user.passwordHash || "");
  if (!passwordMatch) {
    throw new Error("Invalid email or password.");
  }

  return {
    id: user._id,
    email: user.email,
    createdAt: user.createdAt,
  };
}

// Implement reading today's mood entry for the signed-in user from user_health.
async function getTodayUserMood() {}

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
