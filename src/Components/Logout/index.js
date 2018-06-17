import React from 'react';
import {removeItem} from "../../Utils/storage";

const Logout = () => {
    removeItem("token");
    removeItem("username");
    removeItem("_id");
    removeItem("loginTime");

    return (<div>
        登出成功，请重新登录！
    </div>)
};

export default Logout;