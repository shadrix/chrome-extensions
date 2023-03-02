import { ParentWindow } from "../messaging/ParentWindow";
import DomainStore from "../stores/DomainStore";

export interface IAppStore {
    'domainStore': DomainStore
    'parentWindow': ParentWindow
}