import TButtonEdit from './Edit.vue'
import TButtonRemove from './Remove.vue'
import TButtonCreate from './Create.vue'
import TButtonEnter from './Enter.vue'
import TButtonQuickView from './QuickView.vue'
import TButtonClear from './Clear.vue'
import TButtonSave from './Save.vue'
import TButtonClose from './Close.vue'

export default {
  components: {
    TButtonEdit,
    TButtonRemove,
    TButtonCreate,
    TButtonEnter,
    TButtonQuickView,
    TButtonClear,
    TButtonSave,
    TButtonClose,
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
    savable: {
      type: Boolean,
      required: false,
      default: false,
    },
    closable: {
      type: Boolean,
      required: false,
      default: false,
    },
    dontHideWhenEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    showEdit() {
      this.setEditing(true);
    },
    hideEdit() {
      this.setEditing(false);
    },
    setEditing(show) {
      this.$emit('update:editing', show);
      this.editing = show;
    },
  },
}