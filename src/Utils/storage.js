const config = require("../Config/env");

export function getItem(key) {
    let value;
    try {
        value = localStorage.getItem(key);
    } catch (ex) {
        if (config.__DEV__) {
            console.log('localStorage.getItem报错', ex.message);
        }
    } finally {
        return value;
    }
}

export function setItem(key, value) {
    try {
        // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
        localStorage.setItem(key, value);
    } catch (ex) {
        if (config.__DEV__) {
            console.log('localStorage.setItem', ex.message);
        }
    }
}

export function removeItem(key) {
    try {
        // ios safari 无痕模式下，直接使用 localStorage.setItem 会报错
        localStorage.removeItem(key);
    } catch (ex) {
        if (config.__DEV__) {
            console.log('localStorage.setItem', ex.message);
        }
    }
}