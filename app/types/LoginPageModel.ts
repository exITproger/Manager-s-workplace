import type {LoginCredentials} from "~/types/LoginCredentials.ts";

export interface LoginPageModel extends LoginCredentials {
    loading: boolean,
    errors: string[]
}
