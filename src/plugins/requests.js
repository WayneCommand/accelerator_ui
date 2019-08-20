import axios from 'axios'
import store from '../store'

// 统一配置
let REQUEST = axios.create({
    baseURL: 'http://127.0.0.1:9090/',
    responseType: 'json',
    validateStatus(status) {
        // 200 外的状态码都认定为失败
        return status === 200
    }
});

// 拦截请求
REQUEST.interceptors.request.use((config) => {
    let expireTime = store.state.account.expireTime;

    // 有 token就带上
    if (store.state.account.token) {
        config.headers.Authentication = store.state.account.token
    }
    return config
}, (error) => {
    return Promise.reject(error)
});

// 拦截响应
REQUEST.interceptors.response.use((config) => {
    return config
}, (error) => {
    if (error.response) {
        let errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message;
        switch (error.response.status) {
            case 404:
                //TODO notify error
                break;
            case 403:
            case 401:
                //TODO notify error
                break;
            default:
                //TODO notify error
                break;
        }
    }
    return Promise.reject(error)
});

const request = {
    post(url, params) {
        return REQUEST.post(url, params, {
            transformRequest: [(params) => {
                let result = '';
                Object.keys(params).forEach((key) => {
                    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
                        result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
                    }
                });
                return result
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    },
    get(url, params) {
        let _params;
        if (Object.is(params, undefined)) {
            _params = ''
        } else {
            _params = '?';
            for (let key in params) {
                if (params.hasOwnProperty(key) && params[key] !== null) {
                    _params += `${key}=${params[key]}&`
                }
            }
        }
        return REQUEST.get(`${url}${_params}`)
    }
};

export default request