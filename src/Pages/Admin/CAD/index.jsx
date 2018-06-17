import React, { Component } from 'react';
import { Table } from 'antd';
import { get } from '../../../Utils/fetch';

const columns = [{
    title: '指令编号',
    dataIndex: 'cadNo',
    key: 'cadNo',
}, {
    title: '修正案号',
    dataIndex: 'cadAmendmentNo',
    key: 'cadAmendmentNo',
}, {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
}, {
    title: '颁发单位',
    dataIndex: 'issuedBy',
    key: 'issuedBy',
}, {
    title: '参考文件',
    dataIndex: 'referenceDocuments',
    key: 'referenceDocuments',
}, {
    title: '生效日期',
    dataIndex: 'effectiveDate',
    key: 'effectiveDate',
}, {
    title: '抓取时间',
    dataIndex: 'timestamp',
    key: 'timestamp',
}];

class Cad extends Component {
    state = {
        userData: []
    };

    componentDidMount() {
        get('admin/cad').then(userData => {
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

export default Cad;