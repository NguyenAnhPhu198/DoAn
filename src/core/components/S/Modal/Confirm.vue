<template>
  <TModal
    :show="show"
    :size="size"
    @update:show="$emit('update:show', $event)"
    :title="title"
    ><slot></slot>
    <slot name="actions" slot="actions" :creating="creating">
      <CButton
        :options="{ disabled: creating }"
        color="primary"
        @click="$emit('click-confirm')"
      >
        {{ $t("Confirm") }}
      </CButton>
    </slot>
  </TModal>
</template>

<script>
import mixinModal from "@/core/components/T/mixinModal";

export default {
  mixins: [mixinModal],
};
</script>
