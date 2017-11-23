import axios from 'axios';
// import {Toast} from 'antd-mobile';

//拦截请求
axios.interceptors.request.use((config) => {
    return config;
})

//拦截响应
axios.interceptors.response.use((config) => {
    return config;
})