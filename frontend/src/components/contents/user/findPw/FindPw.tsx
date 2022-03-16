interface FindPwProps {
    setLoginState(b: boolean): void
    setFindPwState(b: boolean): void
  }

export const FindPw = ({setLoginState, setFindPwState}: FindPwProps) => {
    const clickBack = () => {
        setLoginState(true)
        setFindPwState(false)
    }
    const clickFindPw = () => {
        alert('SUCCESS FindPw')
    }
    return <>
    <h1>FindPw Component</h1>
    <form>
        <input placeholder="wallet address" />
        <input placeholder="email" />
        <button onClick={clickFindPw}>FindPw</button>
    </form>
    <button onClick={clickBack}>Back</button>
    </>
  };
  