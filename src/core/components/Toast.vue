<template>
  <div>
    <CToaster :autohide="timeout" position="bottom-right">
      <template v-for="(toast, i) in toasts">
        <CToast :key="i" :show="true">
          <template #header>
            <p v-if="!!toast.title" :class="getStyle(toast.type)">{{toast.title}}</p>
          </template>
          <template class="p-0">
            <TMessage v-if="!toast.title" :content="toast.message" :color="toast.type" style="overflow-x:auto" />
            <TMessage v-if="!!toast.title" :content="toast.message" style="overflow-x:auto" />
          </template>
        </CToast>
      </template>
    </CToaster>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Toast",
  computed: {
    ...mapGetters({ toasts: 'toasts.list', timeout: 'toasts.timeout' }),
  },
  methods: {
    getStyle(color) {
      return "w-100 m-0 text-" + color;
    },
  },
};
</script>
