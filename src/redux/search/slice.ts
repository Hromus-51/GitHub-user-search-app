import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

const initialState = {
    searchValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    },
})

export const { setSearchValue } = searchSlice.actions
export const selectSearchValue = (state: RootState) => state.searchReducer.searchValue;
export default searchSlice.reducer