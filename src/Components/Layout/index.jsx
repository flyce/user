import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message, Menu } from 'antd';
import classNames from 'classnames';
import GlobalHeader from './GlobalHeader';
import GlobalFooter from './GlobalFooter';
import SiderMenu from './SiderMenu';
import logo from '../../assets/logo.svg';
import UserRule from "../UserRule";
import SubscribeManage from "../SubscribeManage";

const { Content, Header, Footer, Sider } = Layout;

class BasicLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            collapsed: false
        });
    }

    // 折叠导航栏
    onCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    componentDidMount() {
    }
    render() {
        let { collapsed } = this.state;
        return (
            <Layout>
                <SiderMenu
                    collapsed={collapsed}
                    onCollapse={this.onCollapse.bind(this)}
                    logo={logo}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            currentUser={'Echo'}
                            collapsed={collapsed}
                            onCollapse={this.onCollapse.bind(this)}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        {/*<UserRule/>*/}
                        <SubscribeManage />
                    </Content>
                    <Footer style={{ padding: 0 }}>
                        <GlobalFooter
                            // links={[
                            //     {
                            //         key: "Echo's Blog",
                            //         title: "Echo's Blog",
                            //         href: 'http://pro.ant.design',
                            //         blankTarget: true,
                            //     }
                            // ]}
                            copyright={
                                <Fragment>
                                    Copyright <Icon type="copyright" /> 2018 鸢尾工作室
                                </Fragment>
                            }
                        />
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;
