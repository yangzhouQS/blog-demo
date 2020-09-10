<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="3">
        <el-button icon="el-icon-camera" size="small" @click="onTake">拍照上传</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="drawImage" icon="el-icon-camera" size="small">拍照</el-button>
      </el-col>
      <el-col :span="3">
        <el-button v-if="open" @click="getCompetence" icon="el-icon-video-camera" size="small">打开摄像头</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="stopNavigator" icon="el-icon-switch-button" size="small">关闭摄像头</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <video id="videoCamera" class="canvas" width="600px" height="400px" autoplay></video>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="6" v-for="(row,index) in imgList" :key="index">
            <img :src="row" style="width: 100%;height: 100%;" alt="不显示">
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <canvas id="canvasCamera" style="display: none" class="canvas" :width="videoWidth" :height="videoHeight"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        imgSrc: '',
        visible: false, //弹窗
        loading: false, //上传按钮加载
        open: false, //控制摄像头开关
        thisVideo: null,
        thisContext: null,
        thisCancas: null,
        videoWidth: 500,
        videoHeight: 400,
        testSrc: '',
        imgList: []
      };
    },
    mounted () {
    },
    methods: {
      // // 打开弹窗 并开启摄像头
      onTake () {
        this.visible = true;
        this.getCompetence();
      },
      // // 关闭弹窗
      onCancel () {
        this.visible = false;
      },
      // 拍照
      drawImage () {
        /*if (this.imgList.length === 2) {
          this.$message.warning('只可以拍摄两张照片')
          return false
        }*/
        // 点击，canvas画图
        this.thisContext.drawImage(
          this.thisVideo,
          0,
          0,
          this.videoWidth,
          this.videoHeight
        );
        // 获取图片base64链接
        const stringStream = this.thisCancas.toDataURL('image/png');
        this.imgList.push(stringStream)
        const base64Str = stringStream.substr(22)
      },
      // //base64转文件
      dataURLtoFile (dataurl, filename) {
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([ u8arr ], filename, { type: mime });
      },
      // 调用摄像头权限
      getCompetence () {
        //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
        this.$nextTick(() => {
          const _this = this;
          this.open = false; //切换成关闭摄像头
          this.thisCancas = document.getElementById('canvasCamera');
          this.thisContext = this.thisCancas.getContext('2d');
          this.thisVideo = document.getElementById('videoCamera');
          // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
          // 使用getUserMedia，因为它会覆盖现有的属性。
          // 这里，如果缺少getUserMedia属性，就添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              // 首先获取现存的getUserMedia(如果存在)
              let getUserMedia =
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.getUserMedia;
              // 有些浏览器不支持，会返回错误信息
              // 保持接口一致
              if (!getUserMedia) {
                return Promise.reject(
                  new Error('getUserMedia is not implemented in this browser')
                );
              }
              // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            };
          }
          const constraints = {
            audio: false,
            video: {
              width: _this.videoWidth,
              height: _this.videoHeight,
              transform: 'scaleX(-1)'
            }
          };
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
              // 旧的浏览器可能没有srcObject
              if ('srcObject' in _this.thisVideo) {
                _this.thisVideo.srcObject = stream;
              } else {
                // 避免在新的浏览器中使用它，因为它正在被弃用。
                _this.thisVideo.src = window.URL.createObjectURL(stream);
              }
              _this.thisVideo.onloadedmetadata = function (e) {
                _this.thisVideo.play();
              };
            })
            .catch((err) => {
              this.$notify({
                title: '警告',
                message: '没有开启摄像头权限或浏览器版本不兼容.',
                type: 'warning'
              });
            });
        });
      },
      //关闭摄像头
      stopNavigator () {
        if (this.thisVideo && this.thisVideo !== null) {
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.open = true; //切换成打开摄像头
        }
      }
    },
    beforeDestroy () {
      this.stopNavigator();
    }
  };
</script>

<style scoped lang="scss">
  .box {
    display: flex;
    justify-content: space-between;
  }

  .canvas {
    border: 1px solid #e8e8e8;
  }
</style>
