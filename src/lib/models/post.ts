export interface PostProps {
  id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  metadata?: PostMetadata
  created: string
  url: string
  root_title: string
  total_payout_value: string
  curator_payout_value: string
  pending_payout_value: string
  earnings?: number
}

export default class PostModel {
  id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  metadata?: PostMetadata
  created: string
  url: string
  root_title: string
  total_payout_value: string
  curator_payout_value: string
  pending_payout_value: string
  earnings?: number

  constructor(post?: PostProps) {
    this.id = post?.id || 0
    this.author = post?.author || ""
    this.permlink = post?.permlink || ""
    this.title = post?.title || ""
    this.body = post?.body || ""
    this.json_metadata = post?.json_metadata || "{}"
    this.metadata = JSON.parse(this.json_metadata) as PostMetadata
    this.created = post?.created || Date.now().toString()
    this.url = post?.url || ""
    this.root_title = post?.root_title || ""
    this.total_payout_value = post?.total_payout_value || "0.000 HBD"
    this.curator_payout_value = post?.curator_payout_value || "0.000 HBD"
    this.pending_payout_value = post?.pending_payout_value || "0.000 HBD"
    this.earnings = this.getEarnings()
    console.log(this.earnings)
  }

  getEarnings(): number {
    const totalPayout = parseFloat(
      this.total_payout_value.toString().split(" ")[0]
    )
    const curatorPayout = parseFloat(
      this.curator_payout_value.toString().split(" ")[0]
    )
    const pendingPayout = parseFloat(
      this.pending_payout_value.toString().split(" ")[0]
    )
    return totalPayout + curatorPayout + pendingPayout
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

export interface PostData {
  id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  created: string
}
