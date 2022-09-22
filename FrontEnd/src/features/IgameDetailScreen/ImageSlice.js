import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageApi from "api/imageApi";

export const thunkGetImageDetail = createAsyncThunk('image/detail', async (imgId) => {
    const res = await imageApi.getImageDetail(imgId);
    return res;
});
const imageSlice = createSlice({
    name: 'imageDetail',
    initialState: {
        isGettingImage: false,
        image: {}
    },
    reducers: {},
    extraReducers:{
        [thunkGetImageDetail.pending]: (state, action) => {
            state.isGettingImage = true;
        },
        [thunkGetImageDetail.rejected]: (state, action) => {
            state.isGettingImage = false;
        },
        [thunkGetImageDetail.fulfilled]: (state, action) => {
            state.isGettingImage = false;
            const { result, image } = action.payload;
            if(result === 'success'){
                state.image = image;
            }
        }
    }
})

const {
    reducer,
    actions
} = imageSlice;
export default reducer;