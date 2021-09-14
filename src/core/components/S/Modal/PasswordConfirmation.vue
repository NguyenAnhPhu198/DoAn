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
      <CButton color="primary" @click="$emit('click-confirm', checkPassword())">
        {{ $t("Confirm") }}
      </CButton>
    </template>
  </TModal>
</template>

<script>
import mixinModal from "@/core/components/T/mixinModal";
import authenMixin from "@/workspaces/customer/mixins/authentication";
export default {
  mixins: [mixinModal, authenMixin],
  data() {
    return {
      password: "",
    };
  },
  methods: {
    checkPassword() {
      const userPassword = {
        password: this.password,
        currentEmail: this.auth.email,
      };
      this.$store
        .dispatch("auth.reAuthenticate", userPassword)
        .then(() => {});
    },
  },
};
</script>
