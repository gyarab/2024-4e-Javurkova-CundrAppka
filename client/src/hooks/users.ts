import { User } from 'models/user'
import { fetchData } from 'hooks/fetchData'

export interface RegistrationCredentials {
    username: string,
    email: string,
    password: string
}

export async function useFetchUser(): Promise<User> {
    const response = await fetchData('/api/users', { method: 'GET' })
    return response.json()
}

export async function useRegisterUser(credentials: RegistrationCredentials): Promise<User> {
    const response = await fetchData('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}

export interface LogInCredentials {
    username: string,
    password: string
}

export async function useLoginUser(credentials: LogInCredentials): Promise<User> {
    const response = await fetchData('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })  
    return response.json()
}

export async function useLogoutUser() {
    await fetchData('/api/users/logout', { method: 'POST' })
}
