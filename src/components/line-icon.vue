<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script>
import '../utils/icon.js'
export default {
  name: 'LineIcon',
  props: ['name']
}
</script>
<style lang="less" scoped>
.icon {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  color: #fff;
  font-size: 20px;
}
</style>
