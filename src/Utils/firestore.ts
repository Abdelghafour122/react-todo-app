import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  doc,
} from "firebase/firestore";
import { app } from "../firebase";
import { Todos } from "./types";

export const todoDatabase = getFirestore(app);
const todosCollection = collection(todoDatabase, "todos");

// TODOS FETCHING FUNCTION:
export const getTodosList = async () => {
  const result = await getDocs(todosCollection)
    .then(
      (res) =>
        [
          ...res.docs.map((data) => {
            let todosObjectProperties = data.data();
            return { id: data.id.toString(), ...todosObjectProperties };
          }),
        ] as Todos
    )
    .then((finalRes) => {
      return finalRes;
    });
  return result;
};
