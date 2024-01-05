import { getUserFromUsername } from "@/lib/services/userService"
import { Text } from "@chakra-ui/react"

interface ProfilePageProps {
  params: {
    username: string
  }
}

async function fetchConversionRate() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=usd"
    )

    if (response.status !== 200) {
      return 0.35
    }

    const data = await response.json()
    const conversionRate = data.hive.usd
    return conversionRate
  } catch (error) {
    return 0.35
  }
}

async function fetchHbdPrice() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=hive_dollar&vs_currencies=usd"
    )

    if (response.status !== 200) {
      return 1.0
    }

    const data = await response.json()
    const hbdPrice = data.hive_dollar.usd

    return hbdPrice
  } catch (error) {
    return 1.0
  }
}

export default async function WidgetPage({ params }: ProfilePageProps) {
  const user = await getUserFromUsername(params.username)
  const [conversionRate, hbdPrice] = await Promise.all([
    fetchConversionRate(),
    fetchHbdPrice(),
  ])

  const hiveWorth = Number(user.balance) * conversionRate

  const hbdWorth = Number(user.hbd_balance) * hbdPrice
  const savingsWorth = Number(user.savings_hbd_balance) * hbdPrice
  console.log(hiveWorth, hbdWorth, savingsWorth)

  const total_Owned =
    Number(hiveWorth) + Number(savingsWorth) + Number(hbdWorth)
  return <Text></Text>
}
