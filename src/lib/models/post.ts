export default class PostModel {
  id: number
  author: string
  permlink: string
  title: string
  body: string
  json_metadata: string
  metadata?: PostMetadata
  created: string

  constructor(post?: PostModel) {
    this.id = post?.id || 0
    this.author = post?.author || ""
    this.permlink = post?.permlink || ""
    this.title = post?.title || ""
    this.body = post?.body || ""
    this.json_metadata = post?.json_metadata || "{}"
    this.metadata = JSON.parse(this.json_metadata) as PostMetadata
    this.created = post?.created || Date.now().toString()
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
