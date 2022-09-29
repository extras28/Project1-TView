import axiosClient from './axiosClient';
const accountApi = {

    //get profile
    getProfile: () => {
        const url = '/user/profile';
        return axiosClient.get(url);
    },

    //edit profile
    editProfile: (params) => {
        const url = '/user/edit-profile';
        return axiosClient.post(url, params);
    },

    //change password
    changePassword: (params) => {
        const url = '/auth/change-password';
        return axiosClient.put(url, params);
    },
    
    //edit image
    editImage: (imgId, params) => {
        const url = `/image/edit/${imgId}`;
        return axiosClient.put(url, params);
    },

    //delete image
    deleteImage: (imgId) => {
        const url = `/image/delete/${imgId}`;
        return axiosClient.delete(url);
    }
};

export default accountApi;
