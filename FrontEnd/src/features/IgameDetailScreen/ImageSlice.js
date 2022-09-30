import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import accountApi from "api/accountApi";
import imageApi from "api/imageApi";
import ToastHelper from "general/helpers/ToastHelper";

export const thunkGetImageDetail = createAsyncThunk('image/detail', async (imgId) => {
    const res = await imageApi.getImageDetail(imgId);
    return res;
});

export const thunkEditImage = createAsyncThunk('image/edit', async (params) => {
    const res = await accountApi.editImage(params);
    return res;
})


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
        },

        [thunkEditImage.pending]: (state, action) => {
                state.isGettingImage = true;
            },
    
            [thunkEditImage.rejected]: (state, action) => {
                state.isGettingImage = false;
            },
    
            [thunkEditImage.fulfilled]: (state, action) => {
                const imgId = action.meta.arg.imgId;
                const { result, image } = action.payload;
                if(result === 'success'){
                    state.isGettingImage = false;
                    state.image = image;
                    ToastHelper.showSuccess('Thay đổi thông tin ảnh thành công');
                }
            },
    }
})

const {
    reducer,
    actions
} = imageSlice;
export default reducer;