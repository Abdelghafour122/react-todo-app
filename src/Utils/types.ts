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
  fetchTodoItems: () => Promise<void>;
  addTodoItem: ({ title, content }: EditTodoPayloadType) => void;
  editTodoItem: ({ id, title, content }: EditTodoParamsType) => void;
  removeTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  permanentlyRemoveTodoItem: ({ id }: PermanentlyDeleteTodoParamsType) => void;
  restoreTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  markAsCompleted: ({ id, completed }: CompletedTodoParamsType) => void; //CompletedTodoParamsType
  archiveTodoItem: ({ id, archived }: ArchivedTodoParamsType) => void;
};

type ArchiveTodoType = {
  id: string;
  deleted: boolean;
};

export type EditTodoPayloadType = {
  id?: string;
  title?: string | undefined;
  content?: string | undefined;
  deleted?: boolean;
  archived?: boolean;
  fetchedData?: Todos;
};

export type PermanentlyDeleteTodoParamsType = {
  id: string;
};

export type AddTodoParamsType = {
  title?: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
};

export type CompletedTodoParamsType = {
  id: string;
  completed: boolean;
};

export type UpdateTodoContentParamsType = {
  id: string;
  title: string;
  content: string;
};

export type DeletedTodoParamsType = ArchiveTodoType;

export type ArchivedTodoParamsType = {
  id: string;
  archived: boolean;
};

export type EditTodoParamsType = {
  id: string;
  title: string;
  content: string;
};

// export type StandardEditTodoType = AddTodoParamsType &
//   DeleteTodoParamsType &
//   ArchiveTodoType &
//   CompletedTodoParamsType &
//   EditTodoParamsType;

export type Actions = {
  type: string;
  payload: EditTodoPayloadType;
};

export type InitialReducerStateType = {
  todoList: Todos;
};

export type Todo = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  deleted: boolean;
  archived: boolean;
};

export type Todos = Todo[];
