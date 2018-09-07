const app=require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    region: '',//用来保存当前选择的地区
    error: '',//用来存表单错误信息
    
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
    values = e.detail.value;//表单中所有value值
    values.region = this.data.region;//pick中的地区值

    // 表单验证
    if (!_this.validation(values)) {
      console.log(this.data.error)
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });
    wx.showToast({
      title: '正在保存中..',
    })
    console.log("提交到后台去了")
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
    if (values.phone.length < 1) {
      let error = '身份证号不能为空';
      this.errToast(error);
      return false;
    }
    if (values.idCard.length !== 18) {
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
    if (values.detail === '') {
      let error = '详细地址不能为空';
      this.errToast(error)
      return false;
    }
    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange(e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 表单错误弹窗
   */
  errToast(err){
    console.log(err)
    wx.showToast({
      title: err,
      image:'../../assets/icon/err.png'
    })
  }

})