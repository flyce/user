import React from 'react';

import { Card, Table, message, Icon } from 'antd';
import LoginVerify from '../LoginVerify';

import { get } from '../../Utils/fetch';

class EltInfo extends React.PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
    };

    componentDidMount() {
        get('user/elt').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.elt,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });

        get('user/count').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count
                });
            } else {
                message.error(res.info);
            }
        });
    }

    onChange = (page) => {
        get('user/elt?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.docs,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    render() {
        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration)
        }, {
            title: 'ELT编码',
            dataIndex: 'code',
            key: 'code',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: 'ELT协议',
            dataIndex: 'protocol',
            key: 'protocol',
        }, {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        }, {
            title: '有效期',
            dataIndex: 'effectiveDate',
            key: 'effectiveDate',
        }, {
            title: '设备型号',
            dataIndex: 'equipment',
            key: 'equipment',
        }, {
            title: '发射频率',
            dataIndex: 'frequency',
            key: 'frequency',
        }, {
            title: '发射功率',
            dataIndex: 'power',
            key: 'power',
        }, {
            title: '发射类型',
            dataIndex: 'txType',
            key: 'txType',
        }, {
            title: "操作",
            render: (text) => (<a href="#" className="ant-dropdown-link">
                <Icon type="edit" /></a>)
        }];

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <Table
                    dataSource={this.state.data}
                    loading={this.state.isLoading}
                    columns={columns}
                    rowKey={record => record._id}
                    pagination={{
                        defaultCurrent: this.state.defaultCurrent,
                        total: this.state.count,
                        onChange:this.onChange
                    }}
                    size="middle" />
            </Card>
        );
    }
};

export default EltInfo;