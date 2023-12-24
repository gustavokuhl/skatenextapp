export interface UserProps {
  id: number
  name: string
  created: string
  posting_json_metadata: string
}

export default class UserModel {
  id: number
  name: string
  created: string
  posting_json_metadata: string
  metadata?: UserMetadata

  constructor(user?: UserProps) {
    this.id = user?.id || 0
    this.name = user?.name || ""
    this.created = user?.created || ""
    this.posting_json_metadata = user?.posting_json_metadata || "{}"
    this.metadata = JSON.parse(this.posting_json_metadata)
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
