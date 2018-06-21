import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { removeItem} from "../../Utils/storage";
import "./style.css";

import logo from '../../assets/logo.svg';


class Logout extends Component {

    componentDidMount() {
        removeItem("token");
        removeItem("username");
        removeItem("_id");
        removeItem("loginTime");
        removeItem("admin");
    }

    render() {
        return (
            <div className="logoutform">
                <div className="loginlogo">
                    <img alt="logo" src={logo} />
                    <span>Iris Studio</span>
                </div>
                <div
                    style={{display:"flex", justifyContent: "center"}}
                >
                    <span>已注销！</span>
                    <Link to={'/login'}>点击登录</Link>
                </div>
            </div>
        );
    }
}
export default Logout;