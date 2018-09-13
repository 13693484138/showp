const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    region: '', //用来保存当前选择的地区
    error: '', //用来存表单错误信息
    uploadZheng: '../../assets/icon/xiangji.png', //身份证正面
    uploadFan: '../../assets/icon/xiangji.png', //身份证反面
    indexZ:false,//判断身份证正面是否选取
    indexF:false,//判断身份证反面是否选取
    uploadId:[],//上传图片后返回的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 表单提交
   */
  saveData(e) {
    let _this = this,
    //组装表单中的值为json格式
    values = e.detail.value; //表单中所有value值
    values.province = this.data.region[0];
    values.city = this.data.region[1];
    values.district = this.data.region[2];
    
    

    // 表单验证
    // if (!_this.validation(values)) {
    //   console.log("======错误不执行下去========")
    //   return false;
    // }
    //准备上传的图片数组
    let imgArr=[];
    imgArr.push(this.data.uploadZheng)
    imgArr.push(this.data.uploadFan)
    // this.setData({
    //   uploadArr:arr
    // })
    // console.log(this.data.uploadArr)
    // 按钮禁用
    // _this.setData({
    //   disabled: true
    // });
    wx.showToast({
      title: '正在保存中..',
    })
    console.log("=========表单数据正确,准备提交=============")
  
    /**
   * 上传图片取回id
   */      let id = [];
    for (let index in imgArr){
      let token = wx.getStorageSync('_hgc');//取得token  
      wx.uploadFile({
        url: 'http://192.168.1.247:8080/attachment/upload',
        filePath: imgArr[index],
        name: 'file',
        header: {
          'Authorization': token
        },
        success: res => {
          console.log(res)
          let data=JSON.parse(res.data);
    
          id.push(data.data)
          // console.log(data.msg);
          this.setData({
            uploadId: id
          })
          console.log(this.data.uploadId);
        },
        fail: err => {
          console.log(err)
        }
      })
    }
    console.log(this.data.uploadId)
    
    
    
    
    // 提交到后端
    // App._post_form('address/add', values, function(result) {
    //   if (result.code === 1) {
    //     App.showSuccess(result.msg, function() {
    //       wx.navigateBack();
    //     });
    //   } else {
    //     // App.showError(result.msg);
    //     console.lgo(this.data.error)
    //   }
    //   // 解除禁用
    //   _this.setData({
    //     disabled: false
    //   });
    // });
  },
  
  /**
   * 表单验证
   */
  validation(values) {
    if (values.name === '') {
      let error = '收件人不能为空';
      this.errToast(error);
      return false;
    }
    if (values.phone.length < 1) {
      let error = '手机号不能为空';
      this.errToast(error);
      return false;
    }
    if (values.phone.length !== 11) {
      let error = '手机号长度有误';
      this.errToast(error);
      return false;
    }
    if (values.cardno.length < 1) {
      let error = '身份证号不能为空';
      this.errToast(error);
      return false;
    }
    if (values.cardno.length !== 18) {
      let error = '身份证长度有误';
      this.errToast(error);
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.phone)) {
      let error = '手机号不符合要求';
      this.errToast(error);
      return false;
    }
    if (!this.data.region) {
      let error = '省市区不能空';
      this.errToast(error)
      return false;
    }
    if (values.address === '') {
      let error = '详细地址不能为空';
      this.errToast(error)
      return false;
    }
    if(this.data.indexZ==false){
      let error = '请上传身份证正面';
      this.errToast(error)
      return false;
    }
    if(this.data.indexF==false){
      let error = '请上传身份证反面';
      this.errToast(error)
      return false;
    }
    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange(e) {
    // console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 表单错误弹窗
   */
  errToast(err) {
    // console.log(err)
    wx.showToast({
      title: err,
      image: '../../assets/icon/err.png'
    })
  },
  /**
   * 身份证选取(正面)
   */
  uploadZ() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res.tempFilePaths)
        _this.setData({
          uploadZheng: res.tempFilePaths[0],
          indexZ:true,
        })
      },
    })
  },
  /**
   * 身份证选取(反面)
   */
  uploadF() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        _this.setData({
          uploadFan: res.tempFilePaths[0],
          indexF:true,
        })
      },
    })
  },
})