import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 9876,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

// 跨域配置
// module.exports = {
//   devServer: {                //记住，别写错了devServer//设置本地默认端口  选填
//       port: 9876,
//       proxy: {                 //设置代理，必须填
//           '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
//               target: 'http://localhost:9999',     //代理的目标地址
//               changeOrigin: true,              //是否设置同源，输入是的
//               pathRewrite: {                   //路径重写
//                   '^/api': ''                     //选择忽略拦截器里面的内容
//               }
//           }
//       }
//   }
// }
