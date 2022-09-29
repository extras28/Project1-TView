const { default: axiosClient } = require("./axiosClient");


const adminApi = {
    //get all account
    getAllAccount: (isAdmin) => {
        const url = `/admin/get-all-user/${isAdmin}`;
        return axiosClient.get(url);
    },

    //get accoutn profile
    getAccountProfile: (userId) => {
        const url = `/admin/get-account-profile/${userId}`;
        return axiosClient.get(url);
    },

    //delete account
    deleteAccount: (userId) => {
        const url = `/admin/delete-user/${userId}`;
        return axiosClient.delete(url);
    },

    //edit account
    editAccount: (params) => {
        const url = `/admin/edit-user/${params.userId}`;
        return axiosClient.put(url, params);
    },

    //delete image
    deleteImage: (imgId) => {
        const url = `/admin/delete-image/${imgId}`;
        return axiosClient.delete(url);
    },

    //edit image
    editImge: (imgId, params) => {
        const url = `/admin/edit-image/${imgId}`;
        return axiosClient.put(url, params);
    },
};

export default adminApi;
