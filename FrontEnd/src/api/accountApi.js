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
    }
};

export default accountApi;
