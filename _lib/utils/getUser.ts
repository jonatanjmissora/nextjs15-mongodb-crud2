import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export default async function getUserFromCookie() {
  const cookie = (await cookies()).get("usertoken")?.value
  if (cookie) {
    try {
      const decoded = jwt.verify(cookie, process.env.JWTSECRET)
      return decoded
    } catch (err) {
      return null
    }
  }
}