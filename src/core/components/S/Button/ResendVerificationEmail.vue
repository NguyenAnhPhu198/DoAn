<template>
  <CButton color="primary" @click="$emit('click')">
    {{ $t("Resend verification email") }}
  </CButton>
</template>