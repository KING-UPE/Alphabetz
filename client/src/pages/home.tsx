import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';
import { User, ArrowLeft, BookOpen, Vote, Users, Clock, Calendar, RotateCcw, Volume2, CheckCircle, XCircle, Trophy, Star, Home, Settings, Brain, Target, Zap, Award, Globe, ChevronLeft, ChevronRight, Shuffle, Play, Pause } from 'lucide-react';

// Language Context
const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Auth Context
const AuthContext = createContext<{
  user: any;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loading: boolean;
  updateUserScores: (score: any) => void;
  updateDailyChallenge: (completed: boolean, score?: number) => void;
}>({
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  loading: false,
  updateUserScores: () => {},
  updateDailyChallenge: () => {},
});

// Translations Data
const translations = {
  en: {
    welcome: "Welcome to",
    appName: "AlphabetZ",
    tagline: "Learn English tenses or test your knowledge with our fun quiz. Choose your path below!",
    learnTenses: "Learn Tenses",
    takeAQuiz: "Take a Vote",
    chooseVoice: "Choose a Voice",
    activeVoice: "Active Voice",
    activeVoiceDesc: "The subject performs the action.",
    passiveVoice: "Passive Voice",
    passiveVoiceDesc: "The subject receives the action.",
    back: "Back",
    voiceTenses: "Voice Tenses",
    rule: "RULE",
    examples: "Examples:",
    listen: "Listen",
    chooseDifficulty: "Choose a Difficulty",
    easy: "Easy",
    easyDesc: "Basic tenses and simple sentences.",
    medium: "Medium",
    mediumDesc: "More complex tenses and structures.",
    hard: "Hard",
    hardDesc: "Challenging questions with mixed tenses.",
    loadingQuiz: "Loading Vote...",
    question: "Question",
    score: "Score",
    nextQuestion: "Next Question",
    finishQuiz: "Finish Vote",
    quizComplete: "Vote Complete!",
    yourScore: "Your Score:",
    tryAgain: "Try Again",
    goHome: "Go Home",
    mistakeReview: "Mistake Review",
    yourAnswer: "Your Answer:",
    correctAnswer: "Correct Answer:",
    perfectScore: "Perfect Score! You're a tenses master!",
    greatJob: "Great job! You really know your tenses.",
    goodTry: "Good try! A little more practice will help.",
    keepPracticing: "Keep practicing! You'll get it.",
    practiceMode: "Practice Mode",
    tenseConverter: "Tense Converter",
    timeline: "Timeline Visualization",
    flashcards: "Flashcards",
    dailyChallenge: "Daily Challenge",
    inputSentence: "Input Sentence:",
    originalTense: "Original Tense:",
    targetTense: "Target Tense:",
    convert: "Convert",
    convertedSentence: "Converted Sentence:",
    selectTense: "Select Tense",
    selectVoice: "Select Voice",
    active: "Active",
    passive: "Passive",
    fillInTheBlank: "Fill in the blank:",
    checkAnswer: "Check Answer",
    correct: "Correct!",
    incorrect: "Incorrect. Try again.",
    nextPractice: "Next Practice",
    showAnswer: "Show Answer",
    front: "Front:",
    flashcardBack: "Back:",
    flip: "Flip",
    nextCard: "Next Card",
    previousCard: "Previous Card",
    dailyChallengeTitle: "Daily Tenses Challenge",
    challengeComplete: "You've completed today's challenge!",
    comeBackTomorrow: "Come back tomorrow for a new challenge!",
    startChallenge: "Start Today's Challenge",
    viewScores: "View Scores",
    recentScores: "Recent Scores",
    bestScore: "Best Score:",
    noScoresYet: "No scores yet.",
    login: "Login",
    logout: "Logout",
    register: "Register",
    username: "Username",
    password: "Password",
    notAMember: "Not a member?",
    alreadyAMember: "Already a member?",
    loginSuccess: "Login successful!",
    registerSuccess: "Registration successful! You are now logged in.",
    loginFailed: "Login failed. Please check your credentials.",
    registerFailed: "Registration failed. Please try again.",
    loggedInAs: "Logged in as",
    leaderboard: "Leaderboard",
    yourRank: "Your Rank:",
    rank: "Rank",
    usernameCol: "Username",
    scoreCol: "Score",
    loading: "Loading...",
    dashboard: "Dashboard",
    timelineDescription: "Visualize how different tenses relate to each other on a timeline.",
    flashcardsDescription: "Test your knowledge of tense rules with interactive flashcards.",
    dailyChallengeDescription: "Take a quick daily quiz to keep your skills sharp.",
    practiceModeDescription: "Fill in the blanks to practice your tenses.",
    tenseConverterDescription: "Convert sentences between different tenses.",
    viewLeaderboard: "View Leaderboard",
  },
  si: {
    welcome: "සාදරයෙන් පිළිගනිමු",
    appName: "ඇල්ෆබෙට්Z",
    tagline: "ඉංග්‍රීසි කාලරූප ඉගෙන ගන්න හෝ අපගේ විනෝදජනක ප්‍රශ්නාවලිය සමඟ ඔබේ දැනුම පරීක්ෂා කරන්න!",
    learnTenses: "කාලරූප ඉගෙන ගන්න",
    takeAQuiz: "ප්‍රශ්නාවලියක් කරන්න",
    login: "ප්‍රවේශය",
    register: "ලියාපදිංචිය",
    username: "පරිශීලක නාමය",
    password: "මුරපදය",
    back: "ආපසු",
    dashboard: "උපකරණ පුවරුව"
  }
};

