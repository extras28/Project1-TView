import { sha256 } from 'js-sha256';
import moment from 'moment';

// Util functions
const Utils = {
    // sha256
    sha256: (text) => {
        return sha256(text);
    },

    // Check object empty
    isObjectEmpty: (obj) => {
        return Utils.isObjectNull(obj) || (Object.keys(obj).length === 0 && obj.constructor === Object)
    },

    // Check object null|undefine
    isObjectNull: (obj) => {
        return obj === null || obj === undefined || obj === 'NULL' || obj === 'null'
    },

    // add date time
    formatAddDateTime: (sDateTime, amount, unit, sFormat, utc = false) => {
        if (utc) {
            return moment(sDateTime).utc().add(amount, unit).format(sFormat);
        }
        return moment(sDateTime).local().add(amount, unit).format(sFormat);
    },

    // Get full url
    getFullUrl: (url) => {
        if (url && !url.startsWith('http') && !url.startsWith('blob')) {
            return `${process.env.REACT_APP_BASE_URL}${url}`;
        }
        return url;
    },

    // format date time
    formatDateTime: (sDateTime, sFormat = 'DD/MM/YYYY HH:mm', utc = false) => {
        if (utc) {
            return moment(sDateTime).utc().format(sFormat);
        }
        return moment(sDateTime).local().format(sFormat);
    },
};

export default Utils;