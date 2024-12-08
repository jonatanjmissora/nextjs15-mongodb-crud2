"use server"

import { getCollection } from "../_lib/mongoConnect";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRegisterInput } from "../_lib/utils/validateRegisterInput";
import { validateLoginInput } from "../_lib/utils/validateLoginInput";
import setUserToCookie from "../_lib/utils/setUser";



export const getUsers = async () => {
  const userCollection = await getCollection("users")
  const results = await userCollection
    .find({})
    .toArray()
  return results
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const register = async (prevState, formData: FormData) => {
  const username = formData.get("username").toString()
  let userpassword = formData.get("userpassword").toString()

  const failObject = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  validateRegisterInput("username", username, failObject.errors)

  const usersCollection = await getCollection("users")
  const usernameInQuestion = await usersCollection.findOne({ username })

  if (usernameInQuestion) {
    failObject.errors.username = " El usuario ya se encuentra registrado."
  }

  validateRegisterInput("userpassword", userpassword, failObject.errors)

  if (failObject.errors.username || failObject.errors.userpassword) {
    return failObject
  }

  //si todo esta bien creo el usuario en la base de datos
  const salt = bcrypt.genSaltSync(10)
  userpassword = bcrypt.hashSync(userpassword, salt)

  const res = await usersCollection.insertOne({ username, userpassword })
 
  if (!res.insertedId.toString()) {
    failObject.errors.userpassword = "Error en el servidor"
    return failObject
  }

  await setUserToCookie(username, res.insertedId.toString())
  redirect("/")

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = async function () {
  const cookie = await cookies()
  cookie.delete("usertoken")
  redirect("/")
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const login = async function (prevState: any, formData: FormData) {

  let username = formData.get("username").toString()
  let userpassword = formData.get("userpassword").toString()

  const failObject = {
    success: false,
    prevState: { username, userpassword },
    errors: { username: "", userpassword: "" }
  }

  //validacion de entrada
  validateLoginInput("username", username, failObject.errors)
  validateLoginInput("userpassword", userpassword, failObject.errors)
  if (failObject.errors.username || failObject.errors.userpassword) {
    console.log({ failObject })
    return failObject
  }

  //verificacion de usuario registrado
  const collection = await getCollection("users")
  const user = await collection.findOne({ username })
  if (!user) {
    failObject.errors.username = "usuario no registrado"
    return failObject
  }

  //verificacion de contraseña almacenada
  const matchOrNot = bcrypt.compareSync(userpassword, user.userpassword)
  if (!matchOrNot) {
    failObject.errors.userpassword = "La contraseña no corresponde al usuario"
    return failObject
  }

  //si todo esta bien
  await setUserToCookie(username, user._id.toString())
  redirect("/")

}