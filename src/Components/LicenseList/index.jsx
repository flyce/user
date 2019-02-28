import React from 'react';

import { Card, Table, message, Icon, Form, Modal, Button, Input, DatePicker, Popconfirm, Select } from 'antd';
import LoginVerify from '../LoginVerify';
import moment from 'moment';

import { get, post } from '../../Utils/fetch';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    span: '8'
};

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate, handleDelete, create, handleInit } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            fieldsValue.lastIssuedDate = Math.floor(new Date(fieldsValue.lastIssuedDate._d).getTime() / 1000);
            fieldsValue.expirationDate = Math.floor(new Date(fieldsValue.expirationDate._d).getTime() / 1000);
            if (err) return;
            form.resetFields();
            if(create) {
                console.log(fieldsValue);
                post('user/license', fieldsValue).then(response => {
                    if(response.success) {
                        message.info(response.info);
                        handleInit();
                    } else {
                        message.warning(response.info);
                    }
                });
            } else {
                handleUpdate({_id: value._id, ...fieldsValue});
            }
            handleModalVisible();
        });
    };

    const title = create ? "新增人员信息" : "人员信息修改";
    const footer = create ? [
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ] : [
        <Popconfirm key={value._id} title="确定删除?" onConfirm={() => {handleDelete(value._id)}} okText="确定" cancelText="取消">
            <Button key="reset" type="danger" ghost>
                删除
            </Button>
        </Popconfirm>,
        <Button key="cancel" onClick={() => handleModalVisible()}>取消</Button>,
        <Button key="ok" type="primary" onClick={okHandle}>
            确定
        </Button>,
    ];

    return (
        <Modal
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible()}
            width="80%"
            style={{ top: 20 }}
            footer={footer}
        >
            <Form
                style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
            >
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入姓名',
                        }],
                        initialValue: value.name
                    })(
                        <Input placeholder="请输入姓名"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="中心/科室"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('center', {
                        rules: [{
                            required: true, message: '请输入中心/科室',
                        }],
                        initialValue: value.center
                    })(
                        <Input placeholder="请输入中心/科室"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="部门"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('department', {
                        rules: [{
                            required: true, message: '请输入部门',
                        }],
                        initialValue: value.department
                    })(
                        <Input placeholder="请输入部门"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="执照类型"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('licenseType', {
                        rules: [{
                            required: true, type: 'string', message: '请输入执照类型',
                        }],
                        initialValue: value.licenseType
                    })(
                        <Select
                            showSearch
                            placeholder="请输入执照签署"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="AV">AV</Option>
                            <Option value="ME-TA">ME-TA</Option>
                            <Option value="ME-PA">ME-PA</Option>
                            <Option value="ME-TH">ME-TH</Option>
                            <Option value="ME-PH">ME-PH</Option>
                            <Option value="STR">STR</Option>
                            <Option value="PWT">PWT</Option>
                            <Option value="LGR">LGR</Option>
                            <Option value="MEC">MEC</Option>
                            <Option value="AVC">AVC</Option>
                            <Option value="ELC">ELC</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="最新一次颁发/续签日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('lastIssuedDate', {
                        rules: [{
                            required: true, message: '请选择最新一次颁发/续签日期',
                        }],
                        initialValue: moment.unix(value.lastIssuedDate)
                    })(
                        <DatePicker placeholder="请选择最新一次颁发/续签日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="执照到期日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('expirationDate', {
                        rules: [{
                            required: true, message: '请选择执照到期日期',
                        }],
                        initialValue: moment.unix(value.expirationDate)
                    })(
                        <DatePicker placeholder="请选择执照到期日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="执照签署"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('sign', {
                        rules: [{
                            required: true,
                            type: 'string', message: '请输入执照签署',
                        }],
                        initialValue: value.sign
                    })(
                        <Input placeholder="请输入执照签署"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('note', {
                        rules: [{
                            type: 'string', message: '请输入备注',
                        }],
                        initialValue: value.note,
                    })(
                        <Input placeholder="请输入备注"/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
});

class LicenseList extends React.Component {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        modalVisible: false,
        create: false,
        selectedRowKeys: [],
        value: {
            name: '', center: '', licenseType: '', lastIssuedDate: '', expirationDate: '',
            sign: '', note: ''
        }
    };

    init = () =>  {
        get('user/license').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.data,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    componentDidMount() {
        this.init();
        get('user/count?db=license').then(res => {
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
        get('user/license?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.aircraft,
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
        console.log(value);
        this.setState({
            value
        });
    };

    handleUpdate = (value) => {
        let data = this.state.data;
        data.map((doc, key) => {
            if (doc._id === value._id) {
                doc.name = value.name;
                doc.center = value.center;
                doc.licenseType = value.licenseType;
                doc.lastIssuedDate = value.lastIssuedDate;
                doc.expirationDate = value.expirationDate;
                doc.B737NG = value.B737NG;
                doc.B737MAX = value.B737MAX;
                doc.note = value.note;
                doc.department = value.department
            }
            return 0;
        });
        post('user/license/update', value).then((response) => {
            console.log(response);
            if(response.success) {
                message.info(response.info);
                this.init();
            } else {
                message.error(response.info);
            }
        });
        this.setState({
            data
        });
    };

    handleDelete = (_id) => {
        post('user/license/delete', {_id}).then((response) => {
            if(response.success) {
                message.info(response.info);
                this.handleModalVisible();
                this.setState({selectedRowKeys: 0});
                this.init();
            } else {
                message.error(response.info);
            }
        });
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };


    render() {
        const columns = [{
            title: '姓名',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => a.name > b.name,
            defaultSortOrder: 'ascend'
        }, {
            title: '中心',
            dataIndex: 'center',
            key: 'center',
        }, {
            title: '执照类型',
            dataIndex: 'licenseType',
            key: 'licenseType',
            sorter: (a, b) => a.licenseType - b.licenseType,
        }, {
            title: '最新一次颁发/续签日期',
            dataIndex: 'lastIssuedDate',
            key: 'lastIssuedDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '执照到期日期',
            dataIndex: 'expirationDate',
            key: 'expirationDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '签署',
            dataIndex: 'sign',
            key: 'sign',
        }, {
            title: '备注',
            dataIndex: 'note',
            key: 'note',
        }, {
            title: "操作",
            render: (text, record) => (<Button onClick={
                () => {
                    this.handleManage(record);
                    this.setState({create: false});
                    this.handleModalVisible(true);
                }}
            >
                编辑<Icon type="edit" /></Button>)

        }];

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate,
            handleDelete: this.handleDelete,
            handleInit: this.init
        };

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <Card bordered={false}>
                <LoginVerify/>
                <div style={{marginBottom: 10}}>
                    <Button onClick={() => {
                        this.handleManage({
                            registration: "",
                            model: "",
                            selCall: "",
                            modeSCode: "",
                            lastIssuedDate: moment.unix(Date.now() / 1000000),
                            expirationDate: moment.unix(Date.now() / 1000000),
                        });
                        this.setState({create: true});
                        this.handleModalVisible(true);
                    }}>新建</Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            message.info("管理员限制，此版本不可用🚫");
                        }}
                    >
                        导入
                    </Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            // downloadFile("user/export/aircraft", "Aircraft_list_" + new Date().toLocaleDateString());
                            message.info("管理员限制，此版本不可用🚫");
                        }}
                    >
                        导出
                    </Button>&nbsp;&nbsp;
                    <Button
                        ghost
                        type="danger"
                        onClick={() => {
                            this.handleDelete(this.state.selectedRowKeys)
                        }}
                        disabled={!hasSelected}
                    >
                        删除
                    </Button>
                </div>
                <CreateForm {...parentMethods} modalVisible={this.state.modalVisible} rowkey={record => record._id} value={this.state.value} create={this.state.create}/>
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
                    rowSelection={rowSelection}
                    size="middle" />
            </Card>
        );
    }
}

export default LicenseList;