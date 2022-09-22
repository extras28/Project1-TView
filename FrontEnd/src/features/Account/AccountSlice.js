import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import imageApi from "api/imageApi";

export const thunkGetOwnImages = createAsyncThunk('image/get-own', async (params) => {
    const res = await imageApi.getAllPersonalImage(params);
    return res;
});


const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isGettingImages: false,
        myImages: [],
    },
    reducers: {},
    extraReducers: {
        [thunkGetOwnImages.pending]: (state, action) => {
            state.isGettingImages = true;
        },
        [thunkGetOwnImages.rejected]: (state, action) => {
            state.isGettingImages = false;
        },
        [thunkGetOwnImages.fulfilled]: (state, action) => {
            const {
                result,
                myImages
            } = action.payload;
            if (result === 'success') {
                state.isGettingImages = false
                state.myImages = myImages;
            }
        }
    },
});

const {
    reducer,
    actions
} = accountSlice;
export default reducer;