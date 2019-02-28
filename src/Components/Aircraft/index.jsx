import React from 'react';

import { Card, Table, message, Icon, Form, Modal, Button, Input, DatePicker, Popconfirm } from 'antd';
import LoginVerify from '../LoginVerify';
import moment from 'moment';
import UploadModal from '../UploadModal';

import { downloadFile, get, post } from '../../Utils/fetch';

const FormItem = Form.Item;
const formItemLayout = {
    span: '8'
};

const CreateForm = Form.create()((props) => {
    const { modalVisible, form, handleModalVisible, value, handleUpdate, handleDelete, create, handleInit } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            fieldsValue.exportDate = Math.floor(new Date(fieldsValue.exportDate._d).getTime() / 1000);
            fieldsValue.licenseDate = Math.floor(new Date(fieldsValue.licenseDate._d).getTime() / 1000);
            fieldsValue.citizenshipDate = Math.floor(new Date(fieldsValue.citizenshipDate._d).getTime() / 1000);
            fieldsValue.airworthinessDate = Math.floor(new Date(fieldsValue.airworthinessDate._d).getTime() / 1000);
            console.log(fieldsValue);
            if (err) return;
            form.resetFields();
            if(create) {
                post('user/aircraft', fieldsValue).then(response => {
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

    const title = create ? "新增航空器" : "航空器信息修改";
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
                    label="注册号"
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
                    label="机型"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('model', {
                        rules: [{
                            required: true, message: '请输入机型',
                        }],
                        initialValue: value.model
                    })(
                        <Input placeholder="请输入机型"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出厂序号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('exportNumber', {
                        rules: [{
                            type: 'string', message: '请输入出厂序号',
                        }],
                        initialValue: value.exportNumber
                    })(
                        <Input placeholder="请输入出厂序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出厂日期"
                    className="item"
                >
                    {form.getFieldDecorator('exportDate', {
                        rules: [{
                            required: true, message: '请选择飞机出厂日期',
                        }],
                        initialValue: moment.unix(value.exportDate)
                    })(
                        <DatePicker placeholder="请选择飞机出厂日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="选呼号码"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('selCall', {
                        rules: [{
                            required: true,
                            type: 'string', message: '请输入选呼号码',
                        }],
                        initialValue: value.selCall
                    })(
                        <Input placeholder="请输入选呼号码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="S模式编码"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('modeSCode', {
                        rules: [{
                            type: 'string', message: '请输入S模式编码',
                        }],
                        initialValue: value.modeSCode
                    })(
                        <Input placeholder="请输入S模式编码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电台执照号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('licenseNumber', {
                        rules: [{
                            type: 'string', message: '请输入电台执照号',
                        }],
                        initialValue: value.licenseNumber,
                    })(
                        <Input placeholder="请输入电台执照号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电台执照有效期"
                    className="item offset"
                >
                    {form.getFieldDecorator('licenseDate', {
                        rules: [{
                            required: true, message: '请选择执照截止日期',
                        }],
                        initialValue: moment.unix(value.licenseDate)
                    })(
                        <DatePicker placeholder="请选择执照截止日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="国籍证号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('citizenshipNumber', {
                        rules: [{
                            type: 'string', message: '请输入国籍证号',
                        }],
                        initialValue: value.citizenshipNumber,
                    })(
                        <Input placeholder="请输入国籍证号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="国籍证颁发日期"
                    className="item"
                >
                    {form.getFieldDecorator('citizenshipDate', {
                        rules: [{
                            required: true, message: '请选择国籍证颁发日期',
                        }],
                        initialValue: moment.unix(value.citizenshipDate)
                    })(
                        <DatePicker placeholder="请选择国籍证颁发日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="适航证号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('airworthinessNumber', {
                        rules: [{
                            type: 'string', message: '请输入适航证号',
                        }],
                        initialValue: value.airworthinessNumber,
                    })(
                        <Input placeholder="请输入适航证号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="适航证颁发日期"
                    className="item offset"
                >
                    {form.getFieldDecorator('airworthinessDate', {
                        rules: [{
                            required: true, message: '请选择适航证颁发日期',
                        }],
                        initialValue: moment.unix(value.airworthinessDate)
                    })(
                        <DatePicker placeholder="请选择适航证颁发日期" style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出口适航证号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('exportAirworthinessNumber', {
                        rules: [{
                            type: 'string', message: '请输入出口适航证号',
                        }],
                        initialValue: value.exportAirworthinessNumber
                    })(
                        <Input placeholder="请输入出口适航证号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出口噪音合格证号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('exportNoiseNumber', {
                        rules: [{
                            type: 'string', message: '请输入出口噪音合格证号',
                        }],
                        initialValue: value.exportNoiseNumber
                    })(
                        <Input placeholder="请输入出口噪音合格证号"/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="发动机型号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('engineModel', {
                        rules: [{
                            required: true, type: 'string', message: '请输入发动机型号',
                        }],
                        initialValue: value.engineModel,
                    })(
                        <Input placeholder="请输入发动机型号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发动机1序号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('engine1', {
                        rules: [{
                            type: 'string', message: '请输入发动机1序号',
                        }],
                        initialValue: value.engine1,
                    })(
                        <Input placeholder="请输入发动机1序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发动机2序号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('engine2', {
                        rules: [{
                            type: 'string', message: '请输入发动机2序号',
                        }],
                        initialValue: value.engine2,
                    })(
                        <Input placeholder="请输入发动机2序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发动机3序号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('engine3', {
                        rules: [{
                            type: 'string', message: '请输入发动机3序号',
                        }],
                        initialValue: value.engine3,
                    })(
                        <Input placeholder="请输入发动机3序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="发动机4序号"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('engine4', {
                        rules: [{
                            type: 'string', message: '请输入发动机4序号',
                        }],
                        initialValue: value.engine4,
                    })(
                        <Input placeholder="请输入发动机4序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="APU型号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('apuModel', {
                        rules: [{
                            type: 'string', message: '请输入APU型号',
                        }],
                        initialValue: value.apuModel,
                    })(
                        <Input placeholder="请输入APU型号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="APU序号"
                    className="item offset"
                    hasFeedback
                >
                    {form.getFieldDecorator('apuSerialNumber', {
                        rules: [{
                            type: 'string', message: '请输入APU序号',
                        }],
                        initialValue: value.apuSerialNumber,
                    })(
                        <Input placeholder="请输入APU序号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="客舱布局"
                    className="item"
                    hasFeedback
                >
                    {form.getFieldDecorator('cabinConfiguration', {
                        rules: [{
                            type: 'string', message: '请输入客舱布局',
                        }],
                        initialValue: value.cabinConfiguration,
                    })(
                        <Input placeholder="请输入客舱布局"/>
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
        create: false,
        selectedRowKeys: [],
        value: {
            registration: '', model: '', selCall: '', exportNumber: '', exportDate: '',
            exportAirworthinessNumber: '', modeSCode: '', licenseNumber: '', licenseDate: '',
            exportNoiseNumber: '', citizenshipNumber: '', citizenshipDate: '',
            airworthinessNumber: '', airworthinessDate: '', engineModel: '',
            engine1: '', engine2: '', engine3: '', engine4: '', cabinConfiguration: ''
        },

        uploadVisible: false
    };

    init = () =>  {
        get('user/aircraft').then((res) => {
            if(res.success) {
                this.setState({
                    data: res.aircraft,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    componentDidMount() {
        this.init();
        get('user/count?db=aircraft').then(res => {
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
        get('user/aircraft?skip=' + (page - 1)).then((res) => {
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

    handleUploadModalVisible = (flag) => {
        this.setState({
            uploadVisible: !!flag,
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
                doc.model = value.model;
                doc.selCall = value.selCall;
                doc.exportNumber = value.exportNumber;
                doc.exportDate = value.exportDate;
                doc.exportAirworthinessCode = value.exportAirworthinessCode;
                doc.modeSCode = value.modeSCode;
                doc.licenseNumber = value.licenseNumber;
                doc.licenseDate = value.licenseDate;
                doc.exportNoiseNumber = value.exportNoiseNumber;
                doc.citizenshipNumber = value.citizenshipNumber;
                doc.citizenshipDate = value.citizenshipDate;
                doc.airworthinessNumber = value.airworthinessNumber;
                doc.airworthinessDate = value.airworthinessDate;
                doc.engineModel = value.engineModel;
                doc.engine1 = value.engine1;
                doc.engine2 = value.engine2;
                doc.engine3 = value.engine3;
                doc.engine4 = value.engine4;
                doc.apuModel = value.apuModel;
                doc.apuSerialNumber = value.apuSerialNumber;
                doc.cabinConfiguration = value.cabinConfiguration;
            }
            return 0;
        });
        post('user/aircraft/update', value).then((response) => {
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

    handleDelete = (_id) => {
        post('user/aircraft/delete', {_id}).then((response) => {
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
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration),
            sorter: (a, b) => a.registration - b.registration,
            defaultSortOrder: 'ascend'
        }, {
            title: '机型',
            dataIndex: 'model',
            key: 'model',
            filters: [{
                text: 'B737-600',
                value: 'B737-600',
            }, {
                text: 'B737-700',
                value: 'B737-700',
            }, {
                text: 'B737-800',
                value: 'B737-800',
            }, {
                text: 'B737-900',
                value: 'B737-900',
            }, {
                text: 'A320-319',
                value: 'A320-319',
            }, {
                text: 'A320-320',
                value: 'A320-320',
            }, {
                text: 'A320-321',
                value: 'A320-321',
            }],
            filterMultiple: true,
            onFilter: (value, record) => record.category.indexOf(value) === 0,
        }, {
            title: '交付日期',
            dataIndex: 'exportDate',
            sorter: (a, b) => a.exportDate - b.exportDate,
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '发动机型号',
            dataIndex: 'engineModel',
            key: 'engineModel',
        }, {
            title: 'APU型号',
            dataIndex: 'apuModel',
            key: 'apuModel',
        }, {
            title: '座舱布局',
            dataIndex: 'cabinConfiguration',
            key: 'cabinConfiguration',
        }, {
            title: "操作",
            render: (text, record) => (<Button onClick={
                () => {
                    this.handleManage(record);
                    this.setState({create: false});
                    this.handleModalVisible(true);
                }}
            >
                查看和编辑<Icon type="edit" /></Button>)

        }];

        const parentCreateMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
            handleUpdate: this.handleUpdate,
            handleDelete: this.handleDelete,
            handleInit: this.init
        };

        const parentUploadMethods = {
            handleUploadModalVisible: this.handleUploadModalVisible,
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
                            licenseDate: moment.unix(Date.now() / 1000000),
                            exportDate: moment.unix(Date.now() / 1000000),
                            citizenshipDate: moment.unix(Date.now() / 1000000),
                            airworthinessDate: moment.unix(Date.now() / 1000000)
                        });
                        this.setState({create: true});
                        this.handleModalVisible(true);
                    }}>新建</Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                           this.handleUploadModalVisible(true);
                        }}
                    >
                        导入
                    </Button>&nbsp;&nbsp;
                    <Button
                        onClick={() => {
                            downloadFile("user/export/aircraft", "Aircraft_list_" + new Date().toLocaleDateString());
                            message.info("导出中，请稍后！");
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
                <CreateForm {...parentCreateMethods} modalVisible={this.state.modalVisible} rowkey={record => record._id} value={this.state.value} create={this.state.create}/>
                <UploadModal {...parentUploadMethods} visible={this.state.uploadVisible} tableName="aircraft"/>
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
};

export default EltInfo;