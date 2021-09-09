<template>
  <CModal :show="show" :size="size" @update:show="$emit('update:show', $event)">
    <template #header>
      <TMessage :content="title" capitalize />
      <TButtonClose class="py-0" @click="$emit('update:show', false)" />
    </template>
    <slot></slot>
    <template #footer>
      <slot name="actions">
        <SButtonConfirmChangeEmail
          color="primary"
          @click="$emit('click-create')"
          content="Confirm"
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
  },
};
</script>
