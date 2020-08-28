<template>
  <div class="test-a">
    test-a
    <el-divider>A组件</el-divider>
    <el-input v-model="input" placeholder="placeholder"></el-input>
    <el-button type="primary" @click="goTo">去B组件</el-button>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">

    </el-form>
    <el-select v-model="input2" placeholder="placeholder">
      <el-option
          v-for="item in optionsList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'A',
    data () {
      return {
        input: '',
        form: {
          name: ''
        },
        rules:{
          name:[
            { required: true, message: '名称', trigger: 'blur' },
          ]
        }
      }
    },
    mounted () {
      console.log('AAAAAAAAA')
      this.reload()
    },
    computed: {},
    methods: {
      reload () {
      },
      goTo () {
        this.$router.push({ name: 'b-test' })
      }
    }
  }
</script>

<style scoped>

</style>