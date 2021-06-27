import TButtonEdit from './Edit.vue'
import TButtonRemove from './Remove.vue'
import TButtonCreate from './Create.vue'
import TButtonEnter from './Enter.vue'
import TButtonQuickView from './QuickView.vue'
import TButtonClear from './Clear.vue'

export default {
  components: {
    TButtonEdit,
    TButtonRemove,
    TButtonCreate,
    TButtonEnter,
    TButtonQuickView,
    TButtonClear,
  },
  props: {
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
    removable: {
      type: Boolean,
      required: false,
      default: false,
    },
    creatable: {
      type: Boolean,
      required: false,
      default: false,
    },
    enterable: {
      type: Boolean,
      required: false,
      default: false,
    },
    quickViewable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}