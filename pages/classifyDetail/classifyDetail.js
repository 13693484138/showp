// pages/classifyDetail/classifyDetail.js
const http = require('../../utils/http');
Page({
  /**
  页面的初始数据
   */
  data: {
    imgSrc:'',//图片路径+id
    key:"",
    showList:[],
    class:[],
    genduo:false,
    setTop:100,
    typeId:"",
    translate:'10px',//滚动条的偏移量
    tabMenu:[],
    tabMenuIndex:0,//默认选中项
    lineWidth:0,//滚动条的宽度
    pageIndex:1,
    pageSize:10,
    pages:0,
    listTitle:[
      {
        name:'默认',
        sort:false//是否允许排序
      },
      {
        name:'销量',
        sort:false//是否允许排序
      },
      {
        name:'收藏',
        sort:false//是否允许排序
      },
      {
        name:'价格',
        sort:true,//是否允许排序
        sortRule:'asc',//不允许排序时可以不写
        order:'salePrice',
        spa:'0'
      },
      {
        name:'品牌',
        sort:false,//是否允许排序
        order:'brand'
      },
    ],
    listTitleIndex:0
  },
  onPullDownRefresh: function(){
    this.loderMore();
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const imgPath = http.config.imgpathUrl;//取图片的路径需要id拼接
    this.setData({
      imgSrc: imgPath
    })
    this.setData({
      key:option.key,
      typeId:option.typeId
    });
    http.request({
      apiName:'/goods/goodsListByClassify',
      method:'post',
      data:{"currentPage":1,"pageSize":10,"classifyId":option.key},
      isShowProgress:true,
      success:(res)=>{
        console.log(res.records)
        this.setData({
          showList:res.records,
          pages:res.pages
        })
      }
    })
    http.request({
      apiName:'goods/sonOfClassify',
      method:'post',
      data:{"pId":this.data.typeId,"firstClassifyId":this.data.key},
      success:(res)=>{
        let arry2=[];
        //重组数组
         res.map(((item,index)=>{
          arry2.push(Object.assign({},item,{"oueterWidth":"0px","innerWidth":"0px"}));
         }));
         //向数组开头添加数据
         arry2.unshift({"title":"全部","oueterWidth":"0px","innerWidth":"0px","id":0});
         this.setData({
          tabMenu:arry2
        })
        this.setData({
          tabMenuIndex:arry2.findIndex(fruit => fruit.id === this.data.key),
          }) //初始下标
      }})
    const _this = this;
    let flag = false;
    const query = wx.createSelectorQuery();
    query.selectAll(".scroll-item").boundingClientRect(function(rects){
      rects.forEach((item,index) => {
        _this.data.tabMenu[index].oueterWidth = item.width;
      });
      query.selectAll(".scroll-item-text").boundingClientRect(function(recs){
        recs.forEach((itemText,idx) => {
          _this.data.tabMenu[idx].innerWidth = itemText.width;
        });
        flag = true;  
      }).exec();
    }).exec();
    let timer = setInterval(function(){
      if(flag){
        _this.setData({
          translate:(_this.data.tabMenu[0].oueterWidth+_this.data.tabMenu[0].oueterWidth*2-_this.data.tabMenu[0].innerWidth)/2+'px',
          lineWidth:_this.data.tabMenu[1].innerWidth+'px'
        })
        clearInterval(timer);
        timer=null;
      }
    },400)
  },
  scrollBottom:function(){
    this.setData({
      pageIndex:this.data.pageIndex+1
    })
    if(this.data.genduo){
      return;
    }
    else{
      this.loderMore();
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  loderMore:function(){
    console.log(this.data.pageIndex);
    console.log(this.data.pages);
    if(this.data.pageIndex-1<=this.data.pages){
      if(!this.data.key){
        http.request({
          apiName:'/goods/goodsListByFirstClassify',
          method:'post',
          data:{"currentPage":this.data.pageIndex,"pageSize":this.data.pageSize,"classifyId":this.data.typeId},
          isShowProgress:true,
          success:(res)=>{
            this.setData({
              showList:this.data.showList.concat(res.records),
              pages:res.pages
            })
          }
        })
      }
      else{
      http.request({
        apiName:'/goods/goodsListByClassify',
        method:'post',
        data:{"currentPage":this.data.pageIndex,"pageSize":this.data.pageSize,"classifyId":this.data.key},
        isShowProgress:true,
        success:(res)=>{
          console.log(res);
          this.setData({
            showList:this.data.showList.concat(res.records),
            pages:res.pages
          })
        }
      })
    }
    }
    else{
      this.setData({
        genduo:true
      })
   }
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
  scrollTop:function(){
    this.setData({
      setTop:0
    })
    // wx.createSelectorQuery().select(".goods-scroll-view").scrollOffset(function(res){
    //  // 节点的竖直滚动位置
    // }).exec()
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
   * 商品详情
   */
  goodsContent:function(e){
    wx.navigateTo({
      url: '../goods/goods?goodsId='+e.currentTarget.dataset.id,
    })
  },
    /**
   * 滑块
   */
  menuTap:function(e){
    this.setData({
      key:e.currentTarget.dataset.id,
      pageIndex:1,
      showList:[],
      pages:0,
      genduo:false
    });
     this.loderMore();
    const index = e.currentTarget.dataset.index;
    const outerWidth = this.data.tabMenu[index].oueterWidth;
    const innerWidth = this.data.tabMenu[index].innerWidth;
   this.data.translate=  e.currentTarget.offsetLeft;
   this.setData({
     translate:this.data.translate+(outerWidth-innerWidth)/2+'px',
     lineWidth:innerWidth+'px',
     tabMenuIndex:index
   })
  },
    /**
   * 排序
   */
  titleMenuTap:function(e){
    if(this.data.key==0){
      http.request({
        apiName:'/goods/goodsListByFirstClassify',
        method:'post',
        data:{"currentPage":1,"pageSize":10,"classifyId":this.data.typeId,"order":e.currentTarget.dataset.order},
        isShowProgress:true,
        success:(res)=>{
          this.setData({
            showList:res.records,
            pageIndex:1
          })
        }
      })
    }
    else{
    http.request({
      apiName:'/goods/goodsListByClassify',
      method:'post',
      data:{"currentPage":1,"pageSize":10,"classifyId":this.data.key,"order":e.currentTarget.dataset.order},
      isShowProgress:true,
      success:(res)=>{
        console.log(res);
        this.setData({
          showList:res.records,
          pageIndex:1
        })
      }
    })
  }
    const index = e.currentTarget.dataset.index;
    const menuItem = this.data.listTitle[index];
    if(index!=this.data.listTitleIndex){
      this.data.listTitleIndex = index;
      this.setData({
        listTitleIndex:this.data.listTitleIndex
      })
    }else{
      if(menuItem.sort){
        this.data.listTitle[index].sortRule = menuItem.sortRule=='asc'?'desc':'asc';
        this.setData({
          listTitle:this.data.listTitle
        })
      }
    }
  }
})