export type Todo = {
  id: string;
  user_email: string;
  title: string;
  progress: number;
  date: string;
};

export type AuthMode = "signup" | "signin";
