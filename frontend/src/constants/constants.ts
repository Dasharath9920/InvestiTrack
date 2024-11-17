import { FaBus, FaShoppingCart, } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { RiMovieFill } from "react-icons/ri";
import { FaShoppingBag } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { MdHealthAndSafety } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { MdSavings } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { FaBookReader } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { IoIosFootball } from "react-icons/io";
import { GiCookingPot } from "react-icons/gi";
import { GiMeditation } from "react-icons/gi";
import { MdOutlineCommute } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdAccessTimeFilled } from "react-icons/md";

export const TABS = {
  DASHBOARD: "dashboard",
  HOME: "home",
  TIME: "time",
  AMOUNT: "amount",
  STATISTICS: "statistics",
  SETTINGS: "settings",
};

export const ACCESS_TOKEN = "accessToken";
export const EMAIL = "email";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const TYPES = {
  AMOUNT: "amount",
  TIME: "time",
};

export const TIME_CATEGORIES: { [key: string]: string } = {
  WORK: "Work",
  STUDY: "Study",
  PERSONAL_DEVELOPMENT: "Personal Development",
  SLEEP: "Sleep",
  SPORT: "Sport",
  COOKING: "Cooking",
  MEDITATION: "Meditation",
  COMMUTING: "Commuting",
  ENTERTAINMENT: "Entertainment",
  WORKOUT: "Workout",
  FAMILY: "Family",
  OTHER: "Other",
};

export const AMOUNT_CATEGORIES: { [key: string]: string } = {
  GROCERIES: "Groceries",
  FOOD: "Food",
  ENTERTAINMENT: "Entertainment",
  SHOPPING: "Shopping",
  RENT: "Rent",
  TRANSPORTATION: "Transportation",
  FAMILY: "Family",
  INSURANCE: "Insurance",
  HEALTH: "Health",
  SAVINGS: "Savings",
  DEBT: "Debt",
  OTHER: "Other",
};

export const TIME_CATEGORY_ICONS = {
  [TIME_CATEGORIES.WORK]: HiBuildingOffice2,
  [TIME_CATEGORIES.STUDY]: FaBookReader,
  [TIME_CATEGORIES.PERSONAL_DEVELOPMENT]: FaCode,
  [TIME_CATEGORIES.SLEEP]: IoIosBed,
  [TIME_CATEGORIES.SPORT]: IoIosFootball,
  [TIME_CATEGORIES.COOKING]: GiCookingPot,
  [TIME_CATEGORIES.MEDITATION]: GiMeditation,
  [TIME_CATEGORIES.COMMUTING]: MdOutlineCommute,
  [TIME_CATEGORIES.ENTERTAINMENT]: RiMovieFill,
  [TIME_CATEGORIES.WORKOUT]: CgGym,
  [TIME_CATEGORIES.FAMILY]: MdFamilyRestroom,
  [TIME_CATEGORIES.OTHER]: MdAccessTimeFilled,
};

export const AMOUNT_CATEGORY_ICONS = {
  [AMOUNT_CATEGORIES.GROCERIES]: FaShoppingCart,
  [AMOUNT_CATEGORIES.FOOD]: IoFastFood,
  [AMOUNT_CATEGORIES.ENTERTAINMENT]: RiMovieFill,
  [AMOUNT_CATEGORIES.SHOPPING]: FaShoppingBag,
  [AMOUNT_CATEGORIES.RENT]: MdHome,
  [AMOUNT_CATEGORIES.TRANSPORTATION]: FaBus,
  [AMOUNT_CATEGORIES.FAMILY]: MdFamilyRestroom,
  [AMOUNT_CATEGORIES.INSURANCE]: MdHealthAndSafety,
  [AMOUNT_CATEGORIES.HEALTH]: GiHealthNormal,
  [AMOUNT_CATEGORIES.SAVINGS]: MdSavings,
  [AMOUNT_CATEGORIES.DEBT]: BsBank2,
  [AMOUNT_CATEGORIES.OTHER]: RiMoneyRupeeCircleFill,
}

export const SAFE_SPENDING_CATEGORIES: Array<string> = [
  AMOUNT_CATEGORIES.SAVINGS,
  AMOUNT_CATEGORIES.DEBT,
];

export const SAFE_TIME_CATEGORIES: Array<string> = [
  TIME_CATEGORIES.SLEEP,
  TIME_CATEGORIES.WORK,
  TIME_CATEGORIES.STUDY,
  TIME_CATEGORIES.MEDITATION,
  TIME_CATEGORIES.PERSONAL_DEVELOPMENT,
  TIME_CATEGORIES.SPORT,
  TIME_CATEGORIES.WORKOUT,
  TIME_CATEGORIES.FAMILY,
];

export const PRODUCTIVE_TIME_CATEGORIES: Array<string> = [
  TIME_CATEGORIES.WORK,
  TIME_CATEGORIES.STUDY,
  TIME_CATEGORIES.MEDITATION,
  TIME_CATEGORIES.PERSONAL_DEVELOPMENT,
  TIME_CATEGORIES.SPORT,
  TIME_CATEGORIES.WORKOUT,
];

export const TIME_PERIODS = [
  {
    label: "7 days",
    value: 7,
    id: "dataFor7Days",
  },
  {
    label: "30 days",
    value: 30,
    id: "dataFor30Days",
  },
  {
    label: "6 months",
    value: 6 * 30, // Approximating 6 months as 180 days
    id: "dataFor6Months",
  },
  {
    label: "12 months",
    value: 12 * 30, // Approximating 12 months as 360 days
    id: "dataFor12Months",
  },
  {
    label: "5 years",
    value: 5 * 365, // Approximating 5 years as 1825 days
    id: "dataFor5Years",
  },
];

export const SAFE_LIMITS_WEEKLY = {
  TIME: {
    [TIME_CATEGORIES.WORK]: 1500,
    [TIME_CATEGORIES.STUDY]: 540,
    [TIME_CATEGORIES.PERSONAL_DEVELOPMENT]: 1080,
    [TIME_CATEGORIES.SLEEP]: 2520,
    [TIME_CATEGORIES.SPORT]: 420,
    [TIME_CATEGORIES.COOKING]: 840,
    [TIME_CATEGORIES.MEDITATION]: 70,
    [TIME_CATEGORIES.COMMUTING]: 630,
    [TIME_CATEGORIES.ENTERTAINMENT]: 420,
    [TIME_CATEGORIES.WORKOUT]: 210,
    [TIME_CATEGORIES.FAMILY]: 100,
    [TIME_CATEGORIES.OTHER]: 450,
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
    [AMOUNT_CATEGORIES.OTHER]: 1000,
  },
};

export const CHART_DATA_TIME_PERIODS = [
  {
    label: "7 days",
    value: 7,
    id: "dataFor7Days",
  },
  {
    label: "30 days",
    value: 30,
    id: "dataFor30Days",
  },
  {
    label: "1 year",
    value: 360,
    id: "dataFor1Year",
  },
];
