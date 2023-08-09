const UserInfo = ({ user }) => {
  return (
    <div>
      <p>現在ログインしているユーザーの情報</p>
      <p>email : {user.email}</p>
      <p>
        Provider :
        {user.providerData[0].providerId === "password"
          ? "email Login"
          : user.providerData[0].providerId === "google.com"
          ? "Google"
          : "invalid provider"}
      </p>
      <p>
        {!user.emailVerified &&
          "アドレス未認証のためTodoは入力できません。(メール認証が終了したら、リロードしてください。)"}
      </p>
    </div>
  );
};

export default UserInfo;
