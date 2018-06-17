import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import "./index.css";

const { Header} = Layout;

const Head = ({path}) => {
    return (
        <Header style={{ background: "#FFF", position: 'fixed', zIndex: 1, width: '100%' }}>
            <div>
                <a id="logo" href="/">
                    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                    <img alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg" />
                </a>
            </div>
            <Menu
                selectedKeys={[path]}
                mode="horizontal"
                style={{ lineHeight: '64px', float: "right"}}
            >
                <Menu.Item key="index">
                    <Link to="/" />首页
                </Menu.Item>
                <Menu.Item key="info">
                    <Link to='info'/>用户中心
                </Menu.Item>
                <Menu.Item key="rule">
                    <Link to={'rule'}/>规则管理
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/logout" />注销
                </Menu.Item>
            </Menu>
        </Header>
)};

export default Head;