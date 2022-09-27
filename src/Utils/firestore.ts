import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { todoDatabase } from "../firebase";
import { Todos } from "./types";

const todosCollection = collection(todoDatabase, "todos");

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
      console.log("from the promise", finalRes);
      return finalRes;
    });
  return result;
};
