import myHello from './my-hello.vue'

export default {
  components: { myHello },
  name: 'child',
  data () {
    return {}
  },
  mounted () {
    this.reload()
  },
  computed: {},
  methods: {
    reload () {
      this.getData()
    },
    getData () {
    },
    genDefaultScopedSlot (props) {
      console.log(this)
      debugger
      return this.$createElement('div', {
        class: {
          foo: true,
          baz: false
        }
      }, [])
    }
  },

  render (h) {
    var he = h('div', { domProps: { innerHTML: 'this child div' } });
    console.log(this)
    return this.$createElement('div', {
      scopedSlots: {
        default: this.genDefaultScopedSlot
      }
    }, [
      h(myHello,{
        style: {},
        props: {},
        scopedSlots:{
          top:(scope)=>{
            return h('span',"top")
          },
          bottom:(scope)=>{
            return h('span',"bottom")
          }
        }
      }),
      this.$slots.title,
      this.$slots.content
    ])
    // debugger
    /*return h('div',  [
      h('span',"name1"),
      h('span',"name2"),
      h('div','xsxs')
      // h('div',this.$scopedSlots.title({name:"李四"}))
      /!*this.$scopedSlots.name1({
        text: 'hello scope'
      }),*!/
    ])*/
  }
}
