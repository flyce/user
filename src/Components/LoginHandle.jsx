import { getItem, removeItem } from "../Utils/storage";
import config from '../Config/env';

export function loginHandle() {
    if (window.location.pathname != '/') {
        const token = getItem("token");
        const loginTime = getItem("loginTime");
        if (token && loginTime) {
            if(Math.floor(Date.now()/1000) - loginTime > config.loginEffect) {
                removeItem("token");
                removeItem("username");
                removeItem("_id");
                removeItem("loginTime");
                window.location.href = '/login';
            }
        }
    }
}

function clearLoginInfo() {
    removeItem("token");
    removeItem("username");
    removeItem("_id");
    removeItem("loginTime");

}