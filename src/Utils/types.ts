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
  // addTodoItem: (todoItemContent: string) => void;
  // editTodoItem: (todoItemId: number, todoItemContent: string) => void;
  editTodoItem: ({ id, content }: EditTodoPayloadType) => void;
  removeTodoItem: ({ id }: EditTodoPayloadType) => void;
  markAsCompleted: ({ id }: EditTodoPayloadType) => void;
};

export type EditTodoPayloadType = {
  id?: number;
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
  content: string | number;
  completed: boolean;
}

export type Todos = Todo[];
