<template>
  <!-- 公众号推广流量卡 -->
  <div class="gzharea">
    <div class="gzh-header">
      <p class="title">🔥热门流量卡推荐🔥</p>
      <p class="subtitle">超低资费｜高速流量｜正规渠道</p>
    </div>

    <div class="qrcode">
      <a href="https://mp.weixin.qq.com/s/l5zeSwt6ZcGo5VjQMlsqEg" target="_blank">
        <img src="/qrcode.jpg" alt="公众号二维码" />
      </a>
    </div>

    <div class="gzh-footer">
      <p class="highlight">扫码关注【爱宇阳】公众号</p>
      <!--<p>获取最新流量卡优惠和办理入口</p>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.gzharea {
  border-radius: 16px;
  padding: 20px;
  margin: 24px 0;
  text-align: center;
  font-size: 0.85rem;
  background: linear-gradient(145deg, var(--vp-c-bg-alt), var(--vp-c-bg));
  border: 1px solid var(--vp-c-gray-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.gzh-header .title {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  color: var(--vp-c-brand);
}

.gzh-header .subtitle {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 14px;
}

.qrcode img {
  width: 180px;
  height: 180px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 14px;
  cursor: pointer;
  transition: transform 0.2s;
}

.qrcode img:hover {
  transform: scale(1.05);
}

.gzh-footer .highlight {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  margin-bottom: 6px;
}
</style>
