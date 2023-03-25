import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

interface FetchUserParams {
    url: string;
    userName: string;
}

export const fetchUser = createAsyncThunk('user / fetchUserStatus', async (params: FetchUserParams) => {
    const { url, userName } = params;
    const { data } = await axios.get(`${url}${userName}`)
    return data;
});