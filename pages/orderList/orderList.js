const http = require("../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc:'',//图片请求ip
    translate: '', //滚动条的偏移量
    tabMenu: [
      // {
      //   text:'全部',
      //   oueterWidth:'0px',
      //   innerWidth:'0px'
      // },
      {
        text: '待付款',
        oueterWidth: '0px',
        innerWidth: '0px'
      }, {
        text: '待发货',
        oueterWidth: '0px',
        innerWidth: '0px'
      }, {
        text: '已发货',
        oueterWidth: '0px',
        innerWidth: '0px'
      }
    ],
    // listMenu:[
    //   {
    //     text:"线上订单",
    //   }
    //   ,
    //   {
    //     text:"门店消费",
    //   }

    // ],
    listTap: 0,
    tabMenuIndex: 0, //默认选中项
    lineWidth: 0, //滚动条的宽度
    listTitle: [{
        name: '默认',
        sort: false //是否允许排序
      },
      {
        name: '销量',
        sort: false //是否允许排序
      },
      {
        name: '收藏',
        sort: false //是否允许排序
      },
      {
        name: '价格',
        sort: true, //是否允许排序
        sortRule: 'asc' //不允许排序时可以不写
      },
      {
        name: '品牌',
        sort: false //是否允许排序
      },
    ],
    listTitleIndex: 0,
    showData: [], //当前应该显示的数据
    status:'',//当前的状态文字(0待付款1待发货2待收货)
    noList:false,//若该订单状态下午数据那么页面上显示没有数据图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const imgPath = http.config.imgpathUrl;//取图片的路径需要id拼接
    this.setData({
      imgSrc: imgPath
    })
    console.log(imgPath)
    const _this = this;
    let flag = false;
    //改变tabMenu的状态
    this.setData({
      tabMenuIndex: options.tabMenuIndex,
      status: this.data.tabMenu[options.tabMenuIndex].text
    })
    //通过传参改变选项卡
    let offset = (parseInt(options.tabMenuIndex)) + '00%'
    this.setData({
      tabMenuIndex: options.tabMenuIndex,
      translate: offset
    })
    //options.tabMenuIndex=    0点击待付款 1待发货 2 已发货
    //status                   1待付款     2待发货 3待收货
    if (options.tabMenuIndex == 0) {
      //请求待付款
      http.request({
        apiName: 'order/orderlist',
        method: 'post',
        data: {
          'currentPage': 1,
          'pageSize': 10,
          'status': 1
        },
        isShowProgress: true,
        success: res => {
          console.log(res);
          this.setData({
            showData: res.list,
          })
          if(res){
            console.log(res);
          }else{
            this.setData({
              noList: true
            })
          }
        },
      })
    } else if (options.tabMenuIndex == 1) {
      //请求待发货
      http.request({
        apiName: 'order/orderlist',
        method: 'post',
        data: {
          'currentPage': 1,
          'pageSize': 10,
          'status': 2
        },
        isShowProgress: true,
        success: res => {
          if (res) {
            this.setData({
              showData: res.list,
            })
          } else {
            this.setData({
              noList: true,
              showData:""
            })
          }       
        },
      })
    } else if (options.tabMenuIndex == 2) {
      //请求待发货
      http.request({
        apiName: 'order/orderlist',
        method: 'post',
        data: {
          'currentPage': 1,
          'pageSize': 10,
          'status': 3
        },
        isShowProgress: true,
        success: res => {
          console.log(res);
          this.setData({
            showData: res.list,
          })
          if (res) {
            console.log("有数据")
          } else {
            this.setData({
              noList: true
            })
          }
        },
      })
    }

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
    //  this.data.translate=  e.currentTarget.offsetLeft;
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
  //选项卡的切换
  menuTap: function(e) {
    //index选项卡的下标
    const index = parseInt(e.currentTarget.dataset.index);
    console.log(e.currentTarget.dataset.index);
    const outerWidth = this.data.tabMenu[index].oueterWidth;
    const innerWidth = this.data.tabMenu[index].innerWidth;
    this.data.translate = e.currentTarget.offsetLeft;
    this.setData({
      translate: this.data.translate + 'px',
      tabMenuIndex: index,
      status: this.data.tabMenu[index].text
    })
    //根据选择的选项卡切换内容
    http.request({
      apiName: 'order/orderlist',
      method: 'post',
      data: {
        'currentPage': 1,
        'pageSize': 10,
        'status': index+1
      },
      isShowProgress: true,
      success: res => {
        console.log(res);
        if(res){
          this.setData({
            showData: res.list,
          })
        }else{
          this.setData({
            showData: '',
            noList:true
          })
        }
        
        }
  
    
  })},
  /*
  若有需求可释放该条注释
  listTap:function(e){
    console.log(e);
     this.setData({
       listTap:e.currentTarget.dataset.index
     })
  },*/


  // titleMenuTap:function(e){
  //   const index = e.currentTarget.dataset.index;
  //   const menuItem = this.data.listTitle[index];
  //   if(index!=this.data.listTitleIndex){
  //     this.data.listTitleIndex = index;
  //     this.setData({
  //       listTitleIndex:this.data.listTitleIndex
  //     })
  //   }else{
  //     if(menuItem.sort){
  //       this.data.listTitle[index].sortRule = menuItem.sortRule=='asc'?'desc':'asc';
  //       this.setData({
  //         listTitle:this.data.listTitle
  //       })
  //     }
  //   }
  // },


  //进入商品详情
  enterDetail(e) {
    // console.log(e.currentTarget.id);
    let goodsId = e.currentTarget.id;
    wx.navigateTo({
      url: '../goods/goods?goodsId=' + goodsId,
    })
  },
  //点击支付跳转填写订单信息页
  editOrder(e){
    let index = e.currentTarget.id;//判断点击的是第几组订单的下标
    let orderGroup=this.data.showData[index].goods;//根据下标取得所要支付的商品列表和数量
    console.log(orderGroup)
    let json={};//将订单组装成{goodsId:num,goosId:num}格式
    for(let key of orderGroup){
      var jsonKey = key.goodsId;
      json[jsonKey] = key.num;
    }
    console.log(json)
    json=JSON.stringify(json)
    console.log(json)
    wx.navigateTo({
      url: '../editOrder/editOrder?order='+json,
    })
  }
  
})