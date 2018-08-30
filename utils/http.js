const AppConfig = require("config");
let stack = [];//重新登录时，请求栈
const http = (httpConfig) => {
    let token = wx.getStorageSync('_hgc');//读取token
    const apiHost = AppConfig.apiHost;
    let _config = {
        apiName: "",
        method: "GET",
        data: {},
        isShowProgress: false,
        progressTitle: "加载中...",//progress title
        header: {
            'content-type': 'application/json',
            'Authorization': token
        },
        success:'',//成功回调方法
        fail:''//失败回调方法
    }
    Object.assign(_config, httpConfig);
    let tId = null;
    if (_config.isShowProgress) {
        tId = setTimeout(function () {//加载提示框
            wx.showToast({
                title: _config.title,
                icon: 'loading',
                duration: 10000
            });
        }, 500);
    }
    let time = Date.now()
    const _url = apiHost + _config.apiName;
    return new Promise((resolve, reject) => {
        wx.request({
            url: _url,
            data: _config.data,
            header: _config.header,
            method:_config.method,
            success: (res) => {
                let _data = res.data;
                if (_data['result'] == '0000') {
                    resolve(_data.data)
                } else if (_data['result'] == '1002') {//token过期  重新登录
                    if (stack.length == 0) {
                        wxLogin().then((res) => {
                            const item = stack.shift();
                            sendRequest(item);
                        }).catch((res) => {
                            console.log('登录失败：' + JSON.stringify(res));
                        })
                    }
                    stack.push(httpConfig);
                    reject(_data);
                } else {
                    reject(_data)
                }
            },
            fail: (error) => {
                console.log('网络请求出错：api:' + _config.apiName + ";错误消息：" + JSON.stringify(error));
                reject(error);
            },
            complete: (res) => {
                if (_config.isShowProgress) {
                    wx.hideToast();
                    clearTimeout(tId);
                    tId = null;
                }

            }
        })
    })
}

const wxLogin = () => {
    return new Promise((resolve, reject) => {
        // 先调用 wx.login 获取到 code
        wx.login({
            success: res => {
                // 再调用 wx.getUserInfo 获取到用户的一些信息 （一些基本信息 比如 rawData, signature, encryptedData, iv）
                let param = {
                    code: res.code,
                }
                wx.getUserInfo({
                    // 若获取不到用户信息 （最大可能是用户授权不允许，也有可能是网络请求失败，但该情况很少）
                    fail: (e) => {
                        //reject(e)
                       // resolve(e)
                    },
                    success: ({ userInfo, rawData, signature, encryptedData, iv }) => {
                        param['rawData'] = rawData;
                        param['signature'] = signature;
                        param['encryptedData'] = encryptedData;
                        param['iv'] = iv;
                        param['userInfo'] = userInfo

                    },
                    complete: () => {
                        // 登录操作
                        http({
                            apiName: AppConfig.loginApi,
                            params: param,
                            method: 'post'
                        }).then(res => {
                           
                                // 保存用户信息
                                wx.setStorage({
                                    key: 'userinfo',
                                    data: param['userInfo']
                                })
                                wx.setStorage({
                                    key: "_hgc",
                                    data: res['user']['token'],
                                    success: () => {
                                        resolve(res)
                                    }
                                })
                          
                        }).catch(error => reject(error))
                    }
                })
            }
        })
    })
}
const sendRequest = (httpConfig) => {
    let token = wx.getStorageSync('_hgc');//读取token 
    if (!token) {//只判定token 是否有效  token是否过期由后端判定
        if (stack.length == 0) {//并发请求时,只登录一次
            wxLogin().then((res) => {
                const item = stack.shift();
                sendRequest(item);
            }).catch((res) => {
                console.log('登录失败：' + JSON.stringify(res));
            })
        }
        stack.push(httpConfig);
        return false;
    }
    http(httpConfig).then((res)=>{
        if(typeof httpConfig.success =='function'){
            httpConfig.success(res);
        }else{
            wx.showModal({
                title: '提示', //提示的标题,
                content: '未设置回调方法', //提示的内容,
                showCancel: false, //是否显示取消按钮,
                confirmText: '确定',
              });
        }
    }).catch((error)=>{
        if(typeof httpConfig.fail =='function'){
            httpConfig.fail(error)
        }else{
            wx.showModal({
              title: '提示', //提示的标题,
              content: JSON.stringify(error), //提示的内容,
              showCancel: false, //是否显示取消按钮,
              confirmText: '确定',
            });
        }
    })
}
module.exports = {
    request: sendRequest,
    config: AppConfig
};