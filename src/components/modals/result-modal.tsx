import styled from "styled-components";
import Modal, { Styles } from "react-modal";
// import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const getWidth = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) { // Desktop
    return '60vw';
  } else if (screenWidth <= 1024 && screenWidth > 768) { // Tablet
    return '80vw';
  } else { // Phones
    return '90vw';
  }
};

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#FFC627",
    width: getWidth(),
    height: 'max-content',
    borderRadius: "10px",
    border: "1px solid #000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 100

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

  // Medium devices (tablets, 768px and up)
  @media (max-width: 768px) {
    font-size: 50px;
    line-height: 64px;
  }

  // Small devices (landscape phones, 576px and up)
  @media (max-width: 576px) {
    font-size: 50px;
    line-height: 64px;
  }
`;

const ModalBody = styled.div`
  color: #191919;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TryButton = styled.div`
  background-color: #191919;
  text-align: center;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  line-height: 12px;
  font-weight: bold;
  padding: 12px 48px;
  cursor: pointer;
`;

// const StyledLink = styled(Link)`
//   background-color: #fff;
//   text-align: center;
//   border-radius: 20px;
//   color: #191919;
//   font-size: 16px;
//   line-height: 12px;
//   font-weight: bold;
//   padding: 12px 48px;
// `;

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

interface ResultModalProps {
  open: boolean;
  winner: string;
  loser: string;
  onClose: () => void;
}

const ResultModal = ({ open, winner, loser, onClose }: ResultModalProps) => {
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
        <ModalTitle className="text-center mb-2">{winner}</ModalTitle>
        <span className="text-lg text-center mb-8 max-w-[680px]">
          steps forward as your AI pick for this round, facing off against{" "}
          <strong>{loser}</strong>.
          {/* This model tracks a record of{" "}
          <strong>234 wins</strong> and <strong>124 losses</strong> in prior
          matchups. */}
        </span>
        <div className="flex gap-3.5">
          <TryButton onClick={onClose}>Try again</TryButton>
          {/* <StyledLink to="/leaderboard">View leaderboard</StyledLink> */}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ResultModal;
