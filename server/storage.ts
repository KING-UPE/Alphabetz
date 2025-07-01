import { users, quizScores, dailyChallenges, userProgress, type User, type InsertUser, type QuizScore, type InsertQuizScore, type DailyChallenge, type InsertDailyChallenge, type UserProgress, type InsertUserProgress } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz Scores
  createQuizScore(score: InsertQuizScore): Promise<QuizScore>;
  getUserScores(userId: number): Promise<QuizScore[]>;
  getLeaderboard(difficulty?: string): Promise<Array<{ username: string; bestScore: number; totalPoints: number }>>;
  
  // Daily Challenges
  getDailyChallenge(userId: number, date: string): Promise<DailyChallenge | undefined>;
  createDailyChallenge(challenge: InsertDailyChallenge): Promise<DailyChallenge>;
  updateDailyChallenge(userId: number, date: string, completed: boolean, score?: number): Promise<DailyChallenge>;
  
  // User Progress
  getUserProgress(userId: number): Promise<UserProgress | undefined>;
  updateUserProgress(userId: number, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizScores: Map<number, QuizScore>;
  private dailyChallenges: Map<number, DailyChallenge>;
  private userProgress: Map<number, UserProgress>;
  private currentId: number;
  private currentScoreId: number;
  private currentChallengeId: number;
  private currentProgressId: number;

  constructor() {
    this.users = new Map();
    this.quizScores = new Map();
    this.dailyChallenges = new Map();
    this.userProgress = new Map();
    this.currentId = 1;
    this.currentScoreId = 1;
    this.currentChallengeId = 1;
    this.currentProgressId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createQuizScore(insertScore: InsertQuizScore): Promise<QuizScore> {
    const id = this.currentScoreId++;
    const score: QuizScore = {
      ...insertScore,
      id,
      createdAt: new Date()
    };
    this.quizScores.set(id, score);
    return score;
  }

  async getUserScores(userId: number): Promise<QuizScore[]> {
    return Array.from(this.quizScores.values()).filter(
      (score) => score.userId === userId
    );
  }

  async getLeaderboard(difficulty?: string): Promise<Array<{ username: string; bestScore: number; totalPoints: number }>> {
    const scores = Array.from(this.quizScores.values());
    const filteredScores = difficulty 
      ? scores.filter(score => score.difficulty === difficulty)
      : scores;

    const userScores = new Map<number, { bestScore: number; totalPoints: number }>();
    
    filteredScores.forEach(score => {
      const existing = userScores.get(score.userId);
      if (!existing) {
        userScores.set(score.userId, {
          bestScore: score.score,
          totalPoints: score.score
        });
      } else {
        userScores.set(score.userId, {
          bestScore: Math.max(existing.bestScore, score.score),
          totalPoints: existing.totalPoints + score.score
        });
      }
    });

    const leaderboard = [];
    for (const [userId, data] of userScores.entries()) {
      const user = await this.getUser(userId);
      if (user) {
        leaderboard.push({
          username: user.username,
          bestScore: data.bestScore,
          totalPoints: data.totalPoints
        });
      }
    }

    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
  }

  async getDailyChallenge(userId: number, date: string): Promise<DailyChallenge | undefined> {
    return Array.from(this.dailyChallenges.values()).find(
      (challenge) => challenge.userId === userId && challenge.date === date
    );
  }

  async createDailyChallenge(insertChallenge: InsertDailyChallenge): Promise<DailyChallenge> {
    const id = this.currentChallengeId++;
    const challenge: DailyChallenge = {
      ...insertChallenge,
      id,
      createdAt: new Date()
    };
    this.dailyChallenges.set(id, challenge);
    return challenge;
  }

  async updateDailyChallenge(userId: number, date: string, completed: boolean, score?: number): Promise<DailyChallenge> {
    const existing = await this.getDailyChallenge(userId, date);
    if (existing) {
      existing.completed = completed;
      if (score !== undefined) existing.score = score;
      this.dailyChallenges.set(existing.id, existing);
      return existing;
    } else {
      return await this.createDailyChallenge({
        userId,
        completed,
        score,
        date
      });
    }
  }

  async getUserProgress(userId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      (progress) => progress.userId === userId
    );
  }

  async updateUserProgress(userId: number, progressData: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userId);
    if (existing) {
      const updated = { ...existing, ...progressData, updatedAt: new Date() };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentProgressId++;
      const progress: UserProgress = {
        id,
        userId,
        practiceCompleted: 0,
        flashcardsViewed: 0,
        totalStudyTime: 0,
        ...progressData,
        updatedAt: new Date()
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }
}

export const storage = new MemStorage();
