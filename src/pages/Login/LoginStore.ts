import { makeAutoObservable } from "mobx";
import AuthStore from "../../stores/AuthStore";


class LoginStore {

    private authStore: AuthStore;

    apiKey = '';
    apiSecret = '';
    error = '';
    isLoading = false;

    constructor(authStore: AuthStore) {
        this.authStore = authStore;
        makeAutoObservable(this);
    }

    changeApiKey(apiKey: string) {
        this.apiKey = apiKey;
        if (!!this.error) {
            this.error = '';
        }
    }

    changeApiSecret(apiSecret: string) {
        this.apiSecret = apiSecret;
        if (!!this.error) {
            this.error = '';
        }
    }

    async login() {
        try {
            this.isLoading = true;
            await this.authStore.login(this.apiKey, this.apiSecret);
        }
        catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
        }
        this.isLoading = false;
    }
}

export default LoginStore;