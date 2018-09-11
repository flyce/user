import React from 'react';

import { Card, Table, message, Icon, Form, Modal, Button, Input, Select, DatePicker, Popconfirm } from 'antd';
import LoginVerify from '../LoginVerify';
import moment from 'moment';

import {get, post, downloadFile } from '../../Utils/fetch';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    span: '8'
};

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate, handleDelete } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            fieldsValue.effectiveDate = Math.floor(new Date(fieldsValue.effectiveDate._d).getTime() / 1000);
            console.log(fieldsValue);
            if (err) return;
            form.resetFields();
            handleUpdate({_id: value._id, ...fieldsValue});
            handleModalVisible();
        });
    };

    return (
        <Modal
            title="ELT信息修改"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width="80%"
            footer={[
                <Popconfirm title="确定删除?" onConfirm={() => {handleDelete({_id: value._id})}} okText="确定" cancelText="取消">
                    <Button key="reset" type="danger" ghost>
                        删除
                    </Button>
                </Popconfirm>,
                <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
                <Button key="ok" type="primary" onClick={okHandle}>
                    确定
                </Button>,
            ]}
        >
            <Form
                style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
            >
                <FormItem
                    {...formItemLayout}
                    label="航空器注册号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('registration', {
                        rules: [{
                            required: true, message: '请输入航空器注册号',
                        }],
                        initialValue: value.registration
                    })(
                        <Input placeholder="请输入航空器注册号" addonBefore="B-"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="ELT编码"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('code', {
                        rules: [{
                            required: true, message: '请输入ELT编码',
                        }],
                        initialValue: value.code
                    })(
                        <Input placeholder="请输入ELT编码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="制造商"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('manufacturer', {
                        rules: [{
                            type: 'string', message: '请输入制造商',
                        }],
                        initialValue: value.manufacturer
                    })(
                        <Input placeholder="请输入制造商"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设备型号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('equipment', {
                        rules: [{
                            type: 'string', message: '请输入设备型号',
                        }],
                        initialValue: value.equipment
                    })(
                        <Input placeholder="请输入设备型号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="序号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('seriesNumber', {
                        rules: [{
                            type: 'string', message: '请输入序号',
                        }],
                        initialValue: value.seriesNumber
                    })(
                        <Input placeholder="请输入序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="类型"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('type', {
                        rules: [
                            {required: true, message: '请选择ELT类型'},
                        ],
                        initialValue: value.type
                    })(
                        <Select placeholder="请选择ELT类型">
                            <Option value="固定">固定</Option>
                            <Option value="便携">便携</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="ELT编码协议"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('protocol', {
                        rules: [{
                            type: 'string', message: '请输入ELT编码协议',
                        }],
                        initialValue: value.protocol
                    })(
                        <Input placeholder="请输入ELT编码协议"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发射频率"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('frequency', {
                        rules: [{
                            type: 'string', message: '请输入发射频率',
                        }],
                        initialValue: value.frequency
                    })(
                        <Input placeholder="请输入发射频率" addonAfter="MHz"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电池有效期"
                    className="item offset"
                >
                    {form.getFieldDecorator('effectiveDate', {
                        rules: [{
                            required: true, message: '请选择电池有效期',
                        }],
                        initialValue: moment.unix(value.effectiveDate)
                    })(
                        <DatePicker placeholder="请选择电池有效期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发射类型"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('txType', {
                        rules: [{
                            type: 'string', message: '请输入发射类型',
                        }],
                        initialValue: value.txType
                    })(
                        <Input placeholder="请输入发射类型"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发射功率"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('power', {
                        rules: [{
                            type: 'string', message: '请输入发射功率',
                        }],
                        initialValue: value.power
                    })(
                        <Input placeholder="请输入发射功率"/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});

class EltInfo extends React.Component {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        modalVisible: false,
        selectedRowKeys: [],
        value: {
            code: "B38DDE0384403A1",
            effectiveDate: "0",
            equipment: "RESCU 406AFN2",
            frequency: "121.5 / 243 / 406.028",
            manufacturer: "Honeywell",
            power: "0.1/0.1/5",
            protocol: "航空器地址编码",
            registration: "1598",
            seriesNumber: "10001",
            txType: "3K20A3X / 16K0G1D",
            type: "固定",
            _id: "5b5ff4b8cf27fa0839d21510"
        }
    };

    init = () =>  {
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
    };


    componentDidMount() {
        this.init();
        get('user/count?db=elt').then(res => {
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
                    data: res.elt,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    handleModalVisible = (flag) => {
        this.setState({
            modalVisible: !!flag,
        });
    };

    handleManage = (value) => {
        this.setState({
            value
        });
    };

    handleUpdate = (value) => {
        let data = this.state.data;
        data.map((doc, key) => {
            if (doc._id === value._id) {
                doc.registration = value.registration;
                doc.code = value.code;
                doc.type = value.type;
                doc.protocol = value.protocol;
                doc.manufacturer = value.manufacturer;
                doc.effectiveDate = value.effectiveDate;
                doc.equipment = value.equipment;
                doc.seriesNumber = value.seriesNumber;
                doc.frequency = value.frequency;
                doc.power = value.power;
                doc.txType = value.txType;
            }
            return 0;
        });
        post('user/elt/update', value).then((response) => {
            console.log(response);
            if(response.success) {
                message.info(response.info);
            } else {
                message.error(response.info);
            }
        });
        this.setState({
            data
        });
    };

    handleDelete = (id) => {
        post('user/elt/delete', id).then((response) => {
            if(response.success) {
                message.info(response.info);
                this.handleModalVisible();
                this.init();
                this.setState({ selectedRowKeys: [] });
            } else {
                message.error(response.info);
            }
        });
    };

    onSelectChange = (selectedRowKeys) => {
        console.log(selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { isLoading, selectedRowKeys } = this.state;
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
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '设备型号',
            dataIndex: 'equipment',
            key: 'equipment',
        }, {
            title: '序列号',
            dataIndex: 'seriesNumber',
            key: 'seriesNumber',
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
            render: (text, record) => (<Button onClick={
                () => {
                    this.handleManage(record);
                    this.handleModalVisible(true);
                }}
                >
                <Icon type="edit" /></Button>)

        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate,
            handleDelete: this.handleDelete
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey value={this.state.value}/>
                <div style={{marginBottom: 10}}>
                    <Button
                        ghost
                        type="danger"
                        onClick={() => {
                            this.handleDelete(this.state.selectedRowKeys)
                        }}
                        disabled={!hasSelected}
                    >
                        删除
                    </Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            downloadFile("user/export/elt", "ELT_list_" + new Date().toLocaleDateString());
                        }}
                    >
                        导出
                    </Button>
                </div>
                <Table
                    width="500px"
                    scroll={{ x: 1500 }}
                    dataSource={this.state.data}
                    rowSelection={rowSelection}
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

export default EltInfo;