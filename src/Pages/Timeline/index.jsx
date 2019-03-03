import React from 'react';
import { Timeline, Icon, Card } from 'antd';
import './style.css';

const Time = () => (
    <div className="time">
        <Card className="timeline">
            <Timeline mode="alternate" reverse="true" pending="继续开发中...">
                <Timeline.Item color="red" dot={<Icon type="close" style={{ fontSize: '16px'}} />}>之前的开发日志丢失了... 2018-5-21</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>开发登录&注册页面 2018-5-21</Timeline.Item>
                <Timeline.Item color="green">修改登录布局 制作导航栏 2018-5-22</Timeline.Item>
                <Timeline.Item>实现用户登录和规则的管理 2018-6-10</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>注册框添加验证码 调整网页布局 添加EASA AD抓取功能 2018-6-24</Timeline.Item>
                <Timeline.Item color="red" dot={<Icon type="api" style={{ fontSize: '16px' }} />}>管理员界面从用户界面分离 将不在用户端添加管理员路由 2018-6-25</Timeline.Item>
                <Timeline.Item color="green">解决无收件人报错的问题 修改配置文件时间、邮件标题、二维码大小等内容 2018-6-25</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>} color="red">发布<strong>CAD/AD订阅助手</strong> 1.0版本</Timeline.Item>
                <Timeline.Item color="green">修复规则大小写匹配的问题 2018-6-29 </Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>CAD AD分开订阅 2018-7-19 </Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>加入邮件发送功能 加入上次登录时间统计 修复AD抓取时间不正常的问题 2018-7-21</Timeline.Item>
                <Timeline.Item color="green">修复登录时间无法统计的bug 2018-7-22</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加ELT文件上传功能 2018-7-27</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加ELT编辑功能 添加航空器管理模块 添加ELT提醒功能 2018-7-31</Timeline.Item>
                <Timeline.Item color="green">修复arj飞机cad抓取不到的问题 2018-8-10 </Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加APU模块，修复AD规则显示不正常问题，添加AIRCRAFT管理 2018-8-22</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加电台执照监控功能 2018-8-30</Timeline.Item>
                <Timeline.Item dot={<Icon type="download" style={{ fontSize: '16px' }} />} color="green">完成文件导出功能 2018-9-1</Timeline.Item>
                <Timeline.Item color="green">优化文件导出功能，修复edge下载文件无后缀的问题 2018-9-11</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加电台执照有效期监控功能 启用新Logo 2018-9-13</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>} color="red">发布<strong>鸢尾适航管理辅助系统</strong> 2.0版本</Timeline.Item>
                <Timeline.Item color="green">修正订阅发送时间规则 2018-9-15 </Timeline.Item>
                <Timeline.Item color="green">修复航空器无法保存的BUG 2018-9-20</Timeline.Item>
                <Timeline.Item color="green">解决文件上传错误的问题 2018-9-29</Timeline.Item>
                <Timeline.Item color="green">修复网易邮箱无法接收邮件的问题 2018-10-19</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加 信息公开下规范性文件 民航规章文件 抓取功能 2018-10-23</Timeline.Item>
                <Timeline.Item color="green" dot={<Icon type="safety-certificate" style={{ fontSize: '16px' }} />}>Fix security vulnerabilities. 2018-10-25</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>创建短信提醒功能 2018-10-25</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>创建Timeline 2018-10-29</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>创建免责申明 创建ELT和无线电台执照自定义到期时间查询 2018-10-31</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加人员执照管理功能 导入导出还有问题需要解决 2018-11-4</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加人员授权管理功能 2018-11-18</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>添加适航指令查询功能 2018-11-20</Timeline.Item>
                <Timeline.Item color="red" dot={<Icon type="frown" style={{ fontSize: '16px' }} />}>前段时间电脑发生了故障，由于没push 我们丢失了一个月的进度 2019-1-10</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>修复CAD/局方文件仅可以查询部分字段的bug<br/>添加了不炫酷的动画（ps:我不会写炫酷的，所以是不炫酷的） 2019-1-11</Timeline.Item>
                <Timeline.Item color="green">修复bug<br/>优化搜索功能为多字段查询 2019-1-15</Timeline.Item>
                <Timeline.Item color="green">搜索功能优化 2019-1-27</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>优化页面 开发CAD导出功能 开发外来文件查询功能(后台部分) 增加多终端登陆功能 2019-2-14</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>优化人员执照管理 人员授权管理页面<br /> 开发外来文件查询功能(前端部分) 2019-2-16</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>优化外来文件管理页面布局<br /> 修复适航指令查询存在的bug<br />目前搜索不能回到第1页的bug尚未修复 2019-2-20</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>新增CAD查询页分页功能 2019-2-21</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>修复bug，优化cad搜索，ELT模块添加"编码方式"，注册页面添加手机号判断（限定为仅手机号可注册） 2019-2-28</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>编写提醒短信功能 2019-3-2</Timeline.Item>
                <Timeline.Item dot={<Icon type="edit" style={{ fontSize: '16px' }} />}>上线前测试，优化后台逻辑 2019-3-3</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }}/>} color="red">发布<strong>鸢尾适航管理辅助系统</strong> 2.5.0版本</Timeline.Item>
            </Timeline>
        </Card>
    </div>
);

export default Time;