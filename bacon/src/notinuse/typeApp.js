import React, { Component } from 'react';

class App extends Component {
  state = {
    value: ''
  }

onChange = (event) => {
  console.log(event.target.value)
  this.setState({
    value: event.target.value
  })
}

  render () {
    return (
      <div>
      <input
        type='text'
        placeholder='type here'
      />
      </div>
    )
  }
}
export default App;
