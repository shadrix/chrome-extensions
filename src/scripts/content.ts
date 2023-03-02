
import { ReactApp } from "../messaging/ReactApp";

let injectedDiv: HTMLDivElement | null = null;
let injectedIframe: HTMLIFrameElement | null = null;
let appVisible: boolean = false;

function injectReactApp(): void {
  if (injectedDiv) {
    return;
  }
  const div = document.createElement("div");
  div.setAttribute("id", "react-app-div");
  div.setAttribute("class", "opened");
  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", "react-app-iframe");
  iframe.setAttribute("src", chrome.runtime.getURL("index.html"));
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", chrome.runtime.getURL("index.css"));
  document.querySelector("head")?.appendChild(link);
  div.appendChild(iframe);
  document.querySelector("body")?.appendChild(div);
  injectedDiv = div;
  injectedIframe = iframe;
  appVisible = true;
}

if (window.self === window.top) {
  const KEY_BIND = "Q";
  window.addEventListener("keyup", (event) => {
    if (event.shiftKey && event.key.toLowerCase() === KEY_BIND.toLowerCase()) {
      if (!injectedDiv) {
        injectReactApp();
        startConnection();
      } else {
        if (appVisible) {
          injectedDiv.setAttribute("class", "closed");
          appVisible = false;
        } else {
          injectedDiv.setAttribute("class", "opened");
          appVisible = true;
        }
      }
    }
  });
}

function startConnection(): void {
  const reactApp = new ReactApp(injectedIframe);
  reactApp.onMessage((message) => {
    switch (message.type) {
      case "SCAN_DOM":
        const messageElements = Array.from(
          document.querySelectorAll("div[id^='message']")
        );
      
        const filteredMessages = messageElements.filter((message) => {
          const metaElement = message.querySelector(".text-content.with-meta");
          const hashtagElement = message.querySelector(".text-entity-link");
        
          if (
            metaElement &&
            metaElement.textContent?.includes("🚨") &&
            hashtagElement &&
            hashtagElement.textContent?.startsWith("#")
          ) {
            const limitOrderElement = metaElement.querySelector(":nth-child(3)");
            const limitOrderText = limitOrderElement !== null ? limitOrderElement.nextSibling?.textContent?.trim() || "" : "";
            const isLimitOrderExecuted = limitOrderText.includes("executed");
        
            return !isLimitOrderExecuted;
          }
        
          return false;
        });
       
        filteredMessages.forEach((messageElement) => {
          if (!messageElement.querySelector(".crypto")) {
            const button = document.createElement("button");
            button.classList.add("crypto");
            button.textContent = "Click me";
            button.style.zIndex = "999999";
            messageElement.insertBefore(button, messageElement.firstChild);

            button.addEventListener("click", () => {
              const messageHTML = messageElement.outerHTML;
              reactApp.sendMessage({
                type: "CRYPTO_BUTTON_CLICKED",
                content: {
                  message: messageHTML,
                },
              });
            });
          }
        });

        break;
    }
  });
}

export {};
