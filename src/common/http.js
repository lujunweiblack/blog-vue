import axios from 'axios';
import router from '../router'
import { MessageBox } from 'element-ui';
axios.defaults.timeout = 10000;
axios.defaults.baseURL ='http://188.131.240.160:9000';
//axios.defaults.baseURL = 'http://127.0.0.1:9000';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'


//http request 拦截器
axios.interceptors.request.use(
  config => {
   var userObj = JSON.parse(localStorage.getItem("userObj"))
    config.headers = {
      Authorization: userObj?userObj.token:null
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === "10500") {
      MessageBox("登录失效，重新登陆", "提示", {
        confirmButtonText: "确定",
        type: "error",
      })
        .then(() => {
          localStorage.removeItem("userObj");
          localStorage.removeItem("menuList");
          router.push({ path: "/login" });
        }).catch(action => {
          if (action === 'cancel') {
            router.push({ path: "/login" });
          }
        });
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        this.$message({
          message: "网络错误，请检查网络连接",
          center: true,
          type: "error",
          showClose: true,
          customClass: "message_c"
        });
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        this.$message({
          message: "网络错误，请检查网络连接",
          center: true,
          type: "error",
          showClose: true,
          customClass: "message_c"
        });
        reject("网络错误：" + err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}