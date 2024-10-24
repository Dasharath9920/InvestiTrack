export type User = {
   username: string;
   email: string;
   password: string;
   profilePicture?: string;
}

export type RegisterResponse = {
   success: boolean;
   newUser?: User;
   message?: string;
}

export type LoginResponse = {
   success: boolean;
   accessToken?: string;
   message?: string;
   userName?: string;
   email?: string;
}

export type Statistics = {
   totalAmount: number;
   totalTime: number;
   recentTimeEntries: TimeEntry[];
   recentAmountEntries: AmountEntry[];
}

export type TimeEntry = {
   investedIn: string;
   time: number;
   activityDate: string;
   createdAt?: string;
   _id?: string;
   userId?: string;
   otherCategory?: string;
}

export type AmountEntry = {
   spentOn: string;
   amount: number;
   expenditureDate: string;
   createdAt?: string;
   _id?: string;
   userId?: string;
   otherCategory?: string;
}
