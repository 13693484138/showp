// pages/editAddress/editAddress.js
const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',//图片请求ip地址
    /*表单信息 */
    name: '',
    phone: '',
    cardNo: '',
    region: ["","",""],
    address: '',
    isDefault:false,
    facePhoto:'',
    backPhoto:'',
    uploadZheng:'',
    uploadFan:'',
    /*上传图片后取回的id */
    uploadId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const imgpathUrl = http.config.imgpathUrl
    this.setData({
      imgSrc: imgpathUrl
    })
    let addressId = options.addressId;
    console.log(addressId)
    this.queryAddress(addressId); //请求将要编辑的地址详情
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 自定义方法
   */

  //查询地址详情 并 取回身份证图片id
  queryAddress(params) {
      http.request({
        apiName: 'order/addressdetail',
        method: 'post',
        data: {
          id: params
        },
        isShowProgress: true,
        success: res => {
          console.log(res);
          this.setData({
            name: res.name,
            phone: res.phone,
            cardNo: res.cardNo,
            address: res.address,
            region: [res.province, res.city, res.district],
            isDefault: res.isDefault,
            facePhoto: res.facePhoto,
            uploadZheng: this.data.imgSrc + res.facePhoto,
            backPhoto: res.backPhoto,
            uploadFan: this.data.imgSrc + res.backPhoto
          })
        },
        
      })
    
  },
  /**
   * 身份证选取(正面)
   */
  uploadZ() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res.tempFilePaths)
        _this.setData({
          uploadZheng: res.tempFilePaths[0],
          indexZ: true,
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
      success: function (res) {
        console.log(res)
        _this.setData({
          uploadFan: res.tempFilePaths[0],
          indexF: true,
        })
      },
    })
  },

  /**
   * 点击保存触发事件(表单验证，表单数据组装json)
   */
  saveData(e) {
    //组装表单中的值为json格式
    values = e.detail.value; //表单中所有value值
    values.province = this.data.region[0];
    values.city = this.data.region[1];
    values.district = this.data.region[2];
    console.log(values)


    // 表单验证
    if (!_this.validation(values)) {
      console.log("======错误不执行下去========")
      return false;
    }
    //准备上传的图片数组
    let imgArr = [];
    imgArr.push(this.data.uploadZheng)
    imgArr.push(this.data.uploadFan)


    //点击保存的人机交互效果
    wx.showLoading({
      title: '审核身份证',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 300)

    /**
   * 上传图片取回id
   */
    let id = [];//用来存返回的id
    for (let index in imgArr) {
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
          let data = JSON.parse(res.data);
          id.push(data.data)
          this.setData({
            uploadId: id
          })
          console.log(this.data.uploadId);
          if (this.data.uploadId.length == 2) {
            console.log("两个返回id已取得")
            //将返回的id组装到values对象中
            values.facephoto = this.data.uploadId[0];
            values.backphoto = this.data.uploadId[1];

            wx.showModal({
              title: '提交',
              content: '请确认您的信息无误',
              success: (res) => {
                if (res.confirm) {
                  // 点击确定后的人机交互
                  this.setData({
                    disabled: true
                  });
                  this.submitAll(values)
                  wx.showLoading({
                    title: '正在保存中',
                  })
                }
              }
            })

          }
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  },
  /**
   * 表单验证条件和正则
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
    if (this.data.indexZ == false) {
      let error = '请上传身份证正面';
      this.errToast(error)
      return false;
    }
    if (this.data.indexF == false) {
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
    wx.hideToast()
  },
})