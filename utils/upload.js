const AppConfig = require("config");

const upload=(uploadConfig)=>{
  let token = wx.getStorageSync('_hgc');//取得token
  const apiHost = AppConfig.apiHost;//接口ip
  _config={
    apiName: "",
    filePath: '',
    name:'',
    header: {
      'content-type': 'application/json',
      'Authorization': token
    },
    success: '',//成功回调方法
    fail: ''//失败回调方法
  }
  Object.assign(_config, uploadConfig);
  const _url = apiHost + _config.apiName;//组装完整请求url
  wx.uploadFile({
    url: _url,
    filePath: _config.filePath,
    name: _config.name,
    header: _config.header,
    success: res=>{
      console.log(res)
    },
    fail:err=>{
      console.log(err)
    }
  })
}
module.exports={
  uploadImg:upload
}