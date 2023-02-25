import { useEffect, useState } from "react";
import { ParentWindow } from "../../messaging/ParentWindow";
import "./App.css";

/*
  Instantiate a new ParentWindow object.
  This object will be used to send and receive messages from the parent window.
*/
const parentWindow = new ParentWindow();

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    /*
      Register a callback function that will be called
      when a message is received from the parent window.
    */
    parentWindow.onMessage((message) => {
      console.log("Message received from parent window: ", message);
      /*
        Handle the message based on its type.
        Each message type should be handled in a different case.

        Create new message types in the messaging/messageTypes.ts file.
      */
      switch (message.type) {
        case "CRYPTO_BUTTON_CLICKED":
          setMessage(message.content.message);
          break;
      }
    });
  });
  return (
    <div className="App">
      <button
        onClick={() => {
          parentWindow.sendMessage({
            type: "SCAN_DOM",
            content: {
              message: "Hello, parent!",
            },
          });
        }}
        style={{ margin: "0.5rem 0" }}
      >
        Scan channel
      </button>
      {message}
    </div>
  );
}

export default App;
