interface SignUpProps {
  setLoginState(b: boolean): void
  setSignUpState(b: boolean): void
}

export const SignUp = ({setLoginState, setSignUpState}: SignUpProps) => {
  const clickBack = () => {
    setLoginState(true);
    setSignUpState(false);
  }
  const clickSignUp = () => {
    alert(`If you're Artist visit this site and submit your portfolio!!\nwww.naver.com`)
  }
    return <>
    <h1>SignUp Component</h1>
    <form>
      <input placeholder="email"/>
      <input type="password" placeholder="password"/>
      <input placeholder="nickname"/>
      <input placeholder="wallet address"/>
      <button onClick={clickSignUp}>SignUp</button>
    </form>
    <button onClick={clickBack}>Back</button>
    </>
  };
  