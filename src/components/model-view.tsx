import { useImperativeHandle, forwardRef, useState, useEffect, useCallback } from "react";
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
}

const ModelView = forwardRef<{}, ModelViewProps>(
  ({ queryEnded, buttonName, updateLastMessageTimestamp, onChooseModel }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fullMessage, setFullMessage] = useState("");
    const [currentModel, setCurrentModel] = useState<{
      key: string;
      name: string;
    } | null>(null);
    const { sendJsonMessage, lastMessage } = WebSocketHandlers();
    // const userAsurite = getUserAsuriteFromAuthCookie();
    useImperativeHandle(ref, () => ({
      submitQuery(nextQuery: string, model: { key: string; name: string; provider: string }) {
        setIsLoading(true)
        setFullMessage("");
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
        let response =lastMessage.data === '<EOS>' ? '' : lastMessage.data;
        setIsLoading(false);
        setFullMessage((prev) => (prev || "") + (response as string));
        const now = new Date();
        updateLastMessageTimestamp(Number(now));
      }
    }, [lastMessage, updateLastMessageTimestamp]);

    return (
      <div className="flex flex-col flex-1 items-center">
        <PreviewBox message={fullMessage} loading={isLoading} />
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
