const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = (id)  => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

const initialState = anecdotesAtStart.map(asObject)


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, {payload: action.payload}]
    case 'VOTE':
      const id = action.payload.id
      const anecdoteToVote = state.find(n => n.payload.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        payload: {
          ...anecdoteToVote.payload,
          votes: anecdoteToVote.payload.votes + 1
        }
      }
      return state.map(anecdote => 
        anecdote.payload.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
  }
}

export default reducer