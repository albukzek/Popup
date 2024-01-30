import { AuthRequest, AuthResponse } from '@/data/interface/user'
import ApiBaseService from './ApiBaseService'
import instance from './ApiInstance'

export class AuthenticationService extends ApiBaseService {
  constructor (token?: string) {
    super(token)
  }

  async login (auth: AuthRequest) : Promise<AuthResponse> {
    const authData = {
      Login: auth.username,
      Password: auth.password
    }
    return instance
      .post(`Authorization/GetToken`, authData)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        return null
      })
  }
}
