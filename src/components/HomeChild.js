import "./styles/portal.css";

const HomeChild = ({ handleDelUserClick, setModalOpen }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <p>本当に退会しますか？</p>
        <div>
          <button type="button" onClick={handleDelUserClick}>
            本当に退会する
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setModalOpen(false)}>
            やっぱり退会するの止める
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeChild;
