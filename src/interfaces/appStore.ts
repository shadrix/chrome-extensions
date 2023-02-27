import { ParentWindow } from "../messaging/ParentWindow";
import AuthStore from "../stores/AuthStore";

export interface IAppStore {
    'authStore': AuthStore
    'parentWindow': ParentWindow
}