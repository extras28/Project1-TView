import { removeAxiosAccessToken } from "../../api/axiosClient";
// import store from "../../app/store";
import PreferenceKeys from "../constants/PreferenceKeys";
import moment from 'moment';
import { element } from "prop-types";

const UserHelper = {
    // Get random avatar url
    getRandomAvatarUrl: () => {
        return 'https://blenderartists.org/uploads/default/original/4X/6/a/d/6adcaac6f7378fbf998f5ea0490724cea82eb01f.jpeg';
    },

    // Check access token valid
    checkAccessTokenValid: () => {
        const accessToken = localStorage.getItem(PreferenceKeys.accessToken);
        const accessTokenExpired = localStorage.getItem(PreferenceKeys.accessTokenExpired);

        if (accessToken && accessTokenExpired) {
            const momentExpired = moment.utc(accessTokenExpired);
            const momentNow = moment.utc();
            return momentExpired.isAfter(momentNow);
        }

        return false;
    },

    // Get display name
    getDisplayName: (account) => {
        if (account) {
            return account.fullname ?? account.email ?? 'Unknown';
        }
        return '';
    },

    // Get avatar
    getAvatar: (account) => {
        if (account) {
            return account.avatar ?? UserHelper.getRandomAvatarUrl();
        }
        return UserHelper.getRandomAvatarUrl();
    },

    // Sign out
    signOut: () => {
        localStorage.removeItem(PreferenceKeys.accessToken);
        localStorage.removeItem(PreferenceKeys.accessTokenExpired);
        removeAxiosAccessToken();
    },
};

export default UserHelper;