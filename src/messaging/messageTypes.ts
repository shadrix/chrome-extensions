/*
  Messages that will be transferred between
  the child iframe and the parent window.
*/

/*
  MessageTitle type is used to identify the message.
*/
type MessageType = "SCAN_DOM" | "CRYPTO_BUTTON_CLICKED";

/*
  Generic message interface.
*/
export interface Message {
  type: MessageType;
  content?: any;
}

/*
  Specific message interfaces.
  Add more as needed by extending the Message interface.
*/
export interface HelloRequestMessage extends Message {
  type: "SCAN_DOM";
  content: {
    message: string;
  };
}
export interface HelloResponseMessage extends Message {
  type: "CRYPTO_BUTTON_CLICKED";
  content: {
    message: string;
  };
}
