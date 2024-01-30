export interface UserInfo {
  login: string,
  name: string
  departmentInfo: string | null,
  date: string
}

export interface AuthRequest {
  username: string,
  password: string
}

export interface AuthResponse {
  token: string,
  lifeTime: number,
  userInfo: UserInfo
}

export interface PersonalStats {
  personalReception: {
      sent: Number,
      returned: Number
  },
  callReception: {
      inbound: Number
  }
}
