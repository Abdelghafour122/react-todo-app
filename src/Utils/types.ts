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

export type TodoContextValueType = {
  dispatch: React.Dispatch<Actions>;
  todoList: Todos;
  addTodoItem: (todoItemContent: string) => void;
  removeTodoItem: (todoItemId: number) => void;
  markAsCompleted: (todoItemId: number) => void;
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
  content: string;
  completed: boolean;
}

export type Todos = Todo[];
