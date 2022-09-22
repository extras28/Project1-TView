import axiosClient from "./axiosClient";

const imageApi = {
    // tai anh len
    uploadImage: (params) => {
        const url = '/user/upload-image';
        return axiosClient.post(url, params);
    },

    // lay tat ca anh
    getAllImage: () => {
        const url = '/get-all-image';
        return axiosClient.get(url);
    },

    // lay anh cua ca nhan
    getAllPersonalImage: (params) => {
        const url = '/user/get-my-images';
        return axiosClient.get(url, params);
    },

    // lay chi tiet mot anh
    getImageDetail: (imgId) => {
        console.log(imgId);
        const url = `/get-image-detail/${imgId}`;
        return axiosClient.get(url);
    }
};

export default imageApi;
