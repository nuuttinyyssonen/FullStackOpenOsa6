import { createAnecdote } from "../Service"
import { useMutation, useQueryClient } from "react-query"
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = async (event) => {
    try {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      const data = await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
      dispatch({ type: 'DISPLAY', payload: `You added ${content}` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    } catch(error) {
      dispatch({ type: 'DISPLAY', payload: "too short anecdote, must have length 5 or more" })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
