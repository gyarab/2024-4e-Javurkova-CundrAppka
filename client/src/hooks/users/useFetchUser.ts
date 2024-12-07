import { User } from '../../models/user'
import { fetchData } from 'hooks/fetchData'

export async function useFetchUser(): Promise<User> {
    const response = await fetchData('/api/users', { method: 'GET' })
    return response.json()
}
