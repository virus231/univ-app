export interface AuthResponse {
    id: number,
    email: string,
    username: string,
    isAuth: boolean,
    error: string | null,
    loading: boolean,
    user: string
}

export interface RegisterBody{
    name: string,
    email: string,
    password: string
}

export interface StateHandlers {
    isAuth: boolean,
    currentUser: CurrentUser
}

export interface CurrentUser {
    id: string
    display_name: string
    email: string
    photo_url: string
}