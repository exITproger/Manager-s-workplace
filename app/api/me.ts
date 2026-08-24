import type {UserMeResponse} from "~/types/UserMeResponse.ts";
import {token, tokenCookie} from "~/composables/useAuth.ts";

export function useMeRequest() {
    const config = useRuntimeConfig()

    return useFetch<UserMeResponse>('/user/me', {
        key: 'me',
        baseURL: config.public.apiBase as string,
        headers: {Authorization: `Bearer ${token()}`},
        onResponseError({response}) {
            if (response.status === 401) {
                tokenCookie().value = null
                navigateTo('/')
            }
        }
    })
}
