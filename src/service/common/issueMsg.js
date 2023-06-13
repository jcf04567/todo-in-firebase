
// メッセージ出力関数

export const issueMsg = (errorMassage, code = null) => {
  if (!code) {
    alert(`${errorMassage}`);
  } else {
    alert(`${errorMassage} : ${ code }`);
  }
}


