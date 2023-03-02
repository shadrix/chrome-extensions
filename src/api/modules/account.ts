import apiClient from '../client'

export const accountInfo = () => apiClient({
    path: `account`,
    method: 'get'
})

export const accountTradeHistory = () => apiClient({
    path: `myTrades`,
    method: 'get',
    data: `startTime=${Date.now() - 90 * 24 * 60 * 60 * 1000}&endTime=${Date.now()}`
})