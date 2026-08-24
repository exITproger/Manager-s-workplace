import type {LoginCredentials} from "~/types/LoginCredentials.ts";
import {loginRequest} from "~/api/auth";
import type {CookieRef} from "nuxt/app";

export const tokenCookie = (): CookieRef<string | null> => {
    return useCookie<string | null>('token')
}

export const token = (): string | null => {
    return tokenCookie().value;
}

export const useAuth = () => {
    const token = tokenCookie()
    const login = (credentials: LoginCredentials) => {
        return loginRequest(credentials)
            .then((response) =>
                token.value = response.token
            )
    }

    const logout = () => {
        token.value = null
        navigateTo('/')
    }

    return {login, logout}
}