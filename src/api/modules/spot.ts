import apiClient from "../client";

export const openOrders = () => apiClient({
  path: `openOrders`,
  method: 'get'
})
