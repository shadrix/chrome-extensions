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
        const apiKey = localStorage.getItem("apiKey");
        if (apiKey !== null){
            const info = await apiAccount.accountInfo();
            if (info !== null) {
                this.accountInfo = info as AccountInfo;
                this.orders = await apiSpot.openOrders() as Order[];
                return;
            } 
        }
        this.orders = null;
        this.accountInfo = null;
    }

    
    async login(apiKey: string, apiSecret: string) { 
        localStorage.setItem("apiKey",  apiKey);
        localStorage.setItem("apiSecret",  apiSecret);

        const info = await apiAccount.accountInfo();
        if (info !== null) {
            this.accountInfo = info as AccountInfo;
            this.orders = await apiSpot.openOrders() as Order[];
        }
    }

    logout() { 
        localStorage.setItem("apiKey",  '');
        localStorage.setItem("apiSecret",  '');
        this.orders = null;
        this.accountInfo = null;
    }
}

export default DomainStore;