// pages/test/swiper.js
Page({
    data:{
        scrollleft:0,
        scrolltop:0
    },
    onScroll:function(e){
        console.log(e)
        this.setData({
            scrollleft:160,
            scrolltop:160
        })
    },
    onClick:function(e){
        if(e.detail.value){
            this.audioCtx.play()
        }
        else{
            this.audioCtx.pause()
        }
    },
    audioCtx:wx.createInnerAudioContext(),
    onReady:function(){
        //创建InnerAudioContext实例
        var audioCtx=this.audioCtx
        console.log(audioCtx)
        console.log(audioCtx)
        //设置音频资源地址
        audioCtx.src='http://music.163.com/song/media/outer/url?id=1423123512.mp3'
        //开始播放，调试信息
        audioCtx.onPlay(function(){
            console.log('开始播放');
        })
        audioCtx.onPause(function(){
            console.log("暂停播放")
        })
        //发生错误，调试信息
        audioCtx.onError(function(){
            console.log(res.errMsg) //错误信息
            console.log(res.errCode)    //错误码
        })
        //开始播放 
        audioCtx.onCanplay(function(){
            audioCtx.play()
        })
    },
    sliderChange:function(e){
        console.log(e.detail.value)
    },
    sliderChanging:function(e){
        console.log(e.detail.value)
    }

})