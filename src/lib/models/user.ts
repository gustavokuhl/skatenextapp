import { getUserFromUsername } from "../services/userService"

export interface UserProps {
  id: number
  name: string
  created: string
  posting_json_metadata: string
  balance: string | number
  hbd_balance: string | number
  savings_hbd_balance: string | number
}

export default class UserModel {
  id: number
  name: string
  created: string
  posting_json_metadata: string
  metadata?: UserMetadata
  balance: number
  hbd_balance: number
  savings_hbd_balance: number

  constructor(user?: UserProps) {
    this.id = user?.id || 0
    this.name = user?.name || ""
    this.created = user?.created || ""
    this.posting_json_metadata = user?.posting_json_metadata || "{}"
    this.balance = formatBalance(user?.balance)
    this.hbd_balance = formatBalance(user?.hbd_balance)
    this.savings_hbd_balance = formatBalance(user?.savings_hbd_balance)
    this.metadata = JSON.parse(this.posting_json_metadata)
  }

  simplify(): UserProps {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
      posting_json_metadata: this.posting_json_metadata,
      balance: this.balance,
      hbd_balance: this.hbd_balance,
      savings_hbd_balance: this.savings_hbd_balance,
    }
  }

  static async getNewFromUsername(username: string) {
    const userData = await getUserFromUsername(username)
    return new UserModel(userData)
  }
}

interface UserMetadata {
  profile: UserProfile
}

interface UserProfile {
  website: string
  profile_image: string
  cover_image: string
  about: string
}

function formatBalance(balance: string | number | undefined) {
  console.log(balance)
  if (!balance) return 0
  if (typeof balance === "string") return Number(balance.split(" ")[0])
  return balance
}