// Tense Data
const tenseData = {
  active: {
    "Simple Present": {
      rule: "Subject + Base form of verb (+ s/es for 3rd person singular)",
      examples: ["I eat breakfast.", "She plays tennis.", "They work hard."],
      structure: "Subject + V1 (+s/es)"
    },
    "Present Continuous": {
      rule: "Subject + am/is/are + verb + ing",
      examples: ["I am eating breakfast.", "She is playing tennis.", "They are working hard."],
      structure: "Subject + am/is/are + V-ing"
    },
    "Present Perfect": {
      rule: "Subject + have/has + past participle",
      examples: ["I have eaten breakfast.", "She has played tennis.", "They have worked hard."],
      structure: "Subject + have/has + V3"
    },
    "Simple Past": {
      rule: "Subject + Past form of verb",
      examples: ["I ate breakfast.", "She played tennis.", "They worked hard."],
      structure: "Subject + V2"
    },
    "Past Continuous": {
      rule: "Subject + was/were + verb + ing",
      examples: ["I was eating breakfast.", "She was playing tennis.", "They were working hard."],
      structure: "Subject + was/were + V-ing"
    },
    "Past Perfect": {
      rule: "Subject + had + past participle",
      examples: ["I had eaten breakfast.", "She had played tennis.", "They had worked hard."],
      structure: "Subject + had + V3"
    },
    "Simple Future": {
      rule: "Subject + will + base form of verb",
      examples: ["I will eat breakfast.", "She will play tennis.", "They will work hard."],
      structure: "Subject + will + V1"
    },
    "Future Continuous": {
      rule: "Subject + will be + verb + ing",
      examples: ["I will be eating breakfast.", "She will be playing tennis.", "They will be working hard."],
      structure: "Subject + will be + V-ing"
    },
    "Future Perfect": {
      rule: "Subject + will have + past participle",
      examples: ["I will have eaten breakfast.", "She will have played tennis.", "They will have worked hard."],
      structure: "Subject + will have + V3"
    }
  },
  passive: {
    "Simple Present": {
      rule: "Subject + am/is/are + past participle",
      examples: ["Breakfast is eaten by me.", "Tennis is played by her.", "Hard work is done by them."],
      structure: "Subject + am/is/are + V3"
    },
    "Present Continuous": {
      rule: "Subject + am/is/are + being + past participle",
      examples: ["Breakfast is being eaten by me.", "Tennis is being played by her.", "Hard work is being done by them."],
      structure: "Subject + am/is/are + being + V3"
    },
    "Present Perfect": {
      rule: "Subject + have/has + been + past participle",
      examples: ["Breakfast has been eaten by me.", "Tennis has been played by her.", "Hard work has been done by them."],
      structure: "Subject + have/has + been + V3"
    },
    "Simple Past": {
      rule: "Subject + was/were + past participle",
      examples: ["Breakfast was eaten by me.", "Tennis was played by her.", "Hard work was done by them."],
      structure: "Subject + was/were + V3"
    },
    "Past Continuous": {
      rule: "Subject + was/were + being + past participle",
      examples: ["Breakfast was being eaten by me.", "Tennis was being played by her.", "Hard work was being done by them."],
      structure: "Subject + was/were + being + V3"
    },
    "Past Perfect": {
      rule: "Subject + had + been + past participle",
      examples: ["Breakfast had been eaten by me.", "Tennis had been played by her.", "Hard work had been done by them."],
      structure: "Subject + had + been + V3"
    },
    "Simple Future": {
      rule: "Subject + will be + past participle",
      examples: ["Breakfast will be eaten by me.", "Tennis will be played by her.", "Hard work will be done by them."],
      structure: "Subject + will be + V3"
    },
    "Future Perfect": {
      rule: "Subject + will have been + past participle",
      examples: ["Breakfast will have been eaten by me.", "Tennis will have been played by her.", "Hard work will have been done by them."],
      structure: "Subject + will have been + V3"
    }
  }
};

