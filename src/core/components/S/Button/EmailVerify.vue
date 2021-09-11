<template>
  <CLoadingButton color="primary" @click.native="$emit('click')">
    {{ $t("Email verify") }}
  </CLoadingButton>
</template>

