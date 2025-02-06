<script setup>
import { User, Lock, ArrowLeftBold, ArrowRightBold} from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const loading = ref(false)

// 1. 注册
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 1.1 注册表单校验规则
const rules = {
  username: [
    { required: true, message: 'Enter your username', trigger: 'blur' },
    { min: 5, max: 10, message: 'Username must be 5-10 characters long', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Enter your password', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-empty characters',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: 'Enter your password again', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: 'Password must be 6-15 non-empty characters',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('Inconsistency between two password entries!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 1.2 请求注册前预校验
const form = ref()

// 1.3 注册方法
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('Register Success')
  isRegister.value = false
}

//  切换时重置输入框
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

const userStore = useUserStore()
const router = useRouter()
// 2. 登录
const login = async () => {
  // const loading = ElLoading.service({ fullscreen: true })
  await form.value.validate()
  loading.value = true
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  loading.value = false
  ElMessage.success('Login Success')
  router.push('/')
  // loading.close()
}
</script>


<template>
<!-- el-row代表一整行，并分成24份 -->
  <el-row class="login-page" v-loading = "loading">
    <!-- el-col代表一列，:span表示占了12份 -->
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">

      <!-- 1. 注册表单 -->
      <el-form :model = "formModel" :rules = "rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>Register</h1>
        </el-form-item>
        <el-form-item prop = "username">
          <el-input v-model = "formModel.username" :prefix-icon="User" placeholder="Enter your email or phone"></el-input>
        </el-form-item>
        <el-form-item prop = "password">
          <el-input
            v-model = "formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="Enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item prop = "repassword">
          <el-input
            v-model = "formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="Enter your password again"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click = "register" class="button" type="primary" auto-insert-space>
            Continue
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            <el-icon>
              <ArrowLeftBold />
            </el-icon>
            Back
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 2. 登录表单 -->
      <el-form :model = "formModel" :rules = "rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>Sign In</h1>
        </el-form-item>
        <el-form-item prop = "username">
          <el-input v-model = "formModel.username" :prefix-icon="User" placeholder="Enter your email or phone"></el-input>
        </el-form-item>
        <el-form-item prop = "password">
          <el-input
            v-model = "formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="Enter your password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>Remember me</el-checkbox>
            <el-link type="primary" :underline="false">Forget paswword?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click = "login" class="button" type="primary" auto-insert-space>Continue</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            Register
            <el-icon>
              <ArrowRightBold />
            </el-icon>
          </el-link>
        </el-form-item>
      </el-form>

    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  .login-page {
    height: 100vh;
    background-color: #fff;
    .bg {
      background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
        url('@/assets/login_bg.jpg') no-repeat center / cover;
      border-radius: 0 20px 20px 0;
    }
    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      user-select: none;
      .title {
        margin: 0 auto;
      }
      .button {
        width: 100%;
      }
      .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>