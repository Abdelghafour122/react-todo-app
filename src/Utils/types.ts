import { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
  currentUser: User | null | undefined;
  profilePic: string | undefined;
  userSignUp: (email: string, password: string) => Promise<UserCredential>;
  userSignIn: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  userSignOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  EMAIL_REGEX: RegExp;
};

export type TodoContextType = {
  dispatch: React.Dispatch<Actions>;
  todoList: Todos;
  addTodoItem: (todoItemContent: any) => void;
  removeTodoItem: (todoItemId: any) => void;
  markAsCompleted: (todoItemId: any) => void;
};

export type Actions = {
  type: string;
  payload: string | number;
};

export type InitialReducerStateType = {
  todoList: Todos;
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Todos = Todo[];
