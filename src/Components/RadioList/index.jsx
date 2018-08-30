import React from 'react';

import { Card, Table, message } from 'antd';
import LoginVerify from '../LoginVerify';

import { get } from '../../Utils/fetch';

class RadioList extends React.Component {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1
    };

    init = () =>  {
        get('user/radio').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.radio,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    componentDidMount() {
        this.init();
        get('user/count?db=radio').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count
                });
            } else {
                message.error(res.info);
            }
        });
    }


    render() {
        const { isLoading } = this.state;
        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration)
        }, {
            title: '电台执照号',
            dataIndex: 'licenseNumber',
            key: 'licenseNumber',
        }, {
            title: '选呼号',
            dataIndex: 'selCall',
            key: 'selCall',
        }, {
            title: 'S模式编码',
            dataIndex: 'modeSCode',
            key: 'modeSCode',
        }, {
            title: '有效期',
            dataIndex: 'licenseDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }];

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <h3>本页面仅提供查看功能，如需修改，请到"航空器信息"模块操作。</h3>
                <Table
                    dataSource={this.state.data}
                    loading={isLoading}
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

export default RadioList;