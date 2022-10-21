import { User, UserCredential } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

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
  formatDate: (fetchedDate: Timestamp) => string;
  fetchTodoItems: () => Promise<void>;
  addTodoItem: ({ title, content }: EditTodoPayloadType) => void;
  editTodoItem: ({ id, title, content }: EditTodoParamsType) => void;
  removeTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  permanentlyRemoveTodoItem: ({ id }: PermanentlyDeleteTodoParamsType) => void;
  restoreTodoItem: ({ id, deleted }: DeletedTodoParamsType) => void;
  markAsCompleted: ({ id, completed }: CompletedTodoParamsType) => void; //CompletedTodoParamsType
  archiveTodoItem: ({ id, archived }: ArchivedTodoParamsType) => void;
  labelsArray: Labels;
  fetchLabels: () => Promise<void>;
  addLabel: ({ name }: AddLabelParamsType) => void;
  deleteLabel: (id: string) => void;
  // editLabel: ({id, name, count}:UpdateLabelContentParamsType) => void;
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
  date?: Timestamp;
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
  edited: boolean;
  date: Timestamp;
};

export type CompletedTodoParamsType = {
  id: string;
  completed: boolean;
};

export type UpdateTodoContentParamsType = {
  id: string;
  title: string;
  content: string;
  edited: boolean;
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
  date: Timestamp;
};

export type DetailedTodoType = AddTodoParamsType & {
  id: string;
};

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
  edited: boolean;
  date: Timestamp;
  labels: Labels;
};

export type Todos = Todo[];

export type Label = {
  id: string;
  name: string;
  count: number;
};

export type Labels = Label[];

export type AddLabelParamsType = {
  name: string;
  count: number;
};

export type UpdateLabelContentParamsType = {
  id: string;
  name?: string;
  count?: number;
};
