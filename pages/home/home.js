// pages/home/home.js
const http=require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],//存放轮播图
    imgSrc:'',//图片来源的ip地址(需要通过图片id进行拼接成完整url)
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    activityId1:'',//活动1 id
    activityTopic1:"",//活动1的主题
    activityGoodsList1:[],//活动1下的商品列表
    activityId2: '',//活动2 id
    activityTopic2: "",//活动2的主题
    activityGoodsList2: [],//活动2下的商品列表
    activityId3: '',//活动3 id
    activityTopic3: "",//活动3的主题
    activityGoodsList3: [],//活动3下的商品列表
    activityId4: '',//活动4 id
    activityTopic4: "",//活动4的主题
    activityGoodsList4: [],//活动4下的商品列表
    activityId5: '',//活动5 id
    activityTopic5: "",//活动5的主题
    activityGoodsList5: [],//活动5下的商品列表
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const imgPath = http.config.imgpathUrl;//取图片的路径需要id拼接
    this.setData({
      imgSrc:imgPath
    })
    console.log(imgPath)
    this.getSwiper();//请求轮播列表
    this.getTopic();//请求活动列表以及该活动下商品列表(4个)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 自定义方法
   */
  //请求轮播图和链接
  getSwiper(){
    http.request({
      apiName:'activity/bannerList',
      method:'post',
      isShowProgress: true,
      success:res=>{
        let resAfter =res;
        let imgUrlArr=[];//存放轮播图地址
        for(let value of resAfter){
          // value.picture = imgPath + value.picture
          imgUrlArr.push(value.picture)
        }
        this.setData({
          imgUrls: imgUrlArr
        })
      }
    })
  },
  //请求活动列表和该活动下的产品列表
  getTopic(){
      http.request({
        apiName: 'activity/indexActivityList',
        method: 'post',
        isShowProgress: true,
        data:{
          activitySize:5,
          goodsSize:4
        },
        success: (res) => {
          console.log(res)
          this.setData({
            //活动1
            activityId1: res[0].id,
            activityTopic1:res[0].title,
            activityGoodsList1:res[0].goodInfos,
            //活动2
            activityId2: res[1].id,
            activityTopic2: res[1].title,
            activityGoodsList2: res[1].goodInfos,
            //活动3
            activityId3: res[2].id,
            activityTopic3: res[2].title,
            activityGoodsList3: res[2].goodInfos,
            //活动4
            activityId4: res[3].id,
            activityTopic4: res[3].title,
            activityGoodsList4: res[3].goodInfos,
            //活动5
            activityId5: res[4].id,
            activityTopic5: res[4].title,
            activityGoodsList5: res[4].goodInfos,
          }) 
          console.log(this.data.activityGoodsList1)
        },
      })
    
    
  },
  //查看全部按钮的跳转
  queryAll(){
    let id=this.data.activityId1
    wx.navigateTo({
      url: '../regionList/regionList?id='+id,
    })
  },
  //活动1的列表点击跳详情
  goodDeatails(e){
    console.log(e.currentTarget.id)
    let goodsId = e.currentTarget.id
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + goodsId,
    })
  },
  //去看看按钮
  looklook(){
    console.log(1)
    let whichId=this.data.activityId2;
    console.log(whichId)
    wx.navigateTo({
      url: '../regionList/regionList?id=' + whichId,
    })
  },
  //全场包税按钮
  enterDetail(){
    
  }
 
  
})