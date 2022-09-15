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
    }
}

export default authApi;