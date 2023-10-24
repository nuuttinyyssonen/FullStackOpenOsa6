import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (content) => {
    return axios.post(baseUrl, content).then(res => res.data)
}

export const updatedAnecdote = (anecdote) => {
    return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
}