import React, { Component } from 'react';
import { Table } from 'antd';
import { get } from '../../../Utils/fetch';

const columns = [{
    title: '收件人',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '邮箱地址',
    dataIndex: 'mailAddress',
    key: 'mailAddress'
}, {
    title: '主题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
}, {
    title: '发送时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
}];

class MailLog extends Component {
    state = {
        userData: []
    };

    componentDidMount() {
        get('admin/maillog').then(userData => {
            this.setState({
                userData
            })
        })
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.userData} rowKey={record => record._id} />
        );
    }
}

export default MailLog;