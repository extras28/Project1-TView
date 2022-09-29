import ToastHelper from 'general/helpers/ToastHelper';
import adminApi from '../api/adminApi';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thunkGetAllAccount = createAsyncThunk('admin/get-all-account', async (params) => {
    const res =  await adminApi.getAllAccount(params);
    return res;
});

export const thunkDeleteUser = createAsyncThunk('admin/delete-user', async (params) => {
    const res = await adminApi.deleteAccount(params);
    return res;
});

export const thunkGetAccountProfile = createAsyncThunk('admin/get-account-profile', async (params) => {
    const res = await adminApi.getAccountProfile(params);
    return res;
});

export const thunkEditAccount = createAsyncThunk('admin/edit-account', async (params) => {
    console.log(params);
    const res = await adminApi.editAccount(params);
    return res;
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        editingProfile: false,
        isGettingListAccount: false,
        listAccount: [],
        account: {},
    },
    reducers: {},
    extraReducers: {
        [thunkGetAllAccount.fulfilled]: (state, action) => {
            const {result, accounts} = action.payload;
            if(result === 'success'){
                state.isGettingListAccount = false
                state.listAccount = accounts;
            }
        },

        [thunkDeleteUser.fulfilled]: (state, action) => {
            const {result, message} = action.payload;
            const userId = action.meta.arg
            if(result === 'success'){
                state.listAccount = state.listAccount.filter(item => item._id !== userId);
                ToastHelper.showSuccess('Xóa tài khoản thành công')
            }
        },

        [thunkGetAccountProfile.fulfilled]: (state, action) => {
            const {result, account} = action.payload;
            if(result==='success'){
                state.account = account;
            }
        },

        [thunkEditAccount.pending]: (state, action) => {
            state.editingProfile = true
        },

        [thunkEditAccount.fulfilled]: (state, action) => {
            const {result, account} = action.payload;
            const userId = action.meta.arg.userId
            if(result === 'success'){
                state.editingProfile = false;
                state.account = account;
                for (let i = 0; i < state.listAccount.length; i++) {
                    if(state.listAccount[i]._id === userId){
                        state.listAccount[i]=account;
                    }
                }
            }
        }
    }
});

const {
    reducer,
    actions
} = adminSlice;
export default reducer;