import { Fragment } from "react";
import styled from "styled-components";
import MirageLoader from "./mirage-loader";

const Preview = styled.div`
  height: 363px;
  width: 100%;
  padding: 32px;
  border: 1px solid #000;
  // background: #191919 0% 0% no-repeat padding-box;
  background: rgba(0,0,0,0.8);
  color: #fff;
  overflow-y: auto;
  border-radius:20px;


  @media (max-width: 1025px) {
    width: 100%;
  }


`;

const PreviewBox = ({ message, loading }: { message: string; loading: boolean }) => {
  return (
    <Preview>
      {
        loading ?
        <MirageLoader color="#ffffff" size={8} showMessaging />
        :
        message.split("\n").map((chunk, idx) => (
          <Fragment key={idx}>
           {chunk}
           <br />
         </Fragment>
       ))

      }


    </Preview>
  );
};

export default PreviewBox;
