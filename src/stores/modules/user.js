import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

// 用户模块token数据
export const useUserStore = defineStore('big-user', () => {
    const token = ref('') // 存用户token信息
    const user = ref({}) // 存用户基本信息

    // 设置用户token
    const setToken = (newToken) => {
        token.value = newToken
    }
    // 移除用户token
    const removeToken = () => {
        token.value = ''
    }

    // 获取用户基本信息，并存入
    const getUser = async () => {
        const res = await userGetInfoService()
        user.value = res.data.data
    }

    // 操作用户信息
    const setUser = (obj) => {
        user.value = obj
    }

    return {
        token,
        setToken,
        removeToken,
        user,
        getUser,
        setUser
    }
},
{
    persist:true
}
)
