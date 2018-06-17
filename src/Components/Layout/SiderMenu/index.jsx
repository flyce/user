import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const { Sider } = Layout;

class SiderMenu extends PureComponent {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        const { logo, collapsed, onCollapse } = this.props;
        return (
            <div>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    width={256}
                    className="sider"
                    onCollapse={onCollapse}
                >
                    <div className="logo" key="logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                            <h1>Ant Design Pro</h1>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">订阅管理</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">信息维护</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        );
    }
}

export default SiderMenu;