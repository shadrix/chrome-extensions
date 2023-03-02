type MessageType = "SCAN_DOM" | "CRYPTO_BUTTON_CLICKED";

export interface Message {
  type: MessageType;
  content?: any;
}
