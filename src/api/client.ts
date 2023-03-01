import CryptoJS from "crypto-js";

const baseUrl = "https://api.binance.com/api/v3/"

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    return null;
  }
  return response.json()
}

const apiClient = async ({ path, method, data }: apiClientProps) => {

  const apiKey = localStorage.getItem("apiKey");
  const apiSecret = localStorage.getItem("apiSecret");

  const timestamp = Date.now();
  const timeParams = `timestamp=${timestamp}`;
  const params = !!data ? `${data}${timeParams}` : `${timeParams}`;
  const signature = CryptoJS.HmacSHA256(params, apiSecret!).toString(CryptoJS.enc.Hex);
  const apiUrl = `${path}?${params}&signature=${signature}`;

  const requestOptions = {
    method,
    headers: { 'X-MBX-APIKEY': apiKey! },
  }
  return await fetch(`${baseUrl}${apiUrl}`, requestOptions).then(handleResponse)
}

interface apiClientProps {
  path: string
  method: string
  data?: string
}

export default apiClient