// Vote Questions
const quizQuestions = {
  easy: [
    {
      question: "What is the correct form of 'eat' in present continuous?",
      options: ["eating", "ate", "eaten", "eats"],
      correct: 0,
      explanation: "Present continuous uses the -ing form of the verb."
    },
    {
      question: "Choose the correct sentence:",
      options: ["I am go to school", "I goes to school", "I go to school", "I going to school"],
      correct: 2,
      explanation: "Simple present tense uses the base form of the verb."
    },
    {
      question: "Which is the past tense of 'run'?",
      options: ["running", "runs", "ran", "runned"],
      correct: 2,
      explanation: "'Ran' is the past tense of 'run'."
    },
    {
      question: "Complete: 'She ___ to school every day.'",
      options: ["go", "goes", "going", "gone"],
      correct: 1,
      explanation: "Third person singular uses 'goes' in simple present."
    },
    {
      question: "What tense is 'I will call you tomorrow'?",
      options: ["Present", "Past", "Future", "Perfect"],
      correct: 2,
      explanation: "'Will' indicates future tense."
    }
  ],
  medium: [
    {
      question: "What is the correct passive voice of 'She writes a letter'?",
      options: ["A letter is written by her", "A letter was written by her", "A letter is writing by her", "A letter written by her"],
      correct: 0,
      explanation: "Present tense active voice converts to present tense passive voice."
    },
    {
      question: "Choose the correct present perfect sentence:",
      options: ["I have went there", "I have gone there", "I has gone there", "I have go there"],
      correct: 1,
      explanation: "Present perfect uses 'have/has + past participle'."
    },
    {
      question: "Which sentence shows past continuous tense?",
      options: ["I was sleeping", "I slept", "I have slept", "I sleep"],
      correct: 0,
      explanation: "Past continuous uses 'was/were + verb-ing'."
    },
    {
      question: "Complete: 'By the time you arrive, I ___ my homework.'",
      options: ["will finish", "will have finished", "am finishing", "have finished"],
      correct: 1,
      explanation: "Future perfect shows an action completed before another future action."
    },
    {
      question: "Which is correct for habitual past actions?",
      options: ["I was playing", "I used to play", "I have played", "I will play"],
      correct: 1,
      explanation: "'Used to' expresses past habits or states."
    }
  ],
  hard: [
    {
      question: "Convert to passive: 'They will have completed the project by tomorrow.'",
      options: ["The project will have been completed by them by tomorrow", "The project will be completed by them by tomorrow", "The project has been completed by them by tomorrow", "The project was completed by them by tomorrow"],
      correct: 0,
      explanation: "Future perfect active becomes 'will have been + past participle' in passive."
    },
    {
      question: "Which sentence correctly uses past perfect continuous?",
      options: ["I had been working for 3 hours", "I have been working for 3 hours", "I was working for 3 hours", "I will have been working for 3 hours"],
      correct: 0,
      explanation: "Past perfect continuous uses 'had been + verb-ing'."
    },
    {
      question: "Choose the correct conditional sentence:",
      options: ["If I would have money, I will buy it", "If I had money, I would buy it", "If I have money, I would buy it", "If I will have money, I buy it"],
      correct: 1,
      explanation: "Second conditional uses 'If + past tense, would + base verb'."
    },
    {
      question: "Identify the tense: 'He had been studying before the exam started.'",
      options: ["Past Perfect", "Past Perfect Continuous", "Past Continuous", "Present Perfect Continuous"],
      correct: 1,
      explanation: "Past perfect continuous shows ongoing action before another past action."
    },
    {
      question: "Which shows the correct subjunctive mood?",
      options: ["I wish I was there", "I wish I were there", "I wish I am there", "I wish I will be there"],
      correct: 1,
      explanation: "Subjunctive mood uses 'were' for all persons in hypothetical situations."
    }
  ]
};

// Practice Exercises
const practiceExercises = [
  {
    sentence: "I _____ (go) to school every day.",
    answer: "go",
    tense: "Simple Present",
    hint: "Use the base form of the verb for simple present."
  },
  {
    sentence: "She _____ (write) a letter now.",
    answer: "is writing",
    tense: "Present Continuous",
    hint: "Use am/is/are + verb-ing for present continuous."
  },
  {
    sentence: "They _____ (finish) their homework yesterday.",
    answer: "finished",
    tense: "Simple Past",
    hint: "Use the past form of the verb."
  },
  {
    sentence: "We _____ (live) here for 5 years.",
    answer: "have lived",
    tense: "Present Perfect",
    hint: "Use have/has + past participle."
  },
  {
    sentence: "He _____ (play) football when it started raining.",
    answer: "was playing",
    tense: "Past Continuous",
    hint: "Use was/were + verb-ing."
  },
  {
    sentence: "By next month, I _____ (complete) the course.",
    answer: "will have completed",
    tense: "Future Perfect",
    hint: "Use will have + past participle."
  }
];

// Flashcards Data
const flashcardsData = [
  {
    front: "Simple Present Tense",
    back: "Used for habits, facts, and general truths.\nStructure: Subject + V1 (+s/es for 3rd person)\nExample: I play tennis every day."
  },
  {
    front: "Present Continuous Tense",
    back: "Used for actions happening now or temporary situations.\nStructure: Subject + am/is/are + V-ing\nExample: I am playing tennis now."
  },
  {
    front: "Past Simple Tense",
    back: "Used for completed actions in the past.\nStructure: Subject + V2\nExample: I played tennis yesterday."
  },
  {
    front: "Present Perfect Tense",
    back: "Used for past actions with present relevance.\nStructure: Subject + have/has + V3\nExample: I have played tennis."
  },
  {
    front: "Future Simple Tense",
    back: "Used for future actions and predictions.\nStructure: Subject + will + V1\nExample: I will play tennis tomorrow."
  },
  {
    front: "Past Continuous Tense",
    back: "Used for ongoing actions in the past.\nStructure: Subject + was/were + V-ing\nExample: I was playing tennis when it rained."
  },
  {
    front: "Present Perfect Continuous",
    back: "Used for actions that started in the past and continue now.\nStructure: Subject + have/has + been + V-ing\nExample: I have been playing tennis for 2 hours."
  },
  {
    front: "Future Perfect Tense",
    back: "Used for actions that will be completed before a future time.\nStructure: Subject + will have + V3\nExample: I will have finished by 6 PM."
  }
];

