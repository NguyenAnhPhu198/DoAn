<template>
  <CLoadingButton
    color="primary"
    @click.native="$emit('click')"
  >
    {{ $t('Reset password') }}
  </CLoadingButton>
</template>

