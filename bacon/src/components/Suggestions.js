import React from 'react'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r.id} onClick={() => props.onClick(r.name)}>
      {r.name}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions;
