// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      item:0,
      tab:0,
      // 播放列表数据
      state:'pause',
      playIndex:0,

      play:{
        currentTime:'00:00',
        duration:'00:00',
        percent:0,
        title:'',
        singer:'',
        converImgUrl:'../image/cover.jpg'
      },

      playlist:[{
        id: 1,
        title: '钢铁洪流进行曲',
        singer: '李旭昊',
        src: 'http://music.163.com/song/media/outer/url?id=1394369908.mp3',
        coverImgUrl: '../image/cover.jpg'
      }, {
        id: 2,
        title: '我和我的祖国钢琴版',
        singer: '文武贝',
        src: 'http://music.163.com/song/media/outer/url?id=1393976791.mp3',
        coverImgUrl: '../image/cover.jpg'
      }, {
        id: 3,
        title: 'Super Mario Theme',
        singer: 'VA',
        src: 'http://music.163.com/song/media/outer/url?id=30431983.mp3',
        coverImgUrl: '../image/cover.jpg'
      }, {
        id: 4,
        title: '幻音宝盒',
        singer: '秦时明月',
        src: 'http://music.163.com/song/media/outer/url?id=392388.mp3',
        coverImgUrl: '../image/cover.jpg'
      }]
  },
  
  //页面切换
  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item,
    })
  },

  //tab切换
  changeTab:function(e){
    this.setData({
      tab:e.detail.current
    })
  },

    // 实现播放器播放功能
    audioCtx:null,
    onReady:function(){
      this.audioCtx=wx.createInnerAudioContext()
      //默认选择第1曲
      this.setMusic(0)
      this.audioCtx.startTime
      var that=this

      // 播放进度检测
      this.audioCtx.onError(function(){
        console.log("播放失败："+that.audioCtx.src)
      })

      //播放完成自动换下一曲
      this.audioCtx.onEnded(function(){
        console.log(this)
        that.next()
      })

      //自动更新播放进度
      this.audioCtx.onPlay(function(){})
        this.audioCtx.onTimeUpdate(function(){
          that.setData({
            'play.duration':formatTime(that.audioCtx.duration),
            'play.currentTime':formatTime(that.audioCtx.currentTime),
            'play.percent':that.audioCtx.currentTime/that.audioCtx.duration*100
          })
        })
      //格式化时间
      function formatTime(time){
        var minute=Math.floor(time/60)%60;
        var second=Math.floor(time)%60;
        return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
      }
    },

    // 滑动进度条播放
    sliderChange:function(e){
      var second=e.detail.value * this.audioCtx.duration/100
      this.audioCtx.seek(second)
    },

 

    //播放按钮
    play:function(){
      this.audioCtx.play()
      this.setData({
        state:'running'
      })
    },

    //暂停按钮
    pause:function(){
      this.audioCtx.pause()
      this.setData({
        state:'paused'
      })
    },
    
  //音乐播放
  setMusic:function(index){
    var music = this.data.playlist[index]
    this.audioCtx.src=music.src
    this.setData({
        playIndex:index,
        'play.title':music.title,
        'play.singer':music.singer,
        'play.coverImgUrl':music.coverImgUrl,
        'play.currentTime':'00:00',
        'play.duration':'00:00',
        'play.percent':0
    })
  },

  //上一曲按钮
  previous:function(){
    //循环列表
    // var index=this.data.playIndex >= this.data.playlist.length-1?0:this.data.playIndex+1
    var index=this.data.playIndex <= 0?this.data.playlist.length-1:this.data.playIndex-1
    this.setMusic(index)
    if(this.data.state ==='running'){
      this.play()
    }
  },

  //下一曲按钮
  next:function(){
    //循环列表
    var index=this.data.playIndex >= this.data.playlist.length-1?0:this.data.playIndex+1
    this.setMusic(index)
    if(this.data.state ==='running'){
      this.play()
    }
  },

  // 切换曲目
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index)
    this.play()
  },

  onLoad:function(){
    wx.request({
      url: '',
      success:res=>{
        this.setData({
          playlist:res.data.playlist
        })
      }
    })
  }
    
})
