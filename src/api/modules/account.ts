import apiClient from '../client'

export const accountInfo = () => apiClient({
    path: `account`,
    method: 'get'
})
