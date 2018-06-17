import React, { Component } from 'react';
import { Table } from 'antd';
import { get } from '../../../Utils/fetch';

const columns = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
}, {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '公司',
    dataIndex: 'company',
    key: 'company',
}, {
    title: '职位',
    dataIndex: 'position',
    key: 'position',
}, {
    title: '邮件',
    dataIndex: 'mail',
    key: 'mail',
}, {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
}];

class User extends Component {
    state = {
        userData: []
    };

    componentDidMount() {
        get('admin/user').then(userData => {
            this.setState({
                userData
            })
        })
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.userData} rowKey={record => record._id}/>
        );
    }
}

export default User;