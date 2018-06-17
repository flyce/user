import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Rule from './Rule';
import Info from './Info';
const { Content } = Layout;

const content = {
    rule: <Rule/>,
    info: <Info />
};

class Head extends Component {
    render() {
        return (
            <Layout>
                <Header path={this.props.match.params.path}/>
                <Content style={{ padding: '16px 24px 0px 24px', marginTop: 64 , minHeight: document.body.offsetHeight - 130}}>
                    <div style={{ background: '#fff', padding: 24}}>
                        {content[this.props.match.params.path]}
                    </div>
                </Content>
                <Footer />
            </Layout>
        );
    }
}

export default Head;