// Auth Provider Component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const data = await response.json();

      if (data.success) {
        const userData = {
          ...data.user,
          scores: [],
          dailyChallenge: { completed: false, date: null }
        };
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error or server issue' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/register', { username, password });
      const data = await response.json();

      if (data.success) {
        const userData = {
          ...data.user,
          scores: [],
          dailyChallenge: { completed: false, date: null }
        };
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error or server issue' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserScores = async (newScore: any) => {
    if (user) {
      try {
        await apiRequest('POST', '/api/quiz/score', {
          userId: user.id,
          difficulty: newScore.difficulty,
          score: newScore.score,
          correct: newScore.correct,
          total: newScore.total
        });

        const updatedScores = [...(user.scores || []), newScore];
        const updatedUser = { ...user, scores: updatedScores };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to save score:', error);
      }
    }
  };

  const updateDailyChallenge = async (completed: boolean, score?: number) => {
    if (user) {
      try {
        const today = new Date().toDateString();
        await apiRequest('PUT', `/api/daily-challenge/${user.id}/${today}`, {
          completed,
          score
        });

        const challengeData = { completed, date: today, score };
        const updatedUser = { ...user, dailyChallenge: challengeData };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to update daily challenge:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      updateUserScores,
      updateDailyChallenge
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Language Provider Component
const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Header Component
const Header: React.FC<{
  goBack?: () => void;
  goHome: () => void;
  currentScreen: string;
}> = ({ goBack, goHome, currentScreen }) => {
  const { language, setLanguage, t } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {goBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="p-2 hover:bg-slate-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div
              onClick={goHome}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">{t('appName')}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="si">සිංහල</SelectItem>
              </SelectContent>
            </Select>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">
                  {t('loggedInAs')} <span className="font-medium text-slate-800">{user.username}</span>
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            ) : (
              currentScreen !== 'login' && currentScreen !== 'register' && (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    {t('login')}
                  </Button>
                  <Button size="sm">
                    {t('register')}
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Main Application Component
const AlphabetZApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenStack, setScreenStack] = useState(['home']);
  const [selectedVoice, setSelectedVoice] = useState<'active' | 'passive'>('active');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentQuizData, setCurrentQuizData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [currentPractice, setCurrentPractice] = useState(0);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [practiceResult, setPracticeResult] = useState<{ correct: boolean; message: string } | null>(null);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ username: '', password: '' });
  const [authMessage, setAuthMessage] = useState('');
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [converterInput, setConverterInput] = useState('');
  const [converterOutput, setConverterOutput] = useState('');
  const [originalTense, setOriginalTense] = useState('');
  const [targetTense, setTargetTense] = useState('');

  const { t } = useContext(LanguageContext);
  const { user, login, register, loading, updateUserScores, updateDailyChallenge } = useContext(AuthContext);

  const navigateTo = (screen: string, addToStack = true) => {
    setCurrentScreen(screen);
    if (addToStack) {
      setScreenStack(prev => [...prev, screen]);
    }
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      const newStack = screenStack.slice(0, -1);
      setScreenStack(newStack);
      setCurrentScreen(newStack[newStack.length - 1]);
    }
  };

  const goHome = () => {
    setCurrentScreen('home');
    setScreenStack(['home']);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startQuiz = (difficulty: 'easy' | 'medium' | 'hard') => {
    const questions = quizQuestions[difficulty];
    setCurrentQuizData({
      difficulty,
      questions: [...questions],
      currentIndex: 0,
      score: 0,
      mistakes: []
    });
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizComplete(false);
    navigateTo('quiz');
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const question = currentQuizData.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    const newAnswer = {
      questionIndex: currentQuestion,
      selected: selectedAnswer,
      correct: question.correct,
      isCorrect
    };

    const newUserAnswers = [...userAnswers, newAnswer];
    setUserAnswers(newUserAnswers);
    setSelectedAnswer(null);

    if (currentQuestion + 1 < currentQuizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = newUserAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / currentQuizData.questions.length) * 100);
      
      if (user) {
        const scoreData = {
          difficulty: currentQuizData.difficulty,
          score,
          correct: correctAnswers,
          total: currentQuizData.questions.length,
          date: new Date().toISOString()
        };
        updateUserScores(scoreData);
      }
      
      setQuizComplete(true);
    }
  };

  const checkPracticeAnswer = () => {
    const exercise = practiceExercises[currentPractice];
    const isCorrect = practiceAnswer.toLowerCase().trim() === exercise.answer.toLowerCase().trim();
    
    setPracticeResult({
      correct: isCorrect,
      message: isCorrect ? t('correct') : `${t('incorrect')} ${t('correctAnswer')}: ${exercise.answer}`
    });
  };

  const nextPractice = () => {
    setCurrentPractice((prev) => (prev + 1) % practiceExercises.length);
    setPracticeAnswer('');
    setPracticeResult(null);
  };

  const flipFlashcard = () => {
    setFlashcardFlipped(!flashcardFlipped);
  };

  const nextFlashcard = () => {
    setCurrentFlashcard((prev) => (prev + 1) % flashcardsData.length);
    setFlashcardFlipped(false);
  };

  const prevFlashcard = () => {
    setCurrentFlashcard((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
    setFlashcardFlipped(false);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage('');
    
    const result = authMode === 'login' 
      ? await login(authForm.username, authForm.password)
      : await register(authForm.username, authForm.password);
    
    if (result.success) {
      setAuthMessage(authMode === 'login' ? t('loginSuccess') : t('registerSuccess'));
      setTimeout(() => {
        setShowAuthModal(false);
        setAuthForm({ username: '', password: '' });
        setAuthMessage('');
      }, 1000);
    } else {
      setAuthMessage(result.message || (authMode === 'login' ? t('loginFailed') : t('registerFailed')));
    }
  };

  const convertTense = () => {
    if (!converterInput.trim() || !targetTense) {
      setConverterOutput('Please enter a sentence and select target tense.');
      return;
    }

    // Simple conversion logic (in a real app, would use advanced NLP)
    let converted = converterInput;
    if (targetTense === 'Simple Past') {
      converted = converterInput.replace(/eat/, 'ate').replace(/every day/, 'yesterday');
    } else if (targetTense === 'Present Continuous') {
      converted = converterInput.replace(/eat/, 'am eating').replace(/every day/, 'right now');
    } else if (targetTense === 'Future Simple') {
      converted = converterInput.replace(/eat/, 'will eat').replace(/every day/, 'tomorrow');
    }
    
    setConverterOutput(converted);
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await apiRequest('GET', '/api/leaderboard');
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  useEffect(() => {
    if (currentScreen === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">
                {t('welcome')} <span className="text-blue-600">{t('appName')}</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t('tagline')}
              </p>
            </div>

            {!user && (
              <div className="mb-12">
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">Get Started</h3>
                  <p className="text-slate-600 mb-8">Create an account to save your progress and access advanced features.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthModal(true);
                      }}
                    >
                      {t('login')}
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => {
                        setAuthMode('register');
                        setShowAuthModal(true);
                      }}
                    >
                      {t('register')}
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => navigateTo('chooseVoice')}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t('learnTenses')}</h3>
                <p className="text-slate-600 mb-6">Master English tenses with interactive lessons and examples.</p>
                <Button className="w-full" size="lg">
                  {t('learnTenses')}
                </Button>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => navigateTo('chooseDifficulty')}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Vote className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t('takeAQuiz')}</h3>
                <p className="text-slate-600 mb-6">Test your knowledge with interactive quizzes and track your progress.</p>
                <Button className="w-full" size="lg">
                  {t('takeAQuiz')}
                </Button>
              </Card>
            </div>

            {user && user.scores && user.scores.length > 0 && (
              <Card className="p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Trophy className="mr-2 text-primary" />
                  Your Progress
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{user.scores.length}</div>
                    <div className="text-sm text-slate-600">Quizzes Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{Math.max(...user.scores.map((s: any) => s.score))}%</div>
                    <div className="text-sm text-slate-600">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">
                      {user.dailyChallenge?.completed && user.dailyChallenge?.date === new Date().toDateString() ? '✓' : '○'}
                    </div>
                    <div className="text-sm text-slate-600">Daily Challenge</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">#{Math.floor(Math.random() * 50) + 1}</div>
                    <div className="text-sm text-slate-600">Rank</div>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: t('practiceMode'), description: t('practiceModeDescription'), icon: Brain, screen: 'practiceMode' },
                { title: t('flashcards'), description: t('flashcardsDescription'), icon: Target, screen: 'flashcards' },
                { title: t('dailyChallenge'), description: t('dailyChallengeDescription'), icon: Calendar, screen: 'dailyChallenge' },
                { title: t('tenseConverter'), description: t('tenseConverterDescription'), icon: RotateCcw, screen: 'tenseConverter' },
                { title: t('timeline'), description: t('timelineDescription'), icon: Clock, screen: 'timeline' },
                { title: t('leaderboard'), description: 'See how you rank against other learners.', icon: Trophy, screen: 'leaderboard' }
              ].map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo(feature.screen)}>
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="text-primary" size={20} />
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'chooseVoice':
        return (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('chooseVoice')}</h2>
            <p className="text-xl text-slate-600 mb-12">Select which voice type you'd like to learn about</p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => {
                setSelectedVoice('active');
                navigateTo('voiceTenses');
              }}>
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t('activeVoice')}</h3>
                <p className="text-slate-600 mb-6">{t('activeVoiceDesc')}</p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-green-800 font-medium">Example:</p>
                  <p className="text-green-700">"I write a letter."</p>
                </div>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => {
                setSelectedVoice('passive');
                navigateTo('voiceTenses');
              }}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">{t('passiveVoice')}</h3>
                <p className="text-slate-600 mb-6">{t('passiveVoiceDesc')}</p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">Example:</p>
                  <p className="text-blue-700">"A letter is written by me."</p>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'voiceTenses':
        const tenses = Object.entries(tenseData[selectedVoice]);
        return (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                {selectedVoice === 'active' ? t('activeVoice') : t('passiveVoice')} - {t('voiceTenses')}
              </h2>
              <p className="text-xl text-slate-600">Learn the structure and usage of each tense</p>
            </div>

            <div className="grid gap-6">
              {tenses.map(([tenseName, tenseInfo], index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                          <Clock className="text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{tenseName}</CardTitle>
                          <p className="text-sm text-slate-600">{tenseInfo.structure}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playAudio(tenseInfo.examples[0])}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-blue-800 mb-2">{t('rule')}</h4>
                      <p className="text-blue-700">{tenseInfo.rule}</p>
                    </div>

                    <h4 className="font-semibold text-slate-800 mb-3">{t('examples')}</h4>
                    <div className="space-y-3">
                      {tenseInfo.examples.map((example, exIndex) => (
                        <div key={exIndex} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                          <p className="text-slate-700">{example}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playAudio(example)}
                            className="ml-4"
                          >
                            <Volume2 className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'chooseDifficulty':
        const difficulties = [
          {
            level: 'easy' as const,
            title: t('easy'),
            description: t('easyDesc'),
            icon: '🌱',
            color: 'from-green-400 to-emerald-600',
            questionCount: quizQuestions.easy.length
          },
          {
            level: 'medium' as const,
            title: t('medium'),
            description: t('mediumDesc'),
            icon: '🔥',
            color: 'from-yellow-400 to-orange-600',
            questionCount: quizQuestions.medium.length
          },
          {
            level: 'hard' as const,
            title: t('hard'),
            description: t('hardDesc'),
            icon: '💪',
            color: 'from-red-400 to-rose-600',
            questionCount: quizQuestions.hard.length
          }
        ];

        return (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('chooseDifficulty')}</h2>
            <p className="text-xl text-slate-600 mb-12">Select a difficulty level that matches your knowledge</p>

            <div className="grid gap-8">
              {difficulties.map((diff, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => {
                  setSelectedDifficulty(diff.level);
                  startQuiz(diff.level);
                }}>
                  <div className="flex items-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${diff.color} rounded-2xl flex items-center justify-center mr-6 text-2xl`}>
                      {diff.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl font-semibold text-slate-800 mb-2">{diff.title}</h3>
                      <p className="text-slate-600 mb-2">{diff.description}</p>
                      <p className="text-sm text-slate-500">{diff.questionCount} questions available</p>
                    </div>
                    <ArrowLeft className="transform rotate-180 text-slate-400 text-xl" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'quiz':
        if (!currentQuizData || quizComplete) {
          const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
          const score = Math.round((correctAnswers / currentQuizData.questions.length) * 100);
          const mistakes = userAnswers.filter(a => !a.isCorrect);

          return (
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('quizComplete')}</h2>
                <div className="text-4xl font-bold text-blue-600 mb-4">{score}%</div>
                <p className="text-xl text-slate-600 mb-6">{correctAnswers} out of {currentQuizData.questions.length} correct</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => startQuiz(currentQuizData.difficulty)}>
                    {t('tryAgain')}
                  </Button>
                  <Button variant="outline" onClick={() => navigateTo('leaderboard')}>
                    {t('viewLeaderboard')}
                  </Button>
                  <Button variant="outline" onClick={goHome}>
                    {t('goHome')}
                  </Button>
                </div>
              </Card>

              {mistakes.length > 0 && (
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">{t('mistakeReview')}</h3>
                  <div className="space-y-6">
                    {mistakes.map((mistake, index) => (
                      <Alert key={index} className="border-red-200 bg-red-50">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>
                          <h4 className="font-semibold text-slate-800 mb-2">
                            {t('question')} {mistake.questionIndex + 1}
                          </h4>
                          <p className="text-slate-700 mb-2">{currentQuizData.questions[mistake.questionIndex].question}</p>
                          <p className="text-red-700">
                            <span className="font-medium">{t('yourAnswer')}:</span> {currentQuizData.questions[mistake.questionIndex].options[mistake.selected]}
                          </p>
                          <p className="text-green-700">
                            <span className="font-medium">{t('correctAnswer')}:</span> {currentQuizData.questions[mistake.questionIndex].options[mistake.correct]}
                          </p>
                          {currentQuizData.questions[mistake.questionIndex].explanation && (
                            <p className="text-blue-700 mt-2">
                              <span className="font-medium">Explanation:</span> {currentQuizData.questions[mistake.questionIndex].explanation}
                            </p>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          );
        }

        const currentQ = currentQuizData.questions[currentQuestion];
        const progress = ((currentQuestion + 1) / currentQuizData.questions.length) * 100;

        return (
          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden">
              <div className="bg-slate-100 h-2">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {t('question')} {currentQuestion + 1}
                    </CardTitle>
                    <p className="text-slate-600 capitalize">{currentQuizData.difficulty} Level</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Progress</p>
                    <p className="text-lg font-semibold text-slate-800">
                      {currentQuestion + 1} / {currentQuizData.questions.length}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-slate-800 mb-6">{currentQ.question}</h3>
                  
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? "default" : "outline"}
                        className="w-full text-left justify-start p-4 h-auto"
                        onClick={() => selectAnswer(index)}
                      >
                        <span className="mr-3 font-medium">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-slate-500">
                    Select an answer to continue
                  </div>
                  <Button
                    onClick={nextQuestion}
                    disabled={selectedAnswer === null}
                  >
                    {currentQuestion + 1 === currentQuizData.questions.length ? t('finishQuiz') : t('nextQuestion')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'practiceMode':
        const exercise = practiceExercises[currentPractice];
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('practiceMode')}</h2>
              <p className="text-xl text-slate-600">{t('practiceModeDescription')}</p>
            </div>

            <Card className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-600">
                    Exercise {currentPractice + 1} of {practiceExercises.length}
                  </span>
                  <Badge variant="secondary">{exercise.tense}</Badge>
                </div>
                <Progress value={((currentPractice + 1) / practiceExercises.length) * 100} className="h-2" />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium text-slate-800 mb-4">{t('fillInTheBlank')}</h3>
                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                  <p className="text-lg text-slate-700 font-mono">{exercise.sentence}</p>
                </div>
                
                <div className="mb-4">
                  <Input
                    type="text"
                    value={practiceAnswer}
                    onChange={(e) => setPracticeAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="text-lg"
                    disabled={practiceResult !== null}
                  />
                </div>

                <div className="text-sm text-slate-600 mb-6">
                  <span className="inline-flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                    {exercise.hint}
                  </span>
                </div>

                {practiceResult && (
                  <Alert className={practiceResult.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {practiceResult.correct ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={practiceResult.correct ? "text-green-700" : "text-red-700"}>
                      {practiceResult.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {!practiceResult ? (
                  <Button
                    onClick={checkPracticeAnswer}
                    disabled={!practiceAnswer.trim()}
                    className="flex-1"
                  >
                    {t('checkAnswer')}
                  </Button>
                ) : (
                  <Button
                    onClick={nextPractice}
                    className="flex-1"
                    variant={practiceResult.correct ? "default" : "secondary"}
                  >
                    {t('nextPractice')}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        );

      case 'flashcards':
        const card = flashcardsData[currentFlashcard];
        return (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('flashcards')}</h2>
              <p className="text-xl text-slate-600">{t('flashcardsDescription')}</p>
            </div>

            <div className="mb-6 text-center">
              <span className="text-sm font-medium text-slate-600">
                Card {currentFlashcard + 1} of {flashcardsData.length}
              </span>
              <Progress value={((currentFlashcard + 1) / flashcardsData.length) * 100} className="h-2 mt-2" />
            </div>

            <div 
              className={`flip-card ${flashcardFlipped ? 'flipped' : ''} w-full h-80 mb-8 cursor-pointer`}
              onClick={flipFlashcard}
            >
              <div className="flip-card-inner">
                <Card className="flip-card-front bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                  <CardContent className="text-center p-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{t('front')}</h3>
                    <p className="text-xl font-medium mb-8">{card.front}</p>
                    <div className="text-sm opacity-75">
                      Click to flip
                    </div>
                  </CardContent>
                </Card>
                <Card className="flip-card-back bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
                  <CardContent className="text-center p-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{t('flashcardBack')}</h3>
                    <div className="text-left text-sm whitespace-pre-line">{card.back}</div>
                    <div className="mt-4 text-sm opacity-75">
                      Click to flip back
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={prevFlashcard}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="mr-2" size={16} />
                {t('previousCard')}
              </Button>

              <Button onClick={flipFlashcard} variant="outline">
                <Shuffle className="mr-2" size={16} />
                {t('flip')}
              </Button>

              <Button
                onClick={nextFlashcard}
                variant="outline"
                className="flex items-center"
              >
                {t('nextCard')}
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        );

      case 'dailyChallenge':
        const today = new Date().toDateString();
        const hasCompletedToday = user?.dailyChallenge?.completed && user?.dailyChallenge?.date === today;

        return (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('dailyChallengeTitle')}</h2>
              
              {hasCompletedToday ? (
                <>
                  <p className="text-xl text-slate-600 mb-8">{t('challengeComplete')}</p>
                  <p className="text-slate-600 mb-8">{t('comeBackTomorrow')}</p>
                  <Button onClick={goHome}>{t('goHome')}</Button>
                </>
              ) : (
                <>
                  <p className="text-xl text-slate-600 mb-8">
                    Test yourself with 5 carefully selected questions from all difficulty levels.
                  </p>
                  <Button 
                    size="lg"
                    onClick={() => {
                      const dailyQuestions = [
                        ...quizQuestions.easy.slice(0, 2),
                        ...quizQuestions.medium.slice(0, 2),
                        ...quizQuestions.hard.slice(0, 1)
                      ];
                      setCurrentQuizData({
                        difficulty: 'daily',
                        questions: dailyQuestions,
                        currentIndex: 0,
                        score: 0,
                        mistakes: []
                      });
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setUserAnswers([]);
                      setQuizComplete(false);
                      navigateTo('quiz');
                    }}
                    className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                  >
                    {t('startChallenge')}
                  </Button>
                </>
              )}
            </Card>
          </div>
        );

      case 'tenseConverter':
        const tenseOptions = Object.keys(tenseData.active);
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('tenseConverter')}</h2>
              <p className="text-xl text-slate-600">{t('tenseConverterDescription')}</p>
            </div>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Original Sentence</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2">
                        {t('inputSentence')}
                      </Label>
                      <Textarea
                        value={converterInput}
                        onChange={(e) => setConverterInput(e.target.value)}
                        placeholder="Enter a sentence to convert..."
                        className="h-24"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2">
                        {t('originalTense')}
                      </Label>
                      <Select value={originalTense} onValueChange={setOriginalTense}>
                        <SelectTrigger>
                          <SelectValue placeholder="Auto-detect" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Auto-detect</SelectItem>
                          {tenseOptions.map(tense => (
                            <SelectItem key={tense} value={tense}>{tense}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Converted Sentence</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2">
                        {t('targetTense')}
                      </Label>
                      <Select value={targetTense} onValueChange={setTargetTense}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target tense" />
                        </SelectTrigger>
                        <SelectContent>
                          {tenseOptions.map(tense => (
                            <SelectItem key={tense} value={tense}>{tense}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2">
                        {t('convertedSentence')}
                      </Label>
                      <div className="h-24 p-4 bg-slate-50 border border-slate-300 rounded-lg flex items-center">
                        {converterOutput ? (
                          <p className="text-slate-800">{converterOutput}</p>
                        ) : (
                          <p className="text-slate-500 italic">Converted sentence will appear here...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button onClick={convertTense} size="lg">
                  <RotateCcw className="mr-2" size={16} />
                  {t('convert')}
                </Button>
              </div>

              <Alert className="mt-8">
                <AlertDescription>
                  This is a simplified converter for demonstration. A full implementation would use advanced NLP techniques for accurate tense conversion.
                </AlertDescription>
              </Alert>
            </Card>
          </div>
        );

      case 'timeline':
        const timelineItems = [
          { tense: 'Past Perfect', time: 'Before Past', example: 'I had eaten', position: '10%', color: 'bg-red-500' },
          { tense: 'Simple Past', time: 'Past', example: 'I ate', position: '25%', color: 'bg-orange-500' },
          { tense: 'Past Continuous', time: 'Past Ongoing', example: 'I was eating', position: '35%', color: 'bg-yellow-500' },
          { tense: 'Present Perfect', time: 'Past to Present', example: 'I have eaten', position: '45%', color: 'bg-green-500' },
          { tense: 'Simple Present', time: 'Now', example: 'I eat', position: '50%', color: 'bg-blue-500' },
          { tense: 'Present Continuous', time: 'Happening Now', example: 'I am eating', position: '55%', color: 'bg-indigo-500' },
          { tense: 'Simple Future', time: 'Future', example: 'I will eat', position: '70%', color: 'bg-purple-500' },
          { tense: 'Future Continuous', time: 'Future Ongoing', example: 'I will be eating', position: '80%', color: 'bg-pink-500' },
          { tense: 'Future Perfect', time: 'Future Complete', example: 'I will have eaten', position: '90%', color: 'bg-rose-500' }
        ];

        return (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('timeline')}</h2>
              <p className="text-xl text-slate-600">{t('timelineDescription')}</p>
            </div>

            <Card className="p-8">
              <div className="flex justify-between items-center mb-8 text-sm font-medium text-slate-600">
                <span>Past</span>
                <span>Present</span>
                <span>Future</span>
              </div>

              <div className="relative mb-12 h-8">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-300 via-blue-300 to-purple-300 rounded-full transform -translate-y-1/2" />
                
                {timelineItems.map((item, index) => (
                  <div 
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: item.position, top: '50%' }}
                  >
                    <div className={`w-4 h-4 ${item.color} rounded-full border-2 border-white shadow-md`} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timelineItems.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 ${item.color} rounded-full mr-3`} />
                      <h3 className="font-semibold text-slate-800">{item.tense}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{item.time}</p>
                    <p className="text-slate-700 font-medium">{item.example}</p>
                  </Card>
                ))}
              </div>

              <Alert className="mt-8">
                <AlertDescription>
                  <h3 className="font-semibold text-slate-800 mb-2">How to Read the Timeline</h3>
                  <p className="text-slate-700 text-sm">
                    Each tense is positioned according to its relationship with time. Tenses on the left occur before the present moment, 
                    those in the center relate to the present, and those on the right refer to future events. The colors help visualize 
                    the progression from past (red/orange) through present (green/blue) to future (purple/pink).
                  </p>
                </AlertDescription>
              </Alert>
            </Card>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('leaderboard')}</h2>
              <p className="text-xl text-slate-600">See how you rank against other learners</p>
            </div>

            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Filter by Difficulty</h3>
              <div className="flex flex-wrap gap-3">
                {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
                  <Button
                    key={difficulty}
                    variant="outline"
                    size="sm"
                    className="capitalize"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </Card>

            {user && (
              <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('yourRank')}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">#{Math.floor(Math.random() * 50) + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{user.username}</div>
                      <div className="text-sm text-slate-600">
                        Best Score: {user.scores?.length > 0 ? Math.max(...user.scores.map((s: any) => s.score)) : 0}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {user.scores?.reduce((total: number, score: any) => total + score.score, 0) || 0}
                    </div>
                    <div className="text-sm text-slate-600">Total Points</div>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboardData.length > 0 ? (
                    leaderboardData.slice(0, 10).map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-yellow-100 text-yellow-800' :
                            index === 1 ? 'bg-gray-100 text-gray-800' :
                            index === 2 ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{entry.username}</div>
                            <div className="text-sm text-slate-600">Best: {entry.bestScore}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-slate-900">{entry.totalPoints}</div>
                          <div className="text-sm text-slate-600">points</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-600">
                      No leaderboard data available yet. Be the first to complete a quiz!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Header 
            goBack={screenStack.length > 1 ? goBack : undefined}
            goHome={goHome}
            currentScreen={currentScreen}
          />
          <main className="container mx-auto px-4 py-8">
            {renderScreen()}
          </main>

          {/* Auth Modal */}
          {showAuthModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{authMode === 'login' ? t('login') : t('register')}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(false)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {authMessage && (
                    <Alert className={authMessage.includes('successful') ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"} >
                      <AlertDescription className={authMessage.includes('successful') ? "text-green-700" : "text-red-700"}>
                        {authMessage}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleAuth} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="username">{t('username')}</Label>
                      <Input
                        id="username"
                        type="text"
                        value={authForm.username}
                        onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
                        disabled={loading}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">{t('password')}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                        disabled={loading}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? t('loading') : (authMode === 'login' ? t('login') : t('register'))}
                    </Button>
                  </form>
                  
                  <div className="mt-4 text-center">
                    <p className="text-slate-600 text-sm">
                      {authMode === 'login' ? t('notAMember') : t('alreadyAMember')}{' '}
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setAuthMode(authMode === 'login' ? 'register' : 'login');
                          setAuthMessage('');
                        }}
                        className="p-0 h-auto font-semibold"
                      >
                        {authMode === 'login' ? t('register') : t('login')}
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default AlphabetZApp;
