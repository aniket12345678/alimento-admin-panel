import secureLocalStorage from "react-secure-storage";

const adminAuthCheck = {
    getAuthUser: () => {
        const output = secureLocalStorage.getItem('loginStatus');
        return output && JSON.parse(output);
    }
}

export { adminAuthCheck }