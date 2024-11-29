"use server"

import { getCollection } from "../_lib/mongoConnect";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ErrorType = {
  [key: string]: string | number;
}

export const validateInput = async (label: string, inputValue: string, errors: ErrorType) => {
  let minChar, maxChar, labelStr
  const regex = /^[a-zA-Z0-9]*$/
  let actualValue = inputValue.trim()

  if (label === "username") {
    minChar = 3
    maxChar = 15
    labelStr = "nombre"
  }
  if (label === "userpassword") {
    minChar = 4
    maxChar = 10
    labelStr = "contraseña"
  }
  if (typeof inputValue !== "string") actualValue = ""
  if (actualValue.length <= minChar) errors[label] = ` El ${labelStr} debe tener mas de ${minChar} caracteres.`
  if (actualValue.length >= maxChar) errors[label] = ` El ${labelStr} debe tener menos de ${maxChar} caracteres.`
  if (actualValue === "") errors[label] = ` Debes ingresar ${labelStr}.`

  if (!regex.test(inputValue)) errors[label] += ` El ${labelStr} debe contener caracteres válidos}.`
}

export const getUsers = async () => {
  const userCollection = await getCollection("users")
  const results = await userCollection
    .find({})
    .toArray()
  return results
}


export const register = async (prevState, formData: FormData) => {
  const username = formData.get("username").toString()
  let userpassword = formData.get("userpassword").toString()

  const errors = { username: "", userpassword: "" }

  validateInput("username", username, errors)

  const usersCollection = await getCollection("users")
  const usernameInQuestion = await usersCollection.findOne({ username })

  if (usernameInQuestion) {
    errors.username = " El usuario ya se encuentra registrado."
  }

  validateInput("userpassword", userpassword, errors)

  if (errors.username || errors.userpassword) {
    return { succcess: false, prevState: { username, userpassword }, errors }
  }

  //hash password first
  const salt = bcrypt.genSaltSync(10)
  userpassword = bcrypt.hashSync(userpassword, salt)

  const res = await usersCollection.insertOne({ username, userpassword })
  const userId = res.insertedId.toString()

  //generate token
  const ourTokenValue = jwt.sign({ username, _id: userId, exp: Math.floor(Date.now() / 1000) + 60 }, process.env.JWTSECRET)

  // log the user in by giving them a cookie
  const cookie = await cookies()
  cookie.set("usertoken", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 100,
    secure: true
  })

  redirect("/")

}

export const logout = async function () {
  const cookie = await cookies()
  cookie.delete("usertoken")
  redirect("/")
}

export const login = async function (prevState, formData) {

  let username = formData.get("username")
  let userpassword = formData.get("userpassword")

  const failObject = {
    success: false,
    prevState: { username, userpassword },
    errors: "Nombre o contraseña inválidos."
  }

  if (typeof username != "string") username = ""
  if (typeof userpassword != "string") userpassword = ""

  const collection = await getCollection("users")
  const user = await collection.findOne({ username })

  if (!user) {
    return failObject
  }

  const matchOrNot = bcrypt.compareSync(userpassword, user.userpassword)

  if (!matchOrNot) {
    return failObject
  }

  // create jwt value
  const ourTokenValue = jwt.sign({ username, _id: user._id.toString(), exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 100 }, process.env.JWTSECRET)

  // log the user in by giving them a cookie
  const cookie = await cookies()
  cookie.set("usertoken", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 100,
    secure: true
  })

  redirect("/")

}