import { useNavigate } from "react-router-dom";
import { delUserEmail } from "../service/authenticationProcess/deleteUser";
import changePassword from "../service/authenticationProcess/changPassword";
import "./styles/portal.css";
import { issueMsg } from "../service/common/issueMsg";

export const HomeWithdrawalChild = ({
  setWithdrawalModalOpen,
}) => {
  const navigate = useNavigate();
  const handleDelUserClick = () => {
    delUserEmail().then((res) => {
      setWithdrawalModalOpen(false);
      res && navigate("/SignUp");
    });
  };
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
          <button type="button" onClick={() => setWithdrawalModalOpen(false)}>
            やっぱり退会しない
          </button>
        </div>
      </div>
    </div>
  );
};

export const HomePasswordChangeModal = ({
  setPasswordChangeModalOpen,
}) => {

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const [oldPassword, newPassword, sameNewPassword] = e.target.elements;
    if (!oldPassword.value) {
      issueMsg("「今までのパスワード」が入力されていません");
      return;
    } else if (!newPassword.value) {
      issueMsg("「新しいパスワード」が入力されていません");
      return;
    }else if (!sameNewPassword.value) {
      issueMsg("「新しいパスワードをもう一度」が入力されていません");
      return;
    }
    if (newPassword.value !== sameNewPassword.value) {
      issueMsg("「新しいパスワード」と「新しいパスワードをもう一度」が不一致です");
      return;
    }

    await changePassword(oldPassword.value,newPassword.value);
    setPasswordChangeModalOpen(false);
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <form onSubmit={ handleChangePassword }>
          <div>
            <label htmlFor="oldPassword">
              今までのパスワード
              <input type="password" name="oldPassword" id="oldPassword" />
            </label>
          </div>
          <div>
            <label htmlFor="newPassword">
              新しいパスワード
              <input type="password" name="newPassword" id="newPassword" />
            </label>
          </div>
          <div>
            <label htmlFor="sameNewPassword">
              新しいパスワードをもう一度
              <input
                type="password"
                name="sameNewPassword"
                id="sameNewPassword"
              />
            </label>
          </div>
          <div>
            <button>パスワードを変更する</button>
          </div>
        </form>
        <button onClick={() => setPasswordChangeModalOpen(false)}>
          キャンセル
        </button>
      </div>
    </div>
  );
};
