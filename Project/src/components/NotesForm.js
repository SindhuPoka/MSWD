import React from 'react'

const NotesForm = (props) => {
  return(
    <form onSubmit={props.addObject}>
    <div className='myInput'> Notes: <input value={props.newContent} onChange={props.handleNameChange}/> </div>
    <div> <button type="submit">Add</button> </div>
    </form>
  )
}

export default NotesForm