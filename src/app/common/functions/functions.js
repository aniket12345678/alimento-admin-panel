import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { toast } from 'react-toastify';

function fetchAuthToken(data) {
    return {
        headers: {
            Authorization: data
        }
    }
}

function toastMessage(type, message) {
    toast[type](message)
}



export { fetchAuthToken, toastMessage }