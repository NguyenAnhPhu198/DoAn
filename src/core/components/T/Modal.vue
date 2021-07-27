<template>
  <CModal :show="show" :size="size" @update:show="$emit('update:show', $event)">
    <template #header>
      <TMessage :content="title" capitalize />
      <TButtonClose class="py-0" @click="$emit('update:show', false)" />
    </template>
    <slot></slot>
    <template #footer>
      <slot name="actions" :creating="creating">
        <TButtonCreate
          :options="{ disabled: creating }"
          variant="outline"
          @click="$emit('click-create')"
        />
      </slot>
    </template>
  </CModal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      required: false,
    },
    creating: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
