import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块token数据
export const useUserStore = defineStore('big-user', () => {
    const token = ref('')
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''
    }

    return {
        token,
        setToken,
        removeToken
    }
},
{
    persist:true
}
)
