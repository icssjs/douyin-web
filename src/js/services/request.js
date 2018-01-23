import Fetch from 'isomorphic-fetch';
import { notification } from 'antd';


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: response.statusText,
    });
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}


function resultSuccess(result) {
    var resultData = {};
    if(result.status_code === 0){
        return result;
    }
}

/**
 * 接口请求封装
 * @param {string} methods 
 * @param {object} params 
 * @param {object} options 
 */
export default function request(url, params, options) {
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    newOptions.headers = {
       
        ...newOptions.headers,
    };
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => response.json())
        .then(resultSuccess)
        .catch((error) => {
            if (error.code === 401) {
                notification.error({
                    message: error.name,
                    description: error.message,
                });
            }
            if ('stack' in error && 'message' in error) {
                notification.error({
                    message: error.message,
                });
            }

            return { error };
        });
}
