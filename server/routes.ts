import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuizScoreSchema, insertDailyChallengeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Login failed" });
    }
  });

  // Quiz score routes
  app.post("/api/quiz/score", async (req, res) => {
    try {
      const scoreData = insertQuizScoreSchema.parse(req.body);
      const score = await storage.createQuizScore(scoreData);
      res.json({ success: true, score });
    } catch (error) {
      res.status(400).json({ message: "Failed to save score" });
    }
  });

  app.get("/api/quiz/scores/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const scores = await storage.getUserScores(userId);
      res.json(scores);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch scores" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const difficulty = req.query.difficulty as string;
      const leaderboard = await storage.getLeaderboard(difficulty);
      res.json(leaderboard);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Daily challenge routes
  app.get("/api/daily-challenge/:userId/:date", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const date = req.params.date;
      const challenge = await storage.getDailyChallenge(userId, date);
      res.json(challenge || null);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch daily challenge" });
    }
  });

  app.post("/api/daily-challenge", async (req, res) => {
    try {
      const challengeData = insertDailyChallengeSchema.parse(req.body);
      const challenge = await storage.createDailyChallenge(challengeData);
      res.json({ success: true, challenge });
    } catch (error) {
      res.status(400).json({ message: "Failed to save daily challenge" });
    }
  });

  app.put("/api/daily-challenge/:userId/:date", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const date = req.params.date;
      const { completed, score } = req.body;
      const challenge = await storage.updateDailyChallenge(userId, date, completed, score);
      res.json({ success: true, challenge });
    } catch (error) {
      res.status(400).json({ message: "Failed to update daily challenge" });
    }
  });

  // User progress routes
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getUserProgress(userId);
      res.json(progress || null);
    } catch (error) {
      res.status(400).json({ message: "Failed to fetch progress" });
    }
  });

  app.put("/api/progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progressData = req.body;
      const progress = await storage.updateUserProgress(userId, progressData);
      res.json({ success: true, progress });
    } catch (error) {
      res.status(400).json({ message: "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
