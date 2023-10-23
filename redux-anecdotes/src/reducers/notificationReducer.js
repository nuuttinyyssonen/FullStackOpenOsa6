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
export default notificationSlicer.reducer