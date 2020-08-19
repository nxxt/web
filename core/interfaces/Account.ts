export interface AuthData {
  token: string
  refreshToken: string
}

export interface Account {
  uid: string
  email?: string | null
  emailVerified?: boolean | null
  displayName?: string | null
  photoURL?: string | null
}
