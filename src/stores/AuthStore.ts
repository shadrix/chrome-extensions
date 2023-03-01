import { makeAutoObservable} from "mobx";
import * as api from "../api/modules/account"
import { AccountInfo } from "../interfaces/accountInfo";

class AuthStore {
    accountInfo : AccountInfo | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async initAccountInfo() {
        const info = await api.accountInfo();
        if (info !== null) {
             this.accountInfo = info as AccountInfo;

        } else {
             console.error("Account info could not be retrieved");
        }
    }

    
    async login(apiKey: string, apiSecret: string) { 
        localStorage.setItem("apiKey",  apiKey);
        localStorage.setItem("apiSecret",  apiSecret);
        await this.initAccountInfo();
    }
}

export default AuthStore;