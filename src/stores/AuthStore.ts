import { makeAutoObservable} from "mobx";
import CryptoJS from "crypto-js";

class AuthStore {
    token = "";

    constructor() {
        makeAutoObservable(this);
    }

    async login(apiKey: string, apiSecret: string) { 
        const timestamp = Date.now();
        const params = `timestamp=${timestamp}`;
        const signature = CryptoJS.HmacSHA256(params, apiSecret).toString(CryptoJS.enc.Hex);
        const apiUrl = `https://api.binance.com/api/v3/account?${params}&signature=${signature}`;
        const headers = { 'X-MBX-APIKEY': apiKey };
      
        // Make API call using fetch()
        return fetch(apiUrl, { headers })
          .then(response => response.json())
          .then(data => {
            console.log(data); // Account info object
            return data;
          })
          .catch(error => console.error(error));
    }
}

export default AuthStore;