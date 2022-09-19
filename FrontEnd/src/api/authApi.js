const {
    default: axiosClient
} = require("./axiosClient");

const authApi = {
    //sign up
    signUp: (params) => {
        const url = 'auth/register';
        return axiosClient.post(url, params)
    },
    //sign in 
    signIn: (params) => {
        const url = 'auth/login';
        return axiosClient.post(url, params);
    },
    // sign out 
    signOut: (params) => {
        const url = 'auth/logout';
        return axiosClient.post(url, params);
    },
    //request to reset password
    requestToResetPassword: (params) => {
        const url = 'auth/request-reset-password';
        return axiosClient.post(url, params);
    },
    //reset password
    resetPassword: (params) => {
        const url = 'auth/reset-password';
        return axiosClient.post(url, params);
    }
}

export default authApi;