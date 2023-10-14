import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter !== '') {
            const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.payload.content.includes(filter))
            return filteredAnecdotes
        } else {
            return anecdotes
        }
    })
    const dispatch = useDispatch()

    const sortedAnecdotes = anecdotes.sort((first, second) => second.payload.votes - first.payload.votes)

    return(
        <div>
            <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.payload.id}>
                <div>
                    {anecdote.payload.content}
                </div>
                <div>
                    has {anecdote.payload.votes}
                    <button onClick={() => dispatch(voteAnecdote(anecdote.payload.id))}>vote</button>
                </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default AnecdoteList