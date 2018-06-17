import React, { Component } from 'react';
import { Table } from 'antd';
import { get } from '../../../Utils/fetch';

const columns = [{
    title: '编号',
    dataIndex: 'number',
    key: 'number',
}, {
    title: '发行',
    dataIndex: 'issuedBy',
    key: 'issuedBy',
}, {
    title: '发行日期',
    dataIndex: 'issuedDate',
    key: 'tiissuedDatetle',
}, {
    title: '主题',
    dataIndex: 'subject',
    key: 'subject',
}, {
    title: '适用目标',
    dataIndex: 'approvalHolderTypeDesignation',
    key: 'approvalHolderTypeDesignation',
}, {
    title: '生效日期',
    dataIndex: 'effectiveDate',
    key: 'effectiveDate',
}, {
    title: '抓取时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
}];

class Ad extends Component {
    state = {
        userData: []
    };

    componentDidMount() {
        get('admin/ad').then(userData => {
            this.setState({
                userData
            })
        })
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.userData} />
        );
    }
}

export default Ad;