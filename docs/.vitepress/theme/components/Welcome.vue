<template>
  <!-- 首页右下角弹层，可放广告、欢迎语等。使用sessionStorage缓存 -->
  <div class="welcome">
    <h2 class="h2">
      <span class="span">关注公众号</span>
    </h2>
    <p class="p">爱宇阳</p>
    <div class="div">
      <a class="button" href="https://mp.weixin.qq.com/s/l5zeSwt6ZcGo5VjQMlsqEg" target="_blank">点击关注</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ToastOptions } from 'vue3-toastify'
import type { PropType } from 'vue'
const props = defineProps({
  closeToast: Function as PropType<(e?: MouseEvent) => void>,
  toastProps: Object as PropType<ToastOptions>
})
</script>

<style scoped>
.welcome {
  position: relative;
  /* width: 416px; */
  height: 194px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .h2 {
    display: flex;
    font-size: 0.875rem;
    line-height: 1.5rem;
    font-weight: 600;

    .span {
      opacity: 0.6;
    }
  }

  .p {
    margin-top: 0.5rem;
    line-height: 1.5rem;
    opacity: 0.6;
  }

  .div {
    display: flex;
    margin-top: 1.5rem;
    position: relative;
    .button {
      background-color: #f35543;
      color: #ffffff;
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 8px;
      display: block;
    }

    .image {
      width: 160px;
      position: absolute;
      right: -10px;
      bottom: -70px;
    }
  }
}
</style>
