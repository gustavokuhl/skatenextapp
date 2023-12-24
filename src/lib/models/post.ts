import { Asset, Discussion } from "@hiveio/dhive"
import { extractFirstLink, getWebsiteURL } from "../utils"

export interface PostProps {
  post_id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  created: string
  url: string
  root_title: string
  total_payout_value: Asset | string
  curator_payout_value: Asset | string
  pending_payout_value: Asset | string
  active_votes: any[]
}

export default class PostModel {
  post_id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  metadata: PostMetadata
  created: string
  url: string
  root_title: string
  total_payout_value: Asset | string
  curator_payout_value: Asset | string
  pending_payout_value: Asset | string
  active_votes: any[]

  constructor(post?: PostProps) {
    this.post_id = post?.post_id || 0
    this.author = post?.author || ""
    this.permlink = post?.permlink || ""
    this.title = post?.title || ""
    this.body = post?.body || ""
    this.json_metadata = post?.json_metadata || "{}"
    this.metadata = JSON.parse(this.json_metadata)
    this.created = post?.created || Date.now().toString()
    this.url = post?.url || ""
    this.root_title = post?.root_title || ""
    this.total_payout_value = post?.total_payout_value || "0.000 HBD"
    this.curator_payout_value = post?.curator_payout_value || "0.000 HBD"
    this.pending_payout_value = post?.pending_payout_value || "0.000 HBD"
    this.active_votes = post?.active_votes || []
  }

  getEarnings(): string {
    const totalPayout = parseFloat(
      this.total_payout_value.toString().split(" ")[0]
    )
    const curatorPayout = parseFloat(
      this.curator_payout_value.toString().split(" ")[0]
    )
    const pendingPayout = parseFloat(
      this.pending_payout_value.toString().split(" ")[0]
    )
    return (totalPayout + curatorPayout + pendingPayout).toFixed(3)
  }

  getThumbnail(): string {
    return (
      (this.metadata.image && this.metadata.image[0]) ||
      (this.body && extractFirstLink(this.body)) ||
      ""
    )
  }

  getFullUrl(): string {
    return `${getWebsiteURL()}/post${this.url}`
  }

  simplify(): PostProps {
    return {
      post_id: this.post_id,
      author: this.author,
      permlink: this.permlink,
      title: this.title,
      body: this.body,
      json_metadata: this.json_metadata,
      created: this.created,
      url: this.url,
      root_title: this.root_title,
      total_payout_value: this.total_payout_value,
      curator_payout_value: this.curator_payout_value,
      pending_payout_value: this.pending_payout_value,
      active_votes: this.active_votes,
    }
  }

  static simplifyFromDiscussion(post: Discussion): PostProps {
    return {
      // @todo remove when the Discussion get updated with new Props
      post_id: (post as any).post_id,
      author: post.author,
      permlink: post.permlink,
      title: post.title,
      body: post.body,
      json_metadata: post.json_metadata,
      created: post.created,
      url: post.url,
      root_title: post.root_title,
      total_payout_value: post.total_payout_value,
      curator_payout_value: post.curator_payout_value,
      pending_payout_value: post.pending_payout_value,
      active_votes: post.active_votes,
    }
  }
}

export interface PostMetadata {
  app: string
  format: string
  description: string
  tags: string[]
  users: string[]
  links: string[]
  image: string[]
}
