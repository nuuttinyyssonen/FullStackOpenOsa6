import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    anecdoteService.getAll()
      .then(anecdote => dispatch(setAnecdotes(anecdote)))
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App