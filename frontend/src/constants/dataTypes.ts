export type User = {
   username: string;
   email: string;
   password: string;
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