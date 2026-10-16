import { useImperativeHandle, forwardRef, useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { WebSocketHandlers } from "../utils/websocket";
// import { getUserAsuriteFromAuthCookie } from "../utils/cookie";
import PreviewBox from "./PreviewBox";

const Button = styled.button`
  width: 286px;
  height: 50px;
  border-radius: 25px;
  font-weight: bold;
`;

export interface ImperativeRef {
  submitQuery: (query: string, model: { key: string; name: string }) => void;
}

interface ModelViewProps {
  queryEnded: boolean;
  buttonName: string
  updateLastMessageTimestamp: (timestamp: number) => void;
  onChooseModel: (modelName: string) => void;
  onError: () => void;
  onComplete: () => void;
}

const getResponseError = (response: string) => {
  if (response.startsWith("An error has occurred:")) {
    return response.replace("An error has occurred:", "").trim();
  }

  try {
    const parsed = JSON.parse(response);
    if (parsed.message && (parsed.requestId || parsed.connectionId)) {
      return parsed.message === "Endpoint request timed out"
        ? "This model took too long to respond. Please start a new round."
        : parsed.message;
    }
  } catch {
    // Normal model responses are not JSON, so parsing failures are expected.
  }

  return null;
};

const ModelView = forwardRef<{}, ModelViewProps>(
  ({ queryEnded, buttonName, updateLastMessageTimestamp, onChooseModel, onError, onComplete }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fullMessage, setFullMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const hasResponseContent = useRef(false);
    const [currentModel, setCurrentModel] = useState<{
      key: string;
      name: string;
    } | null>(null);
    const { sendJsonMessage, lastMessage, hasError } = WebSocketHandlers();
    // const userAsurite = getUserAsuriteFromAuthCookie();
    useImperativeHandle(ref, () => ({
      submitQuery(nextQuery: string, model: { key: string; name: string; provider: string }) {
        setIsLoading(true)
        setFullMessage("");
        setErrorMessage("");
        hasResponseContent.current = false;
        setCurrentModel(model);
        sendJsonMessage({
          action: "queryV2",
          model_provider: model.provider,
          model_name: model.key,
          search_params: {
            prompt_mode: "custom",
            search_prompt: "Your role is to support students, researchers, and professors at ASU by addressing their questions comprehensively. You will have access to a variety of information sources related to Arizona State University, including a Knowledge Base. Use these resources at your discretion to formulate responses. If the Knowledge Base does not contain relevant information, rely on your own understanding to provide a well-informed answer for the questions related to ASU. Remember, do not disclose or mention the specifics of your information sources to the user. If the user asks questions not related to the knowledge base just answer them properly and offer assistance. Just provide clear and coherent answers directly. Knowledge Base: {data} Question: {query}"
          },
          // model: model.key,
          enable_search: true,
          query: nextQuery,
        });

      },
    }));
    // useImperativeHandle(ref, () => ({
    //   submitQuery(nextQuery: string, model: { key: string; name: string }) {
    //     setFullMessage("");
    //     setCurrentModel(model);
    //     sendJsonMessage({
    //       action: "query",
    //       asurite: userAsurite,
    //       model: model.key,
    //       query: nextQuery,
    //     });
    //   },
    // }));

    const handleClickChoose = useCallback(() => {
      if (currentModel) {
        onChooseModel(currentModel.name);
      }
    }, [currentModel, onChooseModel])

    useEffect(() => {
      if (lastMessage) {
        if (lastMessage.data === '<EOS>') {
          setIsLoading(false);
          if (!hasResponseContent.current) {
            setErrorMessage("This model returned an empty response. Please start a new round.");
            onError();
          } else {
            onComplete();
          }
          updateLastMessageTimestamp(Date.now());
          return;
        }

        const response = String(lastMessage.data);
        const responseError = getResponseError(response);
        if (responseError) {
          setIsLoading(false);
          setErrorMessage(responseError);
          onError();
        } else {
          if (response.trim()) hasResponseContent.current = true;
          setFullMessage((prev) => (prev || "") + response);
        }
        const now = new Date();
        updateLastMessageTimestamp(Number(now));
      }
    }, [lastMessage, onComplete, onError, updateLastMessageTimestamp]);

    useEffect(() => {
      if (hasError && isLoading) {
        setIsLoading(false);
        setErrorMessage("The response service disconnected. Please start a new round.");
        updateLastMessageTimestamp(Date.now());
        onError();
      }
    }, [hasError, isLoading, onError, updateLastMessageTimestamp]);

    return (
      <div className="flex flex-col flex-1 items-center">
        <PreviewBox
          message={fullMessage}
          loading={isLoading}
          error={errorMessage}
        />
        <Button
          className={`bg-[#8c1c3f] text-[#FAFAFA] mt-6 transition-opacity opacity-0 cursor-pointer ${
            queryEnded ? "opacity-100" : ""
          }`}
          disabled={!queryEnded}
          onClick={handleClickChoose}
        >
          {buttonName}
        </Button>
      </div>
    );
  }
);

export default ModelView;
