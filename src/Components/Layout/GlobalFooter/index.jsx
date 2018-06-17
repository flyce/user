import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import './style.css';

const GlobalFooter = ({ className = 'globalFooter', links, copyright }) => {
    const clsString = classNames(styles.globalFooter, className);
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
            {copyright && <div className={"copyright"}>{copyright}</div>}
        </div>
    );
};

export default GlobalFooter;
