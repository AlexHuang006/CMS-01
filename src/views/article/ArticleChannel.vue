<script setup>
import { ref } from 'vue'
import { artDelChannelService, artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from '../article/components/ChannelEdit.vue'
import { ElMessageBox } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

// 封装一个请求文章分类的函数
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
  // console.log(channelList.value)
}

getChannelList()

const onEditChannel = (row) => {
  // console.log(row, $index)
  dialog.value.open(row)
}

const onAddchannel = () => {
  dialog.value.open({})
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确定删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })

  await artDelChannelService(row.id)
  ElMessage('删除成功')
  getChannelList()
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddchannel">添加分类</el-button>
    </template>
    <el-table v-loading = "loading" :data = channelList style = "width: 100%">
      <el-table-column label="No" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop = "cate_name"></el-table-column>
      <el-table-column label="分类别名" prop = "cate_alias"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>

<!-- 弹窗组件 -->
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>

