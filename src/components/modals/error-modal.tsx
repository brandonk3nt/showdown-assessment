import styled from "styled-components";
import Modal, { Styles } from "react-modal";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#8C1D40 0% 0% no-repeat padding-box",
    width: "60vw",
    height: 740,
    borderRadius: "10px",
    border: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: `rgba(0,0,0, 0.66)`,
  },
};

const ModalTitle = styled.h2`
  font-size: 120px;
  line-height: 134px;
  font-weight: bold;
  letter-spacing: -4.2px;
`;

const ModalBody = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TryButton = styled.div`
  background-color: #ffc627;
  text-align: center;
  border-radius: 20px;
  color: #191919;
  font-size: 16px;
  line-height: 12px;
  font-weight: bold;
  padding: 12px 48px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  background-color: #fff;
  text-align: center;
  border-radius: 20px;
  color: #191919;
  font-size: 16px;
  line-height: 12px;
  font-weight: bold;
  padding: 12px 48px;
`;

const CloseIconButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background-color: #e8e8e8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal = ({ open, onClose }: ErrorModalProps) => {
  return (
    <Modal
      isOpen={open}
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
    >
      <ModalBody>
        <CloseIconButton onClick={onClose}>
          <AiOutlineClose color="#373737" />
        </CloseIconButton>
        <ModalTitle className="text-center mb-2">Sorry</ModalTitle>
        <p className="text-[40px] font-bold tracking-[-1.4px] leading-[44px] mb-1">
          You have run out of time :(
        </p>
        <span className="text-lg text-center mb-8">
          Don’t worry, you can always give it another shot!
        </span>
        <div className="flex gap-3.5">
          <TryButton>Try again</TryButton>
          <StyledLink to="/leaderboard">View leaderboard</StyledLink>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ErrorModal;
