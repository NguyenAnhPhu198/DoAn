<template>
  <TModal
    :show="show"
    :size="size"
    @update:show="$emit('update:show', $event)"
    title="Password confirmation"
  >
    <TInputPassword
      :value="password"
      viewAble
      label="Password"
      :inputOptions="{
        addLabelClasses: 'font-weight-bold',
      }"
      @update:value="password = $event"
    />
    <slot name="actions" slot="actions" :creating="creating">
      <CButton
        :options="{ disabled: creating }"
        color="primary"
        @click="$emit('click-confirm', password)"
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
  data(){
    return {
      password: ''
    }
  },
};
</script>
