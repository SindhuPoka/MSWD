import React from 'react'
const Contact = (props) => {
    return(
      <div>
        {props.notes} <button onClick={props.deleteFun} notes={props.notes} id={props.id}>Delete</button>
      </div>
    )
}

const NotesList = (props) => {

  const contactsToShow = props.notebooks.filter(
    contact => contact.notes.toLowerCase().includes(props.filter.toLowerCase())
  )

  const mapper = (contact) => {
    return(
      <Contact key={contact.id} id={contact.id} notes={contact.notes}  deleteFun={props.deleteFun}></Contact>
    )
  }

  return(
    <div> {contactsToShow.map(mapper)} </div>
  )
}

export default NotesList