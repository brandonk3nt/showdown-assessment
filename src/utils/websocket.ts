import { useCallback, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { getJwtToken, isAuthCookieValid, redirectToAuth } from "./cookie";
import { getAppEnv } from "./helper";

export const WebSocketHandlers = () => {
  const [hasError, setHasError] = useState(false);

  // HOOKS
  const getSocketUrl = useCallback(() => {
    let token = getJwtToken();
    return `${getAppEnv().socketUrl}?access_token=${token}`;
  }, []);

  // CONST VALS
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    getSocketUrl,
    {
      onOpen: () => setHasError(false),
      shouldReconnect: () => true,
      reconnectAttempts: 3,
      onError: () => {
        setHasError(true);
        const authCookieIsValid = isAuthCookieValid();
        if (!authCookieIsValid) {
          redirectToAuth();
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return {
    sendJsonMessage,
    lastMessage,
    status: connectionStatus,
    hasError,
  };
};
