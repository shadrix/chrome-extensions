type MessageType = "SCAN_DOM" | "CRYPTO_BUTTON_CLICKED";

export interface Message {
  type: MessageType;
  content?: any;
}

type SignalType = "NONE" | "BUY" | "SELL";

type SubSignalType = "NONE" | "CANCEL" | "REOPEN";

export interface SignalMessage extends Message {
  type: "CRYPTO_BUTTON_CLICKED";
  content: {
    type: SignalType;
    subType: SubSignalType;
    symbol: string;
    price: string;
  };
}