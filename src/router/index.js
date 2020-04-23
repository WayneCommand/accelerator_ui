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
import Msg from '../views/componets/Message';


Vue.use(VueRouter);

let constRouter = [
    {
        path: '/',
        name: '主页',
        components: {
            navigation: Menu,
            header: Header,
        }
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
    },
    {
        path: '/msg',
        name: 'test msg',
        components: {
            default: Msg
        }
    }
];

let router = new VueRouter({
    routes: constRouter
});

/*const whiteList = ['/login'];*/

export default router
