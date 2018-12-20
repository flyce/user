import React from 'react';
import { Modal, Button, Upload, Icon, message, Table } from "antd/lib/index";
import { file, post } from "../../Utils/fetch";

const Dragger = Upload.Dragger;

class UploadModal extends React.PureComponent {
    state = {
        footer: [],
        dataTableVisible: false,
        data: null
    };

    handleDataTableVisible(flag) {
        this.setState({
            dataTableVisible: !!flag
        })
    }

    postAircraftData = () => {
        post('user/aircrafts', this.state.data).then(response => {
            if(response.success) {
                message.info(response.info);
            } else {
                message.warning(response.info);
            }
        });
    };

    render() {
        const { visible, handleUploadModalVisible, tableName } = this.props;
        const { dataTableVisible } = this.state;

        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration)
        }, {
            title: '机型',
            dataIndex: 'model',
            key: 'model',
        }, {
            title: '出厂序号',
            dataIndex: 'exportNumber',
            key: 'exportNumber',
        }, {
            title: '出厂日期',
            dataIndex: 'exportDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '选呼号码',
            dataIndex: 'selCall',
            key: 'selCall',
        }, {
            title: 'S模式编码',
            dataIndex: 'modeSCode',
            key: 'modeSCode',
        }, {
            title: '电台执照号',
            dataIndex: 'licenseNumber',
            key: 'licenseNumber',
        }, {
            title: '电台执有效期',
            dataIndex: 'licenseDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '国籍证号',
            dataIndex: 'citizenshipNumber',
            key: 'citizenshipNumber',
        }, {
            title: '国籍证颁发日期',
            dataIndex: 'citizenshipDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '适航证号',
            dataIndex: 'airworthinessNumber',
            key: 'airworthinessNumber',
        }, {
            title: '适航证颁发日期',
            dataIndex: 'airworthinessDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString())
        }, {
            title: '出口适航证号',
            dataIndex: 'exportAirworthinessNumber',
            key: 'exportAirworthinessNumber',
        }, {
            title: '出口噪音合格证号',
            dataIndex: 'exportNoiseNumber',
            key: 'exportNoiseNumber'
        }, {
            title: '发动机型号',
            dataIndex: 'engineModel',
            key: 'engineModel',
        }, {
            title: '发动机1序号',
            dataIndex: 'engine1',
            key: 'engine1',
        }, {
            title: '发动机2序号',
            dataIndex: 'engine2',
            key: 'engine2',
        }, {
            title: '发动机3序号',
            dataIndex: 'engine3',
            key: 'engine3',
        }, {
            title: '发动机4序号',
            dataIndex: 'engine4',
            key: 'engine4',
        }, {
            title: 'APU型号',
            dataIndex: 'apuModel',
            key: 'apuModel',
        }, {
            title: 'APU序号',
            dataIndex: 'apuSerialNumber',
            key: 'apuSerialNumber',
        }, {
            title: '客舱布局',
            dataIndex: 'cabinConfiguration',
            key: 'cabinConfiguration',
        }];

        const uploadData = {
            name: tableName,
            multiple: true,
            showUploadList: false,
            customRequest:  (info) => {
                const data = new FormData();
                data.append(tableName, info.file);
                file(data, tableName).then((response) => {
                    if(response.success) {
                        handleUploadModalVisible();
                        message.info("由于不同浏览器时间格式不一样的原因，如果上传的数据中时间不正确，请联系管理员处理:mail@flyce.cn", 10);
                        console.log(response.data);
                        this.setState({
                            data: response.data
                        });
                        this.handleDataTableVisible(true)
                    } else {
                        message.error(response.info);
                    }
                });
            }
        };

        return (
            <div>
                <Modal
                    visible={visible}
                    title="导入数据"
                    onCancel={() => {
                        handleUploadModalVisible();
                        this.setState({
                            footer: [],
                        });
                    }}
                    footer={this.state.footer}
                >
                    <div className={this.state.uploadForm}>
                        <div style={{display: "flex", justifyContent: "center", paddingBottom: "10px"}}>
                            <a href="https://store.flyce.cn/yuanweistudio/store/ELT.xlsx" target="_blank" rel="noopener noreferrer" download="ELT.xlsx">点击下载导入模版</a>
                        </div>
                        <Dragger
                            {...uploadData}
                        >
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
                            <p className="ant-upload-hint">请严格按照模版格式进行上传</p>
                        </Dragger>
                    </div>
                </Modal>
                <Modal
                    visible={dataTableVisible}
                    title="导入数据"
                    onOk={() => {
                        message.info("success");
                    }}
                    onCancel={() => {
                        this.handleDataTableVisible();
                    }}
                    footer={[
                        <Button key="back" onClick={() => this.handleDataTableVisible()}>取消</Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            this.postAircraftData();
                            this.handleDataTableVisible();
                        }}>
                            确认
                        </Button>,
                    ]}
                    width={"98%"}
                >
                    <Table
                        dataSource={this.state.data}
                        columns={columns}
                        rowKey={record => record.code}
                        size="small"
                    />
                </Modal>
            </div>
        );
    }
}

export default UploadModal;