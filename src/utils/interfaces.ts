export interface AuthResponse {
    id: number,
    email: string,
    username: string | null | object,
    isAuth: boolean,
    error: string | null,
    loading: boolean,
    user: null,
}

export interface RegisterBody{
    name: string,
    email: string,
    password: string
}


export interface CurrentUser {
    id: string
    display_name: string
    email: string
    photo_url: string
}