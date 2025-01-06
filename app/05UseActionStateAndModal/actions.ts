"use server"

import "server-only";
import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"

export type FormState = {
  success: boolean;
  prevState: { title?: string, content?: string };
  message: string;
};

export const addTodo = async (
  newTodo: TodoType
): Promise<FormState> => {

  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  //server validation
  const { success: serverSuccess } = todoSchema.safeParse(newTodo)
  if (!serverSuccess) {
    return { success: false, prevState: newTodo, message: "Server Validation Fail" }
  }

  if (newTodo.title === "error") return { success: false, prevState: newTodo, message: "No puede contener error" }

  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true, prevState: newTodo, message: "Todo creado satisfactoriamente" }
  } catch (error) {
    return { success: false, prevState: newTodo, message: "Server Error" }
  }

}