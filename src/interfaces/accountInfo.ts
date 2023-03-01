import { Balance } from "./balance";
import { CommissionRates } from "./commissionRates";

export interface AccountInfo {
    makerCommission: number;
    takerCommission: number;
    buyerCommission: number;
    sellerCommission: number;
    commissionRates: CommissionRates;
    canTrade: boolean;
    canWithdraw: boolean;
    canDeposit: boolean;
    brokered: boolean;
    requireSelfTradePrevention: boolean;
    updateTime: number;
    accountType: string;
    balances: Balance[];
    permissions: string[];
  }