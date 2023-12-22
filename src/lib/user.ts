export default class User {
  id: number
  name: string
  created: string
  posting_json_metadata: string
  metadata?: Metadata

  constructor(user?: User) {
    this.id = user?.id || 0
    this.name = user?.name || ""
    this.created = user?.created || ""
    this.posting_json_metadata = user?.posting_json_metadata || "{}"
    this.metadata = JSON.parse(this.posting_json_metadata)
  }
}

interface Metadata {
  profile: Profile
}

interface Profile {
  website: string
  profile_image: string
  cover_image: string
}