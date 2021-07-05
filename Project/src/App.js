import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'
import NotesForm from './components/NotesForm'
import noteService from './services/notes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import NotesList from './components/NotesList'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"
const Home = () => (
  <div >
    <h1>This is Home page</h1>
  </div>
)

const Note = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === Number(id))
  return (
    <div>
      <h2>{note.notes}</h2>
    </div>
  )
}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.notes}</Link>
        </li>
      )}
    </ul>
  </div>
)
const Users1 = ()=>{
  return (
  <div>
  <h2>For any Queries/doubts you can contact us</h2>
<h3>Contact us </h3>
  <form>
    <table>
    <div>
      Name: <input />
    </div>
    <br></br>
    <div>
      Email: <input/>
    </div>
    <br></br>
    <div>
      Subject: <textarea  rows="3" cols="50"/>
    </div><br></br>
    <button type="submit">Submit</button>
    </table>
  </form>
  </div>
  )}


const Users = () => {
  return (
    <div>
      {/* <center>
      <h2>For any Queries/doubts you can contact us</h2>
<h3>Contact us </h3>
      <form>
        <table>
        <div>
          Name: <input />
        </div>
        <br></br>
        <div>
          Email: <input/>
        </div>
        <br></br>
        <div>
          Subject: <input/>
        </div><br></br>
        <button type="submit">Submit</button>
        </table>
      </form>
      </center> */}
      </div>
  )
}

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('You are')
    history.push('/')
  }

  return (
    <div>
     
      <h3>Login</h3>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>&nbsp;
        <div>
          password: <input type='password' />
        </div><br></br>
        <button type="submit">login</button>
      </form>
      
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      notes: 'HTML is easy',
    },
    {
      id: 2,
      notes: 'Browser can execute only Javascript',

    },
    {
      id: 3,
      notes: 'Most important methods of HTTP-protocol are GET and POST',
     
    }
  ])
  const [notebooks, setNotebooks] = useState([])
  const [newContent, setnewContent] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const handleNameChange = (event) => { setnewContent(event.target.value) }

  const hook = () => { noteService.getAll().then(response => setNotebooks(response.data)) }
  useEffect(hook, [])
  const messageDisplayTime = 3000 
  const standardError = {type: 'errorNotification', message: 'Operation failed. Refresh your browser.'}
  const deleteNotificationFunction = (notes) => {
    setNotification({type: 'deleteNotification', message: `Deleted  from Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const updateNotificationFunction = (notes) => {
    setNotification({type: 'updateNotification', message: `Updated ${notes} in Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const addNotificationFunction = (notes) => {
    setNotification({type: 'addNotification', message: `Added ${notes} to Notebook!`})
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }

  const errorNotificationFunction = () => {
    setNotification(standardError)
    setTimeout(() => {setNotification(null)}, messageDisplayTime)
  }
  const deleteContact = (event) => {
    const button = event.target
    const confirm = window.confirm(`Are You Sure to Delete?`);
    if (confirm) {
      noteService.destroy(button.id).then(hook)
      .then(() => {deleteNotificationFunction(button.notes)})
      .catch(error => {errorNotificationFunction()})
    }
  }
  
const addContact = (event) => {

  event.preventDefault()
  const contactObject = { notes: newContent}
  const sameNotes = notebooks.filter(contact => contact.notes === newContent)
  if (sameNotes.length > 0) {
    const msg = `Contact ${newContent} is already in the Notebook. Do you want to replace the old Notes?`
    const confirm = window.confirm(msg)
    if (confirm) {
      noteService.update(sameNotes[0].id, contactObject).then(hook)
      .then(() => {updateNotificationFunction(newContent)}).catch(error => {errorNotificationFunction()})
    }
  } else {
    noteService.create(contactObject).then(
      response => {setNotebooks(notebooks.concat(response.data))}
    ).then(() => {addNotificationFunction(newContent)})
    .catch(error => {errorNotificationFunction()})
  }

  setnewContent('')
}


  const [user, setUser] = useState(null) 

  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Router>
      
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/notes">Notes</Link>
        <Link style={padding} to="/users">ContactUs</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">Login</Link>
        }
      </div>
      

      <Switch>
        <Route path="/notes/:id">
          <Note notes={notes} />
        </Route>
        <Route path="/notes">
        {user ? <Users/> : <Redirect to="/login" />}
        <h2>Notebook</h2> 
          <Notification notification={notification}></Notification>
          <Filter value={newFilter} onChange={handleFilterChange}></Filter>
          <h2>Add new</h2>
      <NotesForm
        addObject={addContact} newContent={newContent} handleNameChange={handleNameChange}
        >
      </NotesForm>
      <h2>Notes</h2>
      <NotesList notebooks={notebooks} filter={newFilter} deleteFun={deleteContact}></NotesList>
          {/* <Notes notes={notes} /> */}
        </Route>
        <Route path="/users">
          {/* {user ? <Users /> : <Redirect to="/login" />} */}
          <Users1 />
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>      
      <div>
        <br />
        <em>NoteBook App, Department of Computer Science 2021</em>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
export default App