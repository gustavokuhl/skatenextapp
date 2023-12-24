import Post from "@/components/Post"
import ProfileHeader from "@/components/ProfileHeader"
import HiveClient from "@/lib/hiveclient"
import PostModel, { PostProps } from "@/lib/models/post"
import { UserProps } from "@/lib/models/user"
import { VStack } from "@chakra-ui/react"

const hiveClient = HiveClient()

async function getUserFromUsername(username: string): Promise<UserProps> {
  const response = await hiveClient.database.getAccounts([username])
  if (Array.isArray(response) && response.length > 0)
    return response[0] as UserProps
  return {} as UserProps
}

async function getBlogFromUsername(username: string): Promise<PostProps[]> {
  const response = await hiveClient.database.getDiscussions("blog", {
    limit: 20,
    tag: username,
  })
  if (Array.isArray(response) && response.length > 0)
    return response.map((post) => PostModel.simplifyFromDiscussion(post))
  return [{} as PostModel]
}

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUserFromUsername(params.username)
  const posts = await getBlogFromUsername(params.username)
  return (
    <VStack>
      <ProfileHeader userData={user} />
      <VStack align="stretch" spacing={4} p={2}>
        {posts && posts.map((post, i) => <Post key={i} postData={post} />)}
      </VStack>
    </VStack>
  )
}
