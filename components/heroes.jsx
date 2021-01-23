import React, { useState } from 'react'

export default () => {
  const [getState, setState] = useState('')

  // const updateState = (event) => {
  //   setState(event.target.value)
  // }

  return (
    <div className="page">
      <div className="title">Meet the Heroes</div>
      <div className="subtitle">A searchable list of all your favorite heroes</div>
      <input type="text" name="search" onChange={event => setState(event.target.value)} />
      <div className="slug">{getState}</div>

    </div>
  )
}
