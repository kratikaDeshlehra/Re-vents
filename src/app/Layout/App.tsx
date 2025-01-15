import { Button } from "semantic-ui-react"


function App() {

  return (
    <>
      <h1>Welcome to revents</h1>
      <button className="ui icon red button">
        <i className="user icon"></i> CSS Button
      </button>
      <Button icon='smile' content='react button' color='green' loading={true}/>
    </>
  )
}

export default App
