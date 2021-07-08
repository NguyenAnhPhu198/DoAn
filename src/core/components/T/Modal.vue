<template>
  <CModal :show="show" @update:show="$emit('update:show', $event)">
    <template #header>
      <TMessage :content="title" capitalize />
      <TButtonClose
        class="py-0"
        @click="$emit('update:show', false)"
      />
    </template>
    <slot></slot>
    <template #footer>
      <slot name="actions">
        <TButtonCreate variant="outline" @click="$emit('click-create')" />
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
  },
};
</script>
