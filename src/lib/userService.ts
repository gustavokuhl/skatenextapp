"use server"

import HiveClient from "@/lib/hiveclient"
import User from "@/lib/user"

const hiveClient = HiveClient()

export default class UserService {
  async getByName(username: string): Promise<User> {
    try {
      const data = await hiveClient.database.getAccounts([username])
      if (data.length === 0) throw new Error("User not found")
      return new User(data[0] as User)
    } catch (ex: any) {
      throw new Error(ex)
    }
  }
}
