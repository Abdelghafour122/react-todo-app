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
  todoList: Todos;
  addTodoItem: ({ content }: EditTodoPayloadType) => void;
  editTodoItem: ({ id, content }: EditTodoPayloadType) => void;
  removeTodoItem: ({ id }: EditTodoPayloadType) => void;
  markAsCompleted: ({ id }: EditTodoPayloadType) => void;
};

export type EditTodoPayloadType = {
  id?: number;
  title?: string | undefined;
  content?: string | undefined;
};

export type Actions = {
  type: string;
  payload: EditTodoPayloadType;
};

export type InitialReducerStateType = {
  todoList: Todos;
};

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export type Todos = Todo[];
