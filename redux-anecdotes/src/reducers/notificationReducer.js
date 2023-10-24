import { createSlice } from "@reduxjs/toolkit";

const notificationSlicer = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            console.log(action.payload)
            return action.payload
        },
        clearNotification(state, action) {
            return null;
        }
    }
})


export const { setNotification, clearNotification } = notificationSlicer.actions

export const notificationSetter = (content, time) => {
    return dispatch => {
        dispatch(setNotification(`You voted for ${content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time)
    }
}

export default notificationSlicer.reducer