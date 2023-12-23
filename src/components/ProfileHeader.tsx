"use client"

import { useHiveUser } from "@/contexts/UserContext"
import HiveClient from "@/lib/hiveclient"
import UserModel from "@/lib/models/user"
import { Avatar, HStack, Image, Spinner, Text, VStack } from "@chakra-ui/react"
import { Discussion } from "@hiveio/dhive"
import { useEffect, useState } from "react"

const hiveClient = HiveClient()

async function getPostsData(author: string, threshold: number = 0) {
  try {
    let discussions = (await hiveClient.call("bridge", "get_account_posts", {
      sort: "posts",
      account: author,
      limit: threshold + 20,
    })) as Discussion[]
    console.log(discussions)
    if (discussions.length === 0) {
      throw new Error("Failed to fetch discussions")
    }

    return discussions
  } catch (ex: any) {
    console.error(
      ex?.jse_info
        ? Object.keys(ex.jse_info)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((key) => ex.jse_info[key])
            .join("")
        : ex.message
    )
  }
}

interface ProfileProps {
  user: UserModel
}

export default function ProfileHeader({ user }: ProfileProps) {
  const [profile, setProfile] = useState<UserModel>(user)
  const [posts, setPosts] = useState<Discussion[]>()
  const { hiveUser, isLoading } = useHiveUser()
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true)

  useEffect(() => {
    async function getPosts(profile: UserModel) {
      const posts = await getPostsData(profile.name)
      setPosts(posts)
    }
    profile && getPosts(profile)
    setIsLoadingProfile(false)
  }, [profile])

  if (isLoadingProfile)
    return (
      <VStack w={"100%"} justifyContent={"center"}>
        <Spinner size={"xl"} />
      </VStack>
    )

  if (!profile) {
    return (
      <Text align={"center"} w={"100%"}>
        No profile was found
      </Text>
    )
  }

  return (
    <VStack align={"start"}>
      <Image
        w="100%"
        src={profile?.metadata && profile?.metadata?.profile.cover_image}
        height={"200px"}
        objectFit="cover"
        borderRadius="md"
        alt={"Profile thumbnail"}
        loading="lazy"
      />
      <HStack ml={2} align={"start"}>
        <Avatar
          mt={-12}
          name={profile.name}
          src={profile.metadata?.profile.profile_image}
          size={{ base: "xl", lg: "2xl" }}
          showBorder={true}
        />
        <VStack align={"flex-start"} gap={0}>
          <Text fontSize={{ base: "md", lg: "xl" }} fontWeight={"bold"}>
            @{profile.name}
          </Text>
          <Text fontSize={"xs"} w={"100%"} noOfLines={3}>
            {profile?.metadata?.profile.about}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
