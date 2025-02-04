import request from '@/utils/request'

// 获取文章分类请求接口
export const artGetChannelsService = () => {
    return request.get('/my/cate/list')
}

// 增加文章分类请求接口
export const artAddChannelService = (data) => {
    return request.post('/my/cate/add', data)
}

// 编辑文章分类请求接口
export const artEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类请求接口
export const artDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}