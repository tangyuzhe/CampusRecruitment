import axios from 'axios';
import qs from 'qs';

export const BaseRequest = {
  getRequest: (url: string, params: any) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api' + url + qs.stringify(params),
        method: "GET",
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  },
  getRequestWithPath: (url: string) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api' + url,
        method: "GET",
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  },
  postRequest: (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api' + url,
        method: "POST",
        data: data,
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  },
  //传data数据修改
  putRequest: (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api' + url,
        method: "PUT",
        data: data,
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  },
  //使用URL进行修改
  putRequestWithParams: (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: '/api' + url + qs.stringify(data),
        method: "PUT",
        header: {
          "content-type": "application/json",
        },
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  }
};