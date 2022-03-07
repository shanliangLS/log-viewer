<template>
  <div
    class="line-wrapper"
    :class="{'section-start': sectionStart}"
    :style="customStyle"
    @click="toggleCollapse"
    v-if="!collapse || sectionStart"
  >
    <line-icon
      v-if="sectionStart"
      :name="collapse ? 'arrow-right' : 'arrow-down'"
    ></line-icon>
    <line-number v-if="hasNumber" v-bind="numberData"></line-number>
    <slot>
      <line-content :content="data"></line-content>
    </slot>
    <line-time v-if="sectionStart" v-bind="timeData"></line-time>
  </div>
</template>
<script>
import LineContent from './line-content.vue'
import LineNumber from './line-number.vue'
import LineTime from './line-time.vue'
import LineIcon from './line-icon.vue'
import {EventBus} from '../utils/event-bus'
export default {
  name: 'LineWrapper',
  components: {
    LineContent,
    LineNumber,
    LineTime,
    LineIcon
  },
  data() {
    return {
      collapse: false
    }
  },
  props: {
    /**
     * line-content attrs
     */
    data: {
      type: Array,
      default() {
        return [
          {
            text: ''
          }
        ]
      }
    },
    sectionStart: {
      type: Boolean,
      default: false
    },
    sectionName: {
      type: String,
      default: ''
    },
    /**
     * the line height
     */
    height: {
      type: [Number, String],
      default: 20
    },
    comStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    hasNumber: Boolean,
    numberData: Object,
    timeData: Object
  },
  computed: {
    customStyle() {
      const height =
        typeof this.height === 'number' ? this.height + 'px' : this.height
      return Object.assign(
        {
          lineHeight: height,
          height
        },
        this.comStyle
      )
    }
  },
  mounted() {
    EventBus.$on('toggleLogViewerCollapse', (emitName, emitCollapse) => {
      if (!this.sectionStart && this.sectionName === emitName) {
        this.collapse = emitCollapse
      }
    })
  },
  methods: {
    toggleCollapse() {
      if (this.sectionStart && this.sectionName) {
        EventBus.$emit(
          'toggleLogViewerCollapse',
          this.sectionName,
          !this.collapse
        )
        this.collapse = !this.collapse
      }
    }
  }
}
</script>
<style lang="less">
.line-wrapper {
  display: flex;
  color: #f1f1f1;
  line-height: 20px;
  height: 20px;
  white-space: pre;
  // word-break: break-all;
  box-sizing: border-box;
  padding-left: 28px;

  &:hover {
    background-color: #444;
  }

  .line-number {
    min-width: 30px;
    text-align: right;
    color: #666;
    padding-right: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &.section-start {
    padding-left: 8px;
    cursor: pointer;

    .line-content {
      flex: 1;
    }

    .line-time {
      color: #fff;
      background: #999;
      margin-left: 8px;
      margin-right: 8px;
      border-radius: 4px;
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
