import Vue from 'vue'
import VueRouter from 'vue-router'

import Menu from "../views/componets/Menu";
import Header from "../views/componets/Header";
import LoginCard from "../views/login/LoginCard";
import LoginHeader from "../views/login/LoginHeader";
import Profile from "../views/profiles/Profile";
import MyInfo from "../views/profiles/components/MyInfo";
import Safety from "../views/profiles/components/Safety";
import Main from "../views/profiles/components/Main";

import {getTokenInfo} from '../components/utils/access-utils';


Vue.use(VueRouter);

let constRouter = [
    {
        path: '/',
        name: '主页',
        redirect:"/profile/myinfo"
    },
    {
        path: '/login',
        name: '登录页',
        components: {
            header: LoginHeader,
            default: LoginCard
        }
    },
    {
        path: '/profile',
        name: '个人信息',
        components: {
            navigation: Menu,
            header: Header,
            default: Profile
        },
        children:[
            {
                path:'myinfo',
                component:MyInfo
            },
            {
                path: 'safety',
                component: Safety
            },
            {
                path:'main',
                component: Main

            }
        ]
    }
];

const permitList = ['/login'];

let router = new VueRouter({
    routes: constRouter
});


//用于控制未登录跳转。
router.beforeEach((to, from, next) => {
    //避免递归调用
    if (permitList.indexOf(to.path) !== -1) {
        next()
    }

    let tokenInfo = getTokenInfo();
    let token = tokenInfo.token;
    let expireTime = tokenInfo.expireTime;

    //检查localstorage里有没有token
    //如果有token则判断是否已过期
    //过期就需要跳转到登陆页面
    if (token && new Date().getTime() < expireTime){
        next()
    }else{
        console.log(from.path);
        if (to.path === "/login") {
            next();
        } else {
            if (to.fullPath === "/profile/myinfo") //避免 / 的 redirect 的 url
                next("/login");
            else
                next({
                    path: "/login",
                    query: {redirect: to.fullPath} //把源url放到query里
                });
        }
    }
})

export default router
