import accountApi from "api/accountApi";
import adminApi from "api/adminApi";
import ToastHelper from "general/helpers/ToastHelper";

const {
    createAsyncThunk,
    createSlice,
    current
} = require("@reduxjs/toolkit");
const {
    default: imageApi
} = require("../../api/imageApi");


export const  thunkGetAllImage = createAsyncThunk('image/get-all', async (params) => {
    const res = await imageApi.getAllImage(params);
    return res;
});

export const thunkAdminDeleteImage = createAsyncThunk('admin/delete-image', async (params) => {
    const res = await adminApi.deleteImage(params);
    return res;
});

export const thunkAdminEditImage = createAsyncThunk('admin/edit-image', async (params) => {
    const res = await adminApi.editImge(params);
    return res;
});

// export const thunkDeleteImage = createAsyncThunk('image/delete', async (params) => {
//     const res = await accountApi.deleteImage(params);
// })

const dashboardSlice = createSlice({
    name: 'image',
    initialState: {
        isGettingImage: false,
        images: []
    },
    reducers: {},
    extraReducers: {
        [thunkGetAllImage.pending]: (state, action) => {
            state.isGettingImage = true;
        },
        [thunkGetAllImage.rejected]: (state, action) => {
            state.isGettingImage = false;
        },
        [thunkGetAllImage.fulfilled]: (state, action) => {
            const {
                result,
                images
            } = action.payload;
            if (result === 'success') {
                state.isGettingImage = false;
                state.images = images;
            }
        },

        [thunkAdminDeleteImage.pending]: (state, action) => {
            state.isGettingImage = true;
        },

        [thunkAdminDeleteImage.rejected]: (state, action) => {
            state.isGettingImage = false;
        },

        [thunkAdminDeleteImage.fulfilled]: (state, action) => {
            const imgId = action.meta.arg;
            const { result, message } = action.payload;
            if(result === 'success'){
                state.isGettingImage = false;
                state.images = state.images.filter(item => !(item._id === imgId));
                ToastHelper.showSuccess(message);
            }
        },


        [thunkAdminEditImage.pending]: (state, action) => {
            state.isGettingImage = true;
        },

        [thunkAdminEditImage.rejected]: (state, action) => {
            state.isGettingImage = false;
        },

        [thunkAdminEditImage.fulfilled]: (state, action) => {
            const imgId = action.meta.arg.imgId;
            const { result, image } = action.payload;
            if(result === 'success'){
                state.isGettingImage = false;
                for (let i = 0; i < state.images.length; i++) {
                    if(state.images[i]._id===imgId){
                        state.images[i] = image
                    }
                }
                ToastHelper.showSuccess('Thay đổi thông tin ảnh thành công');
            }
        },

        // [thunkDeleteImage.pending]: (state, action) => {
        //     state.isGettingImage = true;
        // },

        // [thunkDeleteImage.rejected]: (state, action) => {
        //     state.isGettingImage = false;
        // },

        // [thunkDeleteImage.fulfilled]: (state, action) => {
        //     const imgId = action.meta.arg;
        //     const { result, message } = action.payload;
        //     if(result === 'success'){
        //         state.isGettingImage = false;
        //         state.images = state.images.filter(item => item._id !== imgId);
        //         ToastHelper.showSuccess(message);
        //     }
        // },
      
    }
})

const {
    reducer,
    actions
  } = dashboardSlice;
//   export const {
//     updateCurrentAccountInfor
//   } = actions;
  export default reducer;