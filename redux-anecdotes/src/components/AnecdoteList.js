import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter !== '') {
            const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
            return filteredAnecdotes
        } else {
            return anecdotes
        }
    })
    const dispatch = useDispatch()

    const sortedAnecdotes = [...anecdotes].sort((first, second) => second.votes - first.votes)

    const handleVote = (id, content) => {
        dispatch(setNotification(`You voted for ${content}`))
        dispatch(vote(id))
        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    }

    console.log(sortedAnecdotes)

    return(
        <div>
            <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default AnecdoteList