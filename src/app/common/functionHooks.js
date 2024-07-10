import secureLocalStorage from "react-secure-storage";
import { toast } from 'react-toastify';

function fetchAuthToken() {
    return {
        headers: {
            Authorization: secureLocalStorage.getItem('authToken')
        }
    }
}

function toastMessage(type, message) {
    toast[type](message)
}

export { fetchAuthToken, toastMessage }