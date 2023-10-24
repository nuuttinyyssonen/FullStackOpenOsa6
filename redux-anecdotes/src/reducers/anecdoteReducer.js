import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const createAnecdote = (content) => {
  return async dispatch => {
    const newRecord = await anecdoteService.addAnecdote(content)
    dispatch(newAnecdote(newRecord))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id, content, votes) => {
  return async dispatch => {
    const object = { content: content, votes: votes + 1 }
    const anecdoteToUpdate = await anecdoteService.updateAnecdote(id, object)
    dispatch(vote(anecdoteToUpdate))
  }
}


export default anecdoteSlice.reducer