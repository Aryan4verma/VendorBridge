import type { Profile, UserRole } from "./database";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl: string | null;
}

export interface AuthSession {
  user: User;
  profile: Profile;
  accessToken: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}
