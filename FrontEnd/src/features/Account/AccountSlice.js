import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import accountApi from "api/accountApi";
import imageApi from "api/imageApi";
import ToastHelper from "general/helpers/ToastHelper";

export const thunkGetOwnImages = createAsyncThunk('image/get-own', async (params) => {
    const res = await imageApi.getAllPersonalImage(params);
    return res;
});

export const thunkDeleteImage = createAsyncThunk('image/delete', async (params) => {
    const res = await accountApi.deleteImage(params);
    return res;
});

// export const thunkEditImage = createAsyncThunk('image/edit', async (params) => {
//     const res = await accountApi.editImage(params);
//     return res;
// })

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
        },

        [thunkDeleteImage.pending]: (state, action) => {
            state.isGettingImage = true;
        },

        [thunkDeleteImage.rejected]: (state, action) => {
            state.isGettingImage = false;
        },

        [thunkDeleteImage.fulfilled]: (state, action) => {
            const imgId = action.meta.arg;
            const { result, message } = action.payload;
            if(result === 'success'){
                state.isGettingImage = false;
                state.myImages = state.myImages.filter(item => item._id !== imgId);
                ToastHelper.showSuccess(message);
            }
        },

        // [thunkEditImage.pending]: (state, action) => {
        //     state.isGettingImage = true;
        // },

        // [thunkEditImage.rejected]: (state, action) => {
        //     state.isGettingImage = false;
        // },

        // [thunkEditImage.fulfilled]: (state, action) => {
        //     const imgId = action.meta.arg.imgId;
        //     const { result, image } = action.payload;
        //     if(result === 'success'){
        //         state.isGettingImage = false;
        //         for (let i = 0; i < state.myImages.length; i++) {
        //             if(state.myImages[i]._id===imgId){
        //                 state.myImages[i] = image
        //             }
        //         }
        //         ToastHelper.showSuccess('Thay đổi thông tin ảnh thành công');
        //     }
        // },
    },
});

const {
    reducer,
    actions
} = accountSlice;
export default reducer;