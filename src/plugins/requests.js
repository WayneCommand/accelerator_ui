import axios from 'axios'
import Vue from 'vue'
import api from "../api";

const jwt_decode = require('jwt-decode');

// 统一配置
let REQUEST = axios.create({
    baseURL: 'http://127.0.0.1:9090/',
    responseType: 'json',
    validateStatus(status) {
        // 200 外的状态码都认定为失败
        return status === 200
    }
});

let requestRefreshToken = false;

// 拦截请求
REQUEST.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    let expireTime = Number.parseInt(localStorage.getItem("expireTime"));

    //如果token是过期的 路由会拦截掉并跳转登录
    if (token){
        //过期5min之前 需要更换token
        if (new Date().getTime() > (expireTime - 5 * 60 * 1000)
            && new Date().getTime() < expireTime
            && !requestRefreshToken) {
            requestRefreshToken = true;

            //续期逻辑 暂且先不做额外校验(在下个版本支持多用户的时候添加)
            api.login.refreshToken({account: "accept"})
                .then(resp => {
                    //和login的方法一致 需要提取出来
                    if (resp.data.state === "success"){
                        saveLogin(resp.headers['x-auth-token'])
                    }
                    requestRefreshToken = false;
                })

        }
        config.headers['X-AUTH-TOKEN'] = token;
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

        let errorMessage = '很抱歉我们发生了问题, 请再试一次.';
        if (error.response.data && error.response.data.msg)
            errorMessage = error.response.data.msg;

        switch (error.response.status) {
            case 400:
                //do nothing
                break;
            case 404:
                //do nothing
                break;
            case 401:
            case 403:
                Vue.prototype.$dialog.confirm({
                    text: errorMessage,
                    title: 'CODE [401/403]',
                    actions: {
                        true: {
                            color: 'red',
                            text: '确定',
                        }
                    }
                })
                break;

            default:
                Vue.prototype.$dialog.confirm({
                    text: errorMessage,
                    title: 'CODE [G1VE #P]',
                    actions: {
                        /*false: {
                            text: '取消',
                            handle: () => {
                                this.loadingFlag = false;
                            }
                        },*/
                        true: {
                            color: 'red',
                            text: '确定',
                            handle: () => {
                                /*return new Promise(resolve => {
                                    setTimeout(resolve, 500)
                                })*/
                            }
                        }
                    }
                })


        }
    }
    return Promise.reject(error)
});

function saveLogin(token) {
    let decode = jwt_decode(token);

    localStorage.setItem("token", token);
    localStorage.setItem("expireTime", Number.parseInt(decode.exp) * 1000);
}

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
                if (Object.prototype.hasOwnProperty.call(params, key) && params[key] !== null) {
                    _params += `${key}=${params[key]}&`;
                }
            }
        }
        return REQUEST.get(`${url}${_params}`)
    }
};

export default request