export const TABS = {
   DASHBOARD: 'dashboard',
   HOME: 'home',
   TIME: 'time',
   AMOUNT: 'amount',
   STATISTICS: 'statistics',
   SETTINGS: 'settings'
}

export const ACCESS_TOKEN = 'accessToken';
export const EMAIL = 'email';

export const THEMES = {
   LIGHT: 'light',
   DARK: 'dark'
}

export const TYPES = {
   AMOUNT: 'amount',
   TIME: 'time'
}

export const TIME_CATEGORIES: { [key: string]: string } = {
   WORK: 'Work',
   STUDY: 'Study',
   PERSONAL_DEVELOPMENT: 'Personal Development',
   SLEEP: 'Sleep',
   SPORT: 'Sport',
   COOKING: 'Cooking',
   MEDITATION: 'Meditation',
   COMMUTING: 'Commuting',
   ENTERTAINMENT: 'Entertainment',
   WORKOUT: 'Workout',
   FAMILY: 'Family',
   OTHER: 'Other'
}

export const AMOUNT_CATEGORIES: { [key: string]: string } = {
   GROCERIES: 'Groceries',
   FOOD: 'Food',
   ENTERTAINMENT: 'Entertainment',
   SHOPPING: 'Shopping',
   RENT: 'Rent',
   TRANSPORTATION: 'Transportation',
   FAMILY: 'Family',
   INSURANCE: 'Insurance',
   HEALTH: 'Health',
   SAVINGS: 'Savings',
   DEBT: 'Debt',
   OTHER: 'Other'
}

export const SAFE_SPENDING_CATEGORIES: Array<string> = [
   AMOUNT_CATEGORIES.SAVINGS,
   AMOUNT_CATEGORIES.DEBT
];

export const PRODUCTIVE_TIME_CATEGORIES: Array<string> = [
   TIME_CATEGORIES.WORK,
   TIME_CATEGORIES.STUDY,
   TIME_CATEGORIES.MEDITATION,
   TIME_CATEGORIES.PERSONAL_DEVELOPMENT,
   TIME_CATEGORIES.SPORT
]

export const TIME_PERIODS = [
   {
      label: '7 days',
      value: 7,
      id: 'dataFor7Days'
   },
   {
      label: '30 days',
      value: 30,
      id: 'dataFor30Days'
   },
   {
      label: '6 months',
      value: 6 * 30, // Approximating 6 months as 180 days
      id: 'dataFor6Months'
   },
   {
      label: '12 months',
      value: 12 * 30, // Approximating 12 months as 360 days
      id: 'dataFor12Months'
   },
   {
      label: '5 years',
      value: 5 * 365, // Approximating 5 years as 1825 days
      id: 'dataFor5Years'
   }
]

export const SAFE_LIMITS_WEEKLY = {
   TIME: {
      [TIME_CATEGORIES.WORK]: 1500,
      [TIME_CATEGORIES.STUDY]: 540,
      [TIME_CATEGORIES.PERSONAL_DEVELOPMENT]: 1500,
      [TIME_CATEGORIES.SLEEP]: 2520,
      [TIME_CATEGORIES.SPORT]: 420,
      [TIME_CATEGORIES.COOKING]: 840,
      [TIME_CATEGORIES.MEDITATION]: 70,
      [TIME_CATEGORIES.COMMUTING]: 630,
      [TIME_CATEGORIES.ENTERTAINMENT]: 420,
      [TIME_CATEGORIES.WORKOUT]: 210,
      [TIME_CATEGORIES.FAMILY]: 100,
      [TIME_CATEGORIES.OTHER]: 450
   },
   AMOUNT: {
      [AMOUNT_CATEGORIES.GROCERIES]: 1000,
      [AMOUNT_CATEGORIES.FOOD]: 700,
      [AMOUNT_CATEGORIES.ENTERTAINMENT]: 200,
      [AMOUNT_CATEGORIES.SHOPPING]: 200,
      [AMOUNT_CATEGORIES.RENT]: 2500,
      [AMOUNT_CATEGORIES.TRANSPORTATION]: 500,
      [AMOUNT_CATEGORIES.FAMILY]: 2000,
      [AMOUNT_CATEGORIES.INSURANCE]: 200,
      [AMOUNT_CATEGORIES.HEALTH]: 250,
      [AMOUNT_CATEGORIES.SAVINGS]: 2500,
      [AMOUNT_CATEGORIES.DEBT]: 5000,
      [AMOUNT_CATEGORIES.OTHER]: 1000
   }
 };