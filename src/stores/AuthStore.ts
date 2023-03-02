import { makeAutoObservable} from "mobx";
import * as api from "../api/modules/account"
import { AccountInfo } from "../interfaces/accountInfo";

class AuthStore {
    accountInfo : AccountInfo | null = null;
    accountTradeHistory : AccountInfo | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async initAccountInfo() {
        const info = await api.accountInfo();
        if (info !== null) {
            this.accountInfo = info as AccountInfo;
            await api.accountTradeHistory();
        } else {
            this.accountInfo = null;
        }
    }

    
    async login(apiKey: string, apiSecret: string) { 
        localStorage.setItem("apiKey",  apiKey);
        localStorage.setItem("apiSecret",  apiSecret);
        await this.initAccountInfo();
    }

    async logout() { 
        localStorage.setItem("apiKey",  '');
        localStorage.setItem("apiSecret",  '');
        await this.initAccountInfo();
    }
}

export default AuthStore;