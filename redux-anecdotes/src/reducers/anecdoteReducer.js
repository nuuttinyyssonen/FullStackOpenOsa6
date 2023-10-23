import { createSlice } from "@reduxjs/toolkit"

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
export default anecdoteSlice.reducer