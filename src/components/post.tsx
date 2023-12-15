"use client"

import {
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  IconButton,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
  Link,
  Tooltip,
} from "@chakra-ui/react"
import { Discussion } from "@hiveio/dhive"
import { ReactElement } from "react"
import {
  ExternalLink,
  LinkIcon,
  MoreHorizontal,
  RepeatIcon,
} from "lucide-react"

interface PostProprieties {
  post?: Discussion
}

export default function Post({ post }: PostProprieties): ReactElement {
  const isLoading = !post
  const postMetadata = post ? JSON.parse(post.json_metadata) : {}

  return (
    <Card size="sm" boxShadow="none">
      <CardHeader mt={2} pb={2}>
        <Flex gap="4">
          <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
            <SkeletonCircle height="32px" width="32px" isLoaded={!isLoading}>
              <Avatar
                name={post?.author}
                src={`https://images.ecency.com/webp/u/${post?.author}/avatar/small`}
                size="sm"
              />
            </SkeletonCircle>
            <Skeleton isLoaded={!isLoading} minW="128px">
              <Flex gap={1} alignItems="center">
                <Text fontSize="14px" as="b">
                  {post?.author}
                </Text>
                <Text fontSize="14px" color="darkgray">
                  ·
                </Text>
                <Text fontSize="14px" color="darkgray" fontWeight="300">
                  {post && formatTimeSince(post?.created)}
                </Text>
              </Flex>
            </Skeleton>
          </Flex>
          {!isLoading && (
            <Tooltip label="Open post">
              <IconButton
                as={Link}
                href={"post/" + post?.url}
                aria-label="Return"
                icon={<ExternalLink size={16} color="darkgray" />}
                variant="ghost"
                size="sm"
              />
            </Tooltip>
          )}
        </Flex>
      </CardHeader>
      <Box px={3}>
        {isLoading ? (
          <Skeleton aspectRatio={16 / 9} borderRadius="md" />
        ) : (
          <Image
            objectFit="cover"
            aspectRatio={16 / 9}
            src={
              (postMetadata?.image && postMetadata.image[0]) ||
              "https://ipfs.skatehive.app/ipfs/QmZEBLwMxMewYumj6k1hXqcC1STUka79kVPVR6ZHTFWATA?pinataGatewayToken=nxHSFa1jQsiF7IHeXWH-gXCY3LDLlZ7Run3aZXZc8DRCfQz4J4a94z9DmVftXyFE"
            }
            alt={post?.title}
            borderRadius="md"
            loading="lazy"
          />
        )}
      </Box>
    </Card>
  )
}

function formatTimeSince(dateString: string): string {
  const postDate = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - postDate.getTime()

  // Convertendo milissegundos para minutos, horas e dias
  const minutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) {
    return `${minutes}m`
  } else if (hours < 24) {
    return `${hours}h`
  } else {
    // Formatando a data para o formato "dia mês"
    const day = postDate.getDate()
    const monthNames: string[] = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ]
    const month = monthNames[postDate.getMonth()]
    return `${day} ${month}`
  }
}
