import type {UserMeResponse} from "~/types/UserMeResponse.ts";
import {useApi} from "~/api/auth.ts";
import {token} from "~/composables/useAuth.ts";

export function fetchOrCacheMeRequest(): Promise<UserMeResponse> {
    return fetchOrCacheMeRequestRow(token())
}

export function fetchOrCacheMeRequestRow(token: string | null): Promise<UserMeResponse> {
    const user = useState<UserMeResponse | null>('auth:user', () => null)

    if (user.value) {
        return Promise.resolve(user.value)
    }

    return fetchMeRequest(token).then((data) => {
        user.value = data
        return data
    })
}

export function fetchMeRequest(token: string | null): Promise<UserMeResponse> {
    return useApi()<UserMeResponse>('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
