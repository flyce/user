import React from 'react';
import { Row, Card, List, Tabs, Table, Button, Input } from 'antd';
import { downloadFile, get} from "../../Utils/fetch";
import { message } from "antd/lib/index";

const TabPane = Tabs.TabPane;
const Search = Input.Search;

class Radio extends React.PureComponent {
    state = {
        isLoading: true,
        data: null,
        count: 0,
        defaultCurrent: 1,
        count15: 0,
        count30: 0,
        count60: 0,
        activeKey: "1",
        note: '自定义天数查询',
        date: 0
    };

    componentDidMount() {
        this.onTabsChange(1);
        this.init();
        // get('user/count?db=radio').then(res => {
        //     if(res.success) {
        //         this.setState({
        //             count: res.count
        //         });
        //     } else {
        //         message.error(res.info);
        //     }
        // });
    }

    init = () => {
        get('user/eltwatcher').then(res => {
            if(res.success) {
                this.setState({
                    count: res.count15,
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

    onTabsChange = (tab, date) => {
        let limit = 15;
        switch (tab) {
            case "1": limit = 15;break;
            case "2": limit = 30;break;
            case "3": limit = 60;break;
            case "4": limit = date;break;
            default: break;
        }
        this.setState({
            activeKey: tab,
            date
        });
        get('user/elt?skip=' + (this.state.defaultCurrent - 1) + "&date=" + limit).then((res) => {
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

        const { isLoading, note } = this.state;
        const columns = [{
            title: '注册号',
            key: 'registration',
            render: (text) => ("B-" + text.registration),
            onFilter: (value, record) => record.registration.indexOf(value) === 0,
            sorter: (a, b) => a.registration - b.registration,
        }, {
            title: 'ELT编码',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code - b.code,
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            filters: [{
                text: '便携式',
                value: '便携',
            }, {
                text: '固定式',
                value: '固定',
            }],
            filterMultiple: false,
            onFilter: (value, record) => record.type.indexOf(value) === 0,
        }, {
            title: '制造商',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        }, {
            title: '有效期',
            dataIndex: 'effectiveDate',
            render: (text) =>  (new Date(Number(text) * 1000).toLocaleDateString()),
            sorter: (a, b) => a.effectiveDate - b.effectiveDate,
        }, {
            title: '剩余天数',
            render: (text) =>  Math.floor((text.effectiveDate-Math.floor(Date.now() / 1000)) / 24 / 3600)
        }];

        const operations = <Button
            size="small"
            onClick={() => {
                console.log(this.state.activeKey);
                let { activeKey } = this.state;
                let activeKeyIndex = Number(activeKey);
                let date = activeKeyIndex === 1 ? 15 : activeKeyIndex === 2 ? 30 : activeKeyIndex === 3 ? 60 : this.state.date;
                let note = activeKeyIndex === 1 ? "15_days" : activeKeyIndex === 2 ? "30_days" : activeKeyIndex === 3 ? "60_days" : "customer";
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
                    <TabPane tab={<span>15天内到期</span>} key="1">
                        <div/>
                    </TabPane>
                    <TabPane tab={<span>30天内到期</span>} key="2">
                        <div/>
                    </TabPane>
                    <TabPane tab={<span>60天内到期</span>} key="3">
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

export default Radio;