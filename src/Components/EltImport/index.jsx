import React from 'react';
import { Upload, Icon, message, Card } from 'antd';
import {
    Form, Select, Button, Input, DatePicker, Tabs
} from 'antd';
import './style.css';
import { post, file } from "../../Utils/fetch";
const TabPane = Tabs.TabPane;

const FormItem = Form.Item;
const Option = Select.Option;

const Dragger = Upload.Dragger;


const BaseInfo = (props) => {
    const { form } = props;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        span: '8'
    };

    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            post('user/elt', {...fieldsValue}).then((response, err) => {
                if(!err) {
                    if(response.success) {
                        message.info(response.info);
                        form.resetFields();
                    } else {
                        message.error(response.info);
                    }
                }
            })
        });
    };

    const uploadData = {
        name: 'elt',
        multiple: true,
        customRequest(info) {
            console.log(info.file);
            const data = new FormData();
            data.append('elt', info.file);
            file(data).then((response) => {
                if(response.success) {
                    message.info(response.info);
                } else {
                    message.error(response.info);
                }
            });
        }
    };

    return (
        <Card>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="edit" />单条录入</span>} key="1">
                    <Form
                          style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "start"}}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="航空器注册号"
                            className="item"
                            hasFeedback
                        >
                            {getFieldDecorator('registration', {
                                rules: [{
                                    required: true, message: '请输入航空器注册号',
                                }],
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
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: true, message: '请输入ELT编码',
                                }],
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
                            {getFieldDecorator('manufacturer', {
                                rules: [{
                                    type: 'string', message: '请输入制造商',
                                }]
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
                            {getFieldDecorator('equipment', {
                                rules: [{
                                    type: 'string', message: '请输入设备型号',
                                }]
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
                            {getFieldDecorator('seriesNumber', {
                                rules: [{
                                    type: 'string', message: '请输入序号',
                                }]
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
                            {getFieldDecorator('type', {
                                rules: [
                                    {required: true, message: '请选择ELT类型'},
                                ],
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
                            {getFieldDecorator('protocol', {
                                rules: [{
                                    type: 'string', message: '请输入ELT编码协议',
                                }]
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
                            {getFieldDecorator('frequency', {
                                rules: [{
                                    type: 'string', message: '请输入发射频率',
                                }]
                            })(
                                <Input placeholder="请输入发射频率" addonAfter="MHz"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="电池有效期"
                            className="item offset"
                        >
                            {getFieldDecorator('effectiveDate', {
                                rules: [{
                                    required: true, message: '请输入航空器注册号',
                                }],
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
                            {getFieldDecorator('txType', {
                                rules: [{
                                    type: 'string', message: '请输入发射类型',
                                }]
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
                            {getFieldDecorator('power', {
                                rules: [{
                                    type: 'string', message: '请输入发射功率',
                                }]
                            })(
                                <Input placeholder="请输入发射功率"/>
                            )}
                        </FormItem>
                        <FormItem
                            className="item offset"
                        >
                        </FormItem>
                        <FormItem
                            className="item"
                        >
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            className="item offset"
                            hasFeedback
                        >
                            <Button type="primary" onClick={okHandle} htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane tab={<span><Icon type="file-excel" />从EXCEL导入</span>} key="2">
                    <Dragger
                        {...uploadData}
                        className="upload"
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
                        <p className="ant-upload-hint">请严格按照模版格式进行上传</p>
                    </Dragger>
                </TabPane>
            </Tabs>
        </Card>
    );
};


const Import = Form.create()(BaseInfo);

export default Import;