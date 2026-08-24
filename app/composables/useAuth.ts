import type {UserMeResponse} from "~/types/UserMeResponse.ts";
import type {LoginCredentials} from "~/types/LoginCredentials.ts";
import {fetchMeRequest, loginRequest} from "~/api/auth";

export const useAuth = () => {
  const token = useCookie<string | null>('token')
  const user = useState<UserMeResponse | null>('auth:user', () => null)

  const login = (credentials: LoginCredentials) => {
    return loginRequest(credentials)
      .then((response) =>
        fetchMeRequest(response.token)
          .then((me) => {
            token.value = response.token
            user.value = me
          })
      )
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  return { user, login, logout }
}
