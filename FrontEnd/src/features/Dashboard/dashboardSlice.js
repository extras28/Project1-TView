const {
    createAsyncThunk,
    createSlice
} = require("@reduxjs/toolkit");
const {
    default: imageApi
} = require("../../api/imageApi");


export const  thunkGetAllImage = createAsyncThunk('image/get-all', async (params) => {
    const res = await imageApi.getAllImage(params);
    return res;
});

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
        }
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