
<template>
  <div>
    <TModal
    title="create user account"
    :show ="show"
    @update:show="$emit('update:show', $event)">

    </TModal>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
</style>

