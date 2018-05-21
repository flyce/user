import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Card, Icon, Avatar, Input } from 'antd';
import './App.css';
import "./Components/Login/index.css"
import LoginModule from "./Components/Login/LoginModule";
import RegisterModule from "./Components/Login/RegisterModule";

const tabListNoTitle = [{
    key: 'login',
    tab: '登陆',
}, {
    key: 'register',
    tab: '注册',
}];

const contentListNoTitle = {
    login: <LoginModule/>,
    register: <RegisterModule />
};

class App extends Component {
    state = {
        key: 'login'
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div className={"login"}>
                <Card
                    style={{ minWidth: '350px' }}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentListNoTitle[this.state.key]}
                </Card>
            </div>
        );
    }
}

export default App;