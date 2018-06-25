import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import UserTable from './User';
import CadTable from './CAD';
import AdTable from './AD';
import MailLog from './MailLog';
const { Header, Sider, Content, Footer } = Layout;

const content = {
    user: <UserTable/>,
    cad: <CadTable/>,
    ad: <AdTable/>,
    maillog: <MailLog/>,
};

const Lay = ({match}) => {
    return (<Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}

                style={{background: '#fff'}}
            >
                <div className="logo">
                    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={[match.params.path]}>
                    <Menu.Item key="user">
                        <Link to="user"/>
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="cad">
                        <Link to="cad"/>
                        <Icon type="file-excel" />
                        <span>CAD 查看</span>
                    </Menu.Item>
                    <Menu.Item key="ad">
                        <Link to="ad"/>
                        <Icon type="file-ppt" />
                        <span>AD 查看</span>
                    </Menu.Item>
                    <Menu.Item key="maillog">
                        <Link to="maillog"/>
                        <Icon type="profile" />
                        <span>邮件日志</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 , height: '56px'}}>
                    <Icon
                        className="trigger"
                        type={'user'}
                    />
                </Header>
                <Content style={{ margin: '16px 16px 0 16px', padding: 24, background: '#fff', minHeight: 610 }}>
                    {content[match.params.path]}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Lay;