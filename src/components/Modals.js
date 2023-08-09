import { createPortal } from "react-dom";

import { HomePasswordChangeModal, HomeWithdrawalChild } from "./HomeChild";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".modalContainer");
  return createPortal(children, target);
};

const Modals = ({
                  withdrawalModalOpen,
                  setWithdrawalModalOpen,
                  passwordChangeModalOpen,
                  setPasswordChangeModalOpen
                }) => {
  return (
    <>
      {withdrawalModalOpen && (
        <ModalPortal>
          <HomeWithdrawalChild
            setWithdrawalModalOpen={setWithdrawalModalOpen}
          />
        </ModalPortal>
      )}
      {passwordChangeModalOpen && (
        <ModalPortal>
          <HomePasswordChangeModal
            setPasswordChangeModalOpen={setPasswordChangeModalOpen}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default Modals;
