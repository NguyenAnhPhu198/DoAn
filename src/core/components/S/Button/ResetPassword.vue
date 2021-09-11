<template>
  <CLoadingButton
    color="primary"
    timeout="1500"
    @click.native="$emit('click')"
  >
    {{ $t('Reset password') }}
  </CLoadingButton>
</template>

