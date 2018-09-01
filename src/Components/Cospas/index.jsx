import React from 'react';
import { Card, Input, List, message } from 'antd';

import { eltDecoder } from "../../Utils/decoder";

import './style.css';

const Search = Input.Search;

class Cospas extends React.PureComponent {
    state = {
        decoder: [{
            key: 1,
            value: 1,
            binary: 1,
            position: 1
        }],
        decoderFlag: false
    };

    render () {
        return (
            <Card>
                <div style={{textAlign: "center"}}>
                    <h3>406 MHz Decode Program (Version 0.1)</h3>
                </div>
                <Search
                    placeholder="Enter Beacon ID 15 Hex.  请输入15位16进制代码"
                    onSearch={value => {
                        if(value.length !== 15) {
                            message.error("输入的16进制有误");
                            this.setState({
                                decoderFlag: false
                            });
                        } else {
                            console.log(eltDecoder(value));
                            this.setState({
                                decoder: eltDecoder(value),
                                decoderFlag: true
                            });
                        }
                    }}
                    enterButton="DeCode"
                    size="large"
                />
                {this.state.decoderFlag ? <div>
                    <div className="decoder decoderHeader">
                        <div style={{width: "25%"}}><h4>ITEM</h4></div>
                        <div style={{width: "20%"}}><h4>RESULT</h4></div>
                        <div style={{width: "10%"}}><h4>BITS</h4></div>
                        <div style={{width: "45%"}} className="binary"><h4>VALUE</h4></div>
                    </div>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={this.state.decoder}
                        renderItem={item => (
                            <List.Item>
                                <div className="decoder">
                                    <div style={{width: "25%"}}>{item.key}</div>
                                    <div style={{width: "20%"}}>{item.value}</div>
                                    <div style={{width: "10%"}}>{item.position}</div>
                                    <div style={{width: "45%"}} className="binary">{item.binary}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div> : null}
            </Card>
        );
    }
}

export default Cospas;