
<template>
  <div>
    <CCard>
      <CCardHeader>
        CoreUI Icons Pro
        <CBadge color="info">New</CBadge>
        <div class="card-header-actions ml-2">
          <a
            href="https://icons.coreui.io/icons"
            rel="noreferrer noopener"
            target="_blank"
            class="card-header-action"
          >
            <small class="text-muted">Icons here</small>
          </a>
        </div>
        <div class="card-header-actions">
          <a
            href="https://github.com/coreui/coreui-icons"
            rel="noreferrer noopener"
            target="_blank"
            class="card-header-action"
          >
            <small class="text-muted">Github</small>
          </a>
        </div>
      </CCardHeader>
    </CCard>
  </div>
</template>

<script>
export default {
  name: "CoreUIIcons",
  methods: {
    toKebabCase(str) {
      return str.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
    },
  },
};
</script>
