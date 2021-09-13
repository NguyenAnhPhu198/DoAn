<template>
  <TModal
    :show="show"
    :size="size"
    @update:show="$emit('update:show', $event)"
    title="Password confirmation"
  >
    <TInputPassword
      :value="password"
      viewable
      label="Password"
      :inputOptions="{
        addLabelClasses: 'font-weight-bold',
      }"
      @update:value="password = $event"
    />
    <template #actions>
      <CButton
        color="primary"
        @click="$emit('click-confirm', password)"
      >
        {{ $t("Confirm") }}
      </CButton>
    </template>
  </TModal>
</template>

<script>
import mixinModal from "@/core/components/T/mixinModal";

export default {
  mixins: [mixinModal],
  data() {
    return {
      password: "",
    };
  },
};
</script>
