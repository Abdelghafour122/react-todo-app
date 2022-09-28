import { User, UserCredential } from "firebase/auth";
import { DocumentData, DocumentReference } from "firebase/firestore";

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
  fetchTodoItems: () => Promise<void>;
  addTodoItem: ({ content }: EditTodoPayloadType) => void;
  editTodoItem: ({ id, title, content }: EditTodoPayloadType) => void;
  removeTodoItem: ({ id }: EditTodoPayloadType) => void;
  permanentlyRemoveTodoItem: ({ id }: EditTodoPayloadType) => void;
  restoreTodoItem: ({ id }: EditTodoPayloadType) => void;
  markAsCompleted: ({ id }: EditTodoPayloadType) => void;
  archiveTodoItem: ({ id, deleted }: ArchiveTodoType) => void;
};

type ArchiveTodoType = {
  id: string;
  deleted: boolean | undefined;
};

export type EditTodoPayloadType = {
  id?: string;
  title?: string | undefined;
  content?: string | undefined;
  deleted?: boolean;
  fetchedData?: Todos;
};

export type DeleteTodoParamsType = {
  id: string;
  deleted: boolean;
};

export type AddTodoParamsType = {
  title?: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
};

export type Actions = {
  type: string;
  payload: EditTodoPayloadType;
};

export type InitialReducerStateType = {
  todoList: Todos;
};

interface Todo {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
}

export type Todos = Todo[];
