<template>
  <TModal
    :show="show"
    :size="size"
    @update:show="$emit('update:show', $event)"
    title="Password confirmation"
    ><slot>
      <TInputPassword
        :value="value"
        show
        label="Password"
        :inputOptions="{
          addLabelClasses: 'font-weight-bold',
        }"
        @update:value="$emit('update:value', $event)"
      />
    </slot>
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
  props: {
    value: {
      type: String,
      required: false
    }
  }
};
</script>
