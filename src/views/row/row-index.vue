<template>
  <div class="demo">
    <el-row :gutter="gutter" class="row-item">
      <div class="container" style="width: 100%;height: 100%;">
        <el-col :span="6">
          <div class="row-span">
            <el-button type="primary" size="mini" @click="gutter = gutter + 1">增加间距</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="row-span">
            <el-button type="primary" size="mini" @click="gutter = gutter - 1">减小间距</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="row-span">
            row-span
          </div>
        </el-col>
        <el-col :span="6">
          <div class="row-span">
            row-span
          </div>
        </el-col>
        <el-col :span="16">
          <div class="row-span">
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="row-span">
                  <el-row :gutter="10">
                    <el-col :span="24">
                      <div class="row-span">
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="24">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="24">
                            <div class="row-span">
                              <el-row :gutter="10">
                                <el-col :span="12">
                                  <div class="row-span">

                                  </div>
                                </el-col>
                                <el-col :span="12">
                                  <div class="row-span">

                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="row-span">

                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="row-span">

                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </div>
    </el-row>
    <hr>
    <el-row :gutter="gutter">
      <el-col :span="12" style="background: #42b983">10</el-col>
      <el-col :span="12" style="background: #EEEEEE">10</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'row-index',
    data () {
      return {
        gutter: 0
      }
    },
    mounted () {
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
        this.getData()
      },
      getData () {
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo {
    width: 1200px;
    margin: 20px auto;
    border: 1px salmon solid;
    box-sizing: border-box;
  }

  .row-item {
    border: 1px dashed #0086b3;
    padding: 10px;
    margin-top: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .row-span {
      height: auto;
      padding: 10px;
      border: 1px dotted #42b983;
      margin-bottom: 5px;
    }
  }
</style>