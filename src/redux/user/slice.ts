import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { fetchUser } from './asyncActions'

const initialState = {
    user: {},
    reserve: {},
    status: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            console.log('Идет запрос');
            state.user = {};
            state.status = 'loading';
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log('Запрос прошел удачно');
            state.user = action.payload;
            state.reserve = action.payload;
            state.status = 'success';
        })

        builder.addCase(fetchUser.rejected, (state) => {
            console.log('Ошибка запроса')
            state.user = state.reserve;
            state.status = 'error';
        })
    }
})

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectStatus = (state: RootState) => state.userReducer.status;
export default userSlice.reducer