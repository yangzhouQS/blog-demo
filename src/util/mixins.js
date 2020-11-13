import Vue from 'vue'

export default function mixins (...arg) {
  return Vue.extend({ mixins: arg })
}