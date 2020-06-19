<template>
  <div class="div">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="999"/>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
  export default {
    name: 'form-test',
    data () {
      return {
        form: {
          name: '',
          age: ''
        },
        rules: {
          name: [
            { required: true, trigger: 'blur' },
            { required: true, length: 3, message: '长度最短为3', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '输入', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$message.success('ok')
          } else {
            this.$message.error('error')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>