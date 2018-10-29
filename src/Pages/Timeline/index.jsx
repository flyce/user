import React from 'react';
import { Timeline, Icon, Card } from 'antd';
import './style.css';

const Time = () => (
    <div className="time">
        <Card className="timeline">
            <Timeline mode="alternate" reverse="true" pending="继续开发中...">
                <Timeline.Item>之前的开发日志丢失了... 2018-5-21</Timeline.Item>
                <Timeline.Item>开发登录&注册页面 2018-5-21</Timeline.Item>
                <Timeline.Item color="green">修改登录布局 制作导航栏 2018-5-22</Timeline.Item>
                <Timeline.Item>实现用户登录和规则的管理 2018-6-10</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>注册框添加验证码 调整网页布局 添加EASA AD抓取功能 2018-6-24</Timeline.Item>
                <Timeline.Item color="red">管理员界面从用户界面分离 将不在用户端添加管理员路由 2018-6-25</Timeline.Item>
                <Timeline.Item color="red">解决无收件人报错的问题 修改配置文件时间、邮件标题、二维码大小等内容 2018-6-25</Timeline.Item>
                <Timeline.Item>修复规则大小写匹配的问题 2018-6-29 </Timeline.Item>
                <Timeline.Item>CAD AD分开订阅 2018-7-19 </Timeline.Item>
                <Timeline.Item color="green">加入邮件发送功能 加入上次登录时间统计 修复AD抓取时间不正常的问题 2018-7-21</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>修复登录时间无法统计的bug 2018-7-22</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>添加ELT文件上传功能 2018-7-27</Timeline.Item>
                <Timeline.Item>添加ELT编辑功能 添加航空器管理模块 添加ELT提醒功能 2018-7-31</Timeline.Item>
                <Timeline.Item>修复arj飞机cad抓取不到的问题 2018-8-10 </Timeline.Item>
                <Timeline.Item color="green">添加APU模块，修复AD规则显示不正常问题，添加AIRCRAFT管理 2018-8-22</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>添加电台执照监控功能 2018-8-30</Timeline.Item>
                <Timeline.Item color="red">完成文件导出功能 2018-9-1</Timeline.Item>
                <Timeline.Item>优化文件导出功能，修复edge下载文件无后缀的问题 2018-9-11</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>添加电台执照有效期监控功能 启用新Logo 2018-9-13</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>发布<strong>鸢尾适航管理辅助系统</strong> 2.0版本</Timeline.Item>
                <Timeline.Item>修正订阅发送时间规则 2018-9-15 </Timeline.Item>
                <Timeline.Item>修复航空器无法保存的BUG 2018-9-20</Timeline.Item>
                <Timeline.Item color="red">解决文件上传错误的问题 2018-9-29</Timeline.Item>
                <Timeline.Item color="red">修复网易邮箱无法接收邮件的问题 2018-10-19</Timeline.Item>
                <Timeline.Item>添加 信息公开下规范性文件 民航规章文件 抓取功能 2018-10-23</Timeline.Item>
                <Timeline.Item>Fix security vulnerabilities. 2018-10-25</Timeline.Item>
                <Timeline.Item>创建短信提醒功能 2018-10-25</Timeline.Item>
                <Timeline.Item>创建Timeline 2018-10-29</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>

            </Timeline>
        </Card>
    </div>
);

export default Time;