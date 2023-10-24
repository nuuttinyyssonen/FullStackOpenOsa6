import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updatedAnecdote } from './Service'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const updatedAnecdoteMutation = useMutation(updatedAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    dispatch({ type: 'DISPLAY', payload: `You voted for ${anecdote.content}` })
    setTimeout(() => { 
      dispatch({ type: 'CLEAR' })
    }, 5000)
    updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const anecdotes = result.data
  
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
