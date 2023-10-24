import { useSelector, useDispatch } from 'react-redux'
import { vote, voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationSetter } from '../reducers/notificationReducer'



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

    const handleVote = (id, content, votes) => {
        dispatch(notificationSetter(content, 5000))
        dispatch(vote(id))
        dispatch(voteAnecdote(id, content, votes))
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
                    <button onClick={() => handleVote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default AnecdoteList