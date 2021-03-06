import React from 'react';
import classNames from 'classnames';
// import { Popover, Button } from 'antd';
import './style.css';

const content = (
    <div className="like">
        <div>
             <img alt="alipay" src="https://store.flyce.cn/alipay.png" height="100px" />
             <span>支付宝</span>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <div>
             <img alt="wechat" src="https://store.flyce.cn/wechat.png" height="100px" />
             <span>微信</span>
         </div>
    </div>
);

const GlobalFooter = ({ className = 'globalFooter', links, copyright }) => {
    const clsString = classNames("globalFooter", className);
    return (
        <div className={clsString}>
            {links && (
                <div className={"links"}>
                    {links.map(link => (
                        <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                            {link.title}
                        </a>
                    ))}
                </div>
            )}
            <span>支持我们</span>
            {content}
            {/*<Popover content={content} title="扫描二维码赞赏" trigger="hover">*/}
                {/*<Button>支持我们</Button>*/}
            {/*</Popover>*/}
            {copyright && <div className={"copyright"}>{copyright}</div>}
        </div>
    );
};

export default GlobalFooter;
