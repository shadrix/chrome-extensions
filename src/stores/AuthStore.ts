import { makeAutoObservable} from "mobx";

class AuthStore {
    token = "";

    constructor() {
        makeAutoObservable(this);
    }

    async login(apiKey: string, apiSecret: string) {
        this.token = "token";
    }
}

export default AuthStore;