import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizScores = pgTable("quiz_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  correct: integer("correct").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dailyChallenges = pgTable("daily_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  completed: boolean("completed").default(false).notNull(),
  score: integer("score"),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  practiceCompleted: integer("practice_completed").default(0).notNull(),
  flashcardsViewed: integer("flashcards_viewed").default(0).notNull(),
  totalStudyTime: integer("total_study_time").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizScoreSchema = createInsertSchema(quizScores).pick({
  userId: true,
  difficulty: true,
  score: true,
  correct: true,
  total: true,
});

export const insertDailyChallengeSchema = createInsertSchema(dailyChallenges).pick({
  userId: true,
  completed: true,
  score: true,
  date: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).pick({
  userId: true,
  practiceCompleted: true,
  flashcardsViewed: true,
  totalStudyTime: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizScore = typeof quizScores.$inferSelect;
export type InsertQuizScore = z.infer<typeof insertQuizScoreSchema>;
export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type InsertDailyChallenge = z.infer<typeof insertDailyChallengeSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
