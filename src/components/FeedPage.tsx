import HiveClient from "@/lib/hiveclient"
import PostModel, { PostProps } from "@/lib/models/post"
import { VStack } from "@chakra-ui/react"
import Post from "./Post"
const SKATEHIVE_TAG = "hive-173115"

const hiveClient = HiveClient()

async function getData(threshold: number = 0): Promise<PostProps[]> {
  const response = await hiveClient.database.getDiscussions("created", {
    tag: SKATEHIVE_TAG,
    limit: threshold + 20,
  })
  if (Array.isArray(response) && response.length > 0)
    return response.map((post) => PostModel.simplifyFromDiscussion(post))
  return [{} as PostProps]
}

export default async function FeedPage() {
  const data = await getData()
  return (
    <VStack align="stretch" spacing={4} p={2}>
      {data && data.map((post, i) => <Post key={i} postData={post} />)}
    </VStack>
  )
}
