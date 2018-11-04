import React from 'react';
import { Row, Card, List, Tabs, Table, Button, Input } from 'antd';
import { downloadFile, get} from "../../Utils/fetch";
import { message } from "antd/lib/index";

const TabPane = Tabs.TabPane;
const Search = Input.Search;

class License extends React.PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        count30: 0,
        count60: 0,
        count90: 0,
        activeKey: "1",
        note: '自定义天数查询',
        date: 0
    };

    componentDidMount() {
        this.onTabsChange(1);
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

    init = () => {
        get('user/licensewatcher').then(res => {
            if(res.success) {
                this.setState({
                    count30: res.count30,
                    count60: res.count60,
                    count90: res.count90
                })
            } else {
                message.error(res.info);
            }
        })
    };

    onChange = (page) => {
        get('user/license?skip=' + (page - 1)).then((res) => {
            if(res.success) {
                this.setState({
                    data: res.data,
                    defaultCurrent: page,
                    isLoading: false
                });
            } else {
                message.error(res.info);
            }
        });
    };

    onTabsChange = (tab, date) => {
        let limit = 30;
        switch (tab) {
            case "1": limit = 30;break;
            case "2": limit = 60;break;
            case "3": limit = 90;break;
            case "4": limit = date;break;
            default: break;
        }
        this.setState({
            activeKey: tab,
            date
        });
        get('user/license?skip=' + (this.state.defaultCurrent - 1) + "&date=" + limit).then((res) => {
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

    render() {
        const data = [
            {
                title: '30天内到期',
                class: 'error'
            },
            {
                title: '60天内到期',
                class: 'warning'
            },
            {
                title: '90天内到期',
                class: 'caution'
            },
        ];

        const { isLoading, note } = this.state;
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
            title: '剩余天数',
            render: (text) =>  Math.floor((text.expirationDate-Math.floor(Date.now() / 1000)) / 24 / 3600)
        }];

        const operations = <Button
            size="small"
            onClick={() => {
                let date = this.state.activeKey === '1' ? 30 : this.state.activeKey === '2' ? 60 : this.state.activeKey === '3' ? 90 : this.state.date;
                let note = this.state.activeKey === '1' ? "30_days" : this.state.activeKey === '2' ? "60_days" : this.state.activeKey === '3' ? "90_days" : "customer";
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
                                        {key === 0 ? this.state.count30 : key === 1? this.state.count60 :this.state.count90}
                                    </a>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
                <Search
                    placeholder="自定义天数查询"
                    onSearch={value => {
                        if(value.length === 0) {
                            message.error("输入剩余日期再查询");
                        } else {
                            this.setState({
                                activeKey: '4',
                                note: value + '天内到期'
                            });
                            this.onTabsChange("4", value);
                        }
                    }}
                    type="number"
                    enterButton="查询"
                    size="large"
                    style={{marginBottom: '10px'}}
                />
                <Tabs
                    defaultActiveKey="1"
                    activeKey={this.state.activeKey + ''} // activekey excepetd String
                    onChange={this.onTabsChange}
                    tabBarExtraContent={operations}
                >
                    <TabPane tab={<span>30天内到期</span>} key="1">
                        <div/>
                    </TabPane>
                    <TabPane tab={<span>60天内到期</span>} key="2">
                        <div/>
                    </TabPane>
                    <TabPane tab={<span>90天内到期</span>} key="3">
                        <div/>
                    </TabPane>
                    <TabPane tab={<span>{note}</span>} key="4" disabled>
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

export default License;