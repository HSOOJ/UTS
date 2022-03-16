interface FindIdProps {
  setLoginState(b: boolean): void
  setFindIdState(b: boolean): void
}

export const FindId = ({setLoginState, setFindIdState}: FindIdProps) => {
    const clickBack = () => {
      setLoginState(true)
      setFindIdState(false)
    }
    const clickFindId = () => {
      alert('SUCCESS FindId')
    }
    return <>
    <h1>FindId Component</h1>
    <form>
      <input placeholder="wallet address" />
      <button onClick={clickFindId}>FindId</button>
    </form>
    <button onClick={clickBack}>Back</button>
    </>
  };
  