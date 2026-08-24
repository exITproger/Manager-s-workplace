import type {UserLoginResponse} from "~/types/UserLoginResponse.ts";
import type {UserMeResponse} from "~/types/UserMeResponse.ts";
import type {LoginCredentials} from "~/types/LoginCredentials.ts";

let client: ReturnType<typeof $fetch.create> | null = null

const useApi = () => {
  if (!client) {
    const config = useRuntimeConfig()
    client = $fetch.create({ baseURL: config.public.apiBase as string })
  }
  return client
}

const toBase64 = (value: string) => {
  const bytes = new TextEncoder().encode(value)
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

export function loginRequest(credentials: LoginCredentials): Promise<UserLoginResponse> {
  return useApi()<UserLoginResponse>('/user/login', {
    method: 'POST',
    headers: { Authorization: `Basic ${toBase64(`${credentials.login}:${credentials.password}`)}` }
  })
}

export function fetchMeRequest(token: string): Promise<UserMeResponse> {
  return useApi()<UserMeResponse>('/user/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
}
