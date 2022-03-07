<template>
  <div class="line-time" :class="className">{{ formatSecToDate(sec) }}</div>
</template>
<script>
export default {
  name: 'LineTime',
  props: {
    sec: Number,
    className: [String, Array, Object]
  },
  methods: {
    formatSecToDate(sec) {
      if (sec === 0) {
        return '00:00'
      }
      if (!sec) {
        return '-'
      }
      const hour = Math.floor(sec / 3600) //时
      const min = Math.floor(sec / 60) //分
      const min_sec =
        (min > 9 ? min : '0' + min) +
        ':' +
        (sec % 60 > 9 ? sec % 60 : '0' + (sec % 60))
      if (hour > 0) {
        return (hour > 9 ? hour : '0' + hour) + ':' + min_sec
      }
      return min_sec
    }
  }
}
</script>
