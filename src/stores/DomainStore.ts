import { makeAutoObservable} from "mobx";
import * as apiAccount from "../api/modules/account"
import * as apiSpot from "../api/modules/spot"
import { AccountInfo } from "../interfaces/accountInfo";
import { Order } from "../interfaces/order";


class DomainStore {
    accountInfo : AccountInfo | null = null;
    orders : Order[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async prefetch() {
        const info = await apiAccount.accountInfo();
        if (info !== null) {
            this.accountInfo = info as AccountInfo;
            this.orders = await apiSpot.openOrders() as Order[];
        } else {
            this.accountInfo = null;
        }
    }

    
    async login(apiKey: string, apiSecret: string) { 
        localStorage.setItem("apiKey",  apiKey);
        localStorage.setItem("apiSecret",  apiSecret);
        await this.prefetch();
    }

    async logout() { 
        localStorage.setItem("apiKey",  '');
        localStorage.setItem("apiSecret",  '');
        await this.prefetch();
    }
}

export default DomainStore;