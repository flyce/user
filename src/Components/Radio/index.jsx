import React from 'react';
import { Row, Card, List, Tabs, Table, Button } from 'antd';
import "./style.css";
import {downloadFile, get} from "../../Utils/fetch";
import { message } from "antd/lib/index";

const TabPane = Tabs.TabPane;

class Radio extends React.PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        count15: 0,
        count30: 0,
        count60: 0,
        activeKey: "1"
    };

    componentDidMount() {
        this.onTabsChange(1);
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

    init = () => {
        get('user/radiowatcher').then(res => {
            if(res.success) {
                this.setState({
                    count15: res.count15,
                    count30: res.count30,
                    count60: res.count60
                })
            } else {
                message.error(res.info);
            }
        })
    };

    onChange = (page) => {
        get('user/radio?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.radio,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    onTabsChange = (tab) => {
        let limit = 15;
        switch (tab) {
            case "1": limit = 15;break;
            case "2": limit = 30;break;
            case "3": limit = 60;break;
            default: break;
        }
        this.setState({
            activeKey: tab
        });
        get('user/radio?skip=' + (this.state.defaultCurrent - 1) + "&date=" + limit).then((res) => {
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

    render() {
        const data = [
            {
                title: '15天内到期',
                class: 'error'
            },
            {
                title: '30天内到期',
                class: 'warning'
            },
            {
                title: '60天内到期',
                class: 'caution'
            },
        ];

        const { isLoading } = this.state;
        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration),
            sorter: (a, b) => a.registration - b.registration,
        }, {
            title: '电台执照号',
            dataIndex: 'licenseNumber',
            key: 'licenseNumber',
            sorter: (a, b) => a.licenseNumber - b.licenseNumber
        }, {
            title: '选呼号',
            dataIndex: 'selCall',
            key: 'selCall'
        }, {
            title: 'S模式编码',
            dataIndex: 'modeSCode',
            key: 'modeSCode'
        }, {
            title: '有效期',
            dataIndex: 'licenseDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString()),
            sorter: (a, b) => a.licenseDate - b.licenseDate
        },{
            title: '剩余天数',
            render: (text) =>  Math.floor((text.licenseDate-Math.floor(Date.now() / 1000)) / 24 / 3600)
        }];

        const operations = <Button
                size="small"
                onClick={() => {
                    let date = this.state.activeKey === '1' ? 15 : this.state.activeKey === '2' ? 30 : 60;
                    let note = this.state.activeKey === '1' ? "15_days" : this.state.activeKey === '2' ? "30_days" : "60_days";
                    downloadFile("user/export/radio?date=" + date, "Radio_List_Expires_in_" + note + "_" + new Date().toLocaleDateString());
                    message.info("导出中，请稍后！");
                }}
            >
                导出
            </Button>;

        return (
           <Card>
               <Row className="info"><h2>到期预警</h2></Row>
               <List
                   grid={{ gutter: 24, column: 3 }}
                   dataSource={data}
                   renderItem={(item, key) => (
                       <List.Item>
                           <Card title={item.title}>
                               <div>
                                   <a onClick={(event) => {
                                       this.onTabsChange(event.target.id);
                                   }} className={item.class} id={key + 1}>
                                       {key === 0 ? this.state.count15 : key === 1? this.state.count30 :this.state.count60}
                                   </a>
                               </div>
                           </Card>
                       </List.Item>
                   )}
               />
               <Tabs
                   defaultActiveKey="1"
                   activeKey={this.state.activeKey + ''} // activekey excepetd String
                   onChange={this.onTabsChange}
                   tabBarExtraContent={operations}
               >
                   <TabPane tab={<span>15天内到期</span>} key="1">
                       <div/>
                   </TabPane>
                   <TabPane tab={<span>30天内到期</span>} key="2">
                       <div/>
                   </TabPane>
                   <TabPane tab={<span>60天内到期</span>} key="3">
                       <div/>
                   </TabPane>
               </Tabs>
               <div>
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
               </div>
           </Card>
       );
    }
}

export default Radio;