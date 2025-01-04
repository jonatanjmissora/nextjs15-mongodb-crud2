"use server"

import { revalidatePath } from "next/cache"
import { todoSchema, TodoType } from "./todo.schema"

export const addTodo = async (newTodo: TodoType) => {
  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  //server validation
  const { success } = todoSchema.safeParse(newTodo)
  if (!success) {
    return { success: false, message: "Server Validation Fail" }
  }

  if (newTodo.title === "error") return { success: false, message: "No puede contener error" }

  try {
    //insertar en DB
    revalidatePath("/")
    return { success: true, message: "Todo creado satisfactoriamente" }
  } catch (error) {
    return { success: false, message: "Server Error" }
  }

}