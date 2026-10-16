import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import ErrorModal from "../components/modals/error-modal";
import ResultModal from "../components/modals/result-modal";
import ModelView, { ImperativeRef } from "../components/model-view";
// import { getTwoRandomModels, formatTime } from "../utils/helper";
import { getTwoRandomModels } from "../utils/helper";

const Title = styled.h1`
  font-size: 96px;
  line-height: 107px;
  text-align: center;
  letter-spacing: -5.76px;
  color: #ffffff;
  font-weight: bold;

  // Medium devices (tablets, 768px and up)
  @media (max-width: 768px) {
    font-size: 72px;
    line-height: 82px;
    letter-spacing: -4px;
  }

  // Small devices (landscape phones, 576px and up)
  @media (max-width: 576px) {
    font-size: 52px;
    line-height: 54px;
    letter-spacing: -2px;
  }
`;
const PageWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 10px;

  @media (max-width: 1024px) {
    padding-top: 100px;
  }
`;

const Description = styled.p`
  max-width: 743px;
  color: #ffffff;

  @media (max-width: 1000px) {
    max-width: 90%;
  }
`;

const Input = styled.input`
  width: 596px;
  border: 1px solid #747474;
  background-color: #ffffff;
  font-size: 16px;
  line-height: 16px;
  padding: 10px 16px;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

const Button = styled.button`
  width: 147px;
  height: 40px;
  font-size: 16px;
  border-radius: 10px;
  color: #191919;
  font-weight: bold;
  background-color: #ffc627;
`;

// const VSText = styled.h2`
//   font-size: 160px;
//   line-height: 180px;
//   color: #191919;
//   font-weight: bold;
// `;

// const TimerText = styled.span`
//   letter-spacing: -1.4px;
//   color: #191919;
//   text-align: center;
//   font-size: 40px;
//   line-height: 44px;
//   font-weight: bold;
//   margin-top: -24px;
// `;

function Home() {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [nextQuery, setNextQuery] = useState("");
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<
    number | null
  >(null);
  const [randomModels, setRandomModels] = useState<
    { key: string; name: string }[]
  >([]);
  const [winModelIdx, setWinModelIdx] = useState<number | null>(null);
  const [disableTimer, setDisableTimer] = useState(false);

  const modelViewRef1 = useRef<ImperativeRef | null>(null);
  const modelViewRef2 = useRef<ImperativeRef | null>(null);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    // Check if the last message was received more than 1 second ago to re-enable the ability to query models.
    // Otherwise, without disabling the button, messages from the backend for multiple queries will interweave as it it not possible to group messages from the backend based on the query they respond to.
    const interval = setInterval(() => {
      if (
        !!lastMessageTimestamp &&
        Number(new Date()) - lastMessageTimestamp > 2000
      ) {
        setDisableTimer(false);
      }

      if (disableTimer && counter > 0) {
        setCounter((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastMessageTimestamp, disableTimer, counter]);

  const handleSubmit = useCallback(
    (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault(); // Prevent the form from refreshing the page
      const models = getTwoRandomModels();

      setRandomModels(models);
      setCounter(60);
      setDisableTimer(true);
      if (modelViewRef1.current) {
        modelViewRef1.current.submitQuery(nextQuery, models[0]);
      }
      if (modelViewRef2.current) {
        modelViewRef2.current.submitQuery(nextQuery, models[1]);
      }
    },
    [nextQuery]
  );

  const handleQueryChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNextQuery(evt.currentTarget.value);
  };

  return (
    <PageWrapper className="lg:container lg:mx-auto lg:px-4 h-full flex flex-col items-center">
      <Title>Model Showdown!</Title>
      <Description className="text-center mb-7">
        Watch as two anonymous AI models face off in a battle of wits. Your
        task: craft a challenge prompt, the countdown will begin and it’s up to
        you to swiftly evaluate the model’s responses. Can you choose the AI
        with the most impressive answer before time runs out?
      </Description>
      <div className="flex justify-center w-full">
        <form className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full max-w-lg" onSubmit={handleSubmit}>
          <Input placeholder="Type a prompt" onChange={handleQueryChange} />
          <Button
            className="bg-red-300"
            disabled={!nextQuery && !disableTimer}
            type="submit"
          >
            Begin!
          </Button>
        </form>
      </div>
      <div className="flex flex-col md:flex-row items-center mt-8 md:mt-[68px] gap-10 md:gap-12 w-[90%]">

        <ModelView
          ref={modelViewRef1}
          updateLastMessageTimestamp={setLastMessageTimestamp}
          queryEnded={!disableTimer && !!lastMessageTimestamp}
          buttonName="Choose model 1"
          onChooseModel={() => {
            setWinModelIdx(0);
            setShowResultModal(true);
          }}
        />
        <div className="flex flex-col mt-[-60px] w-[200px]">
          {/* <VSText>VS</VSText>
          <TimerText>{formatTime(counter)}</TimerText> */}
        </div>
        <ModelView
          ref={modelViewRef2}
          updateLastMessageTimestamp={setLastMessageTimestamp}
          queryEnded={!disableTimer && !!lastMessageTimestamp}
          buttonName="Choose model 2"
          onChooseModel={() => {
            setWinModelIdx(1);
            setShowResultModal(true);
          }}
        />
      </div>
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
      {winModelIdx !== null && (
        <ResultModal
          open={showResultModal}
          onClose={() => setShowResultModal(false)}
          winner={randomModels[winModelIdx].name}
          loser={randomModels[winModelIdx === 0 ? 1 : 0].name}
        />
      )}
    </PageWrapper>
  );
}

export default Home;
