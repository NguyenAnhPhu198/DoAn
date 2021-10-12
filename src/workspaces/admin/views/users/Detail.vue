<template>
  <div>
    <CRow class="mb-4">
      <CCol sm="6" md="6" lg="6">
        <CCard class="h-100">
          <CCardHeader>
            <TMessage class="pb-2" content="User information" bold />
          </CCardHeader>
          <CCardBody>
            <CRow class="mb-4">
              <CCol col="12">
                <TTableAsForm
                  :title="$t('User detail')"
                  :data="user"
                  :fields="detailFields"
                >
                  <template #id="{ value }">
                    <TMessage :content="value" noTranslate />
                  </template>
                </TTableAsForm>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="6" md="6" lg="6">
        <CCard class="h-100">
          <CCardHeader>
            <TMessage
              class="d-inline-flex mr-2"
              content="Role assignment"
              bold
            />
            <div class="float-right">
              <TButtonSave @click="updateRole" variant="outline" />
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow class="mb-4">
              <CCol col="12">
                <TSelect
                  label="Role"
                  :options="role"
                  :loading="role_fetching"
                  :value="role_selected"
                  @select="selectRole"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      detailFields: [
        { key: "id", label: "ID" },
        { key: "email", label: "Email" },
        { key: "name", label: "Name" },
        { key: "tel", label: "Tel" },
        { key: "role_id", label: "Role" },
        { key: "created_at", label: "Created at" },
        { key: "updated_at", label: "Latest update" },
      ],
    };
  },
  created() {
    if (this.id) {
      this.$store.dispatch("auth.users.detail.fetch", this.id).then(() => {
        this.$store.commit("auth.roles.select", this.user.role_id);
      });
    }
    this.$store.dispatch("auth.roles.fetch.if-first-time");
  },
  computed: {
    ...mapGetters({
      user: "auth.users.detail",
      role: "auth.roles.list",
      role_fetching: "auth.roles.fetching",
      role_selected: "auth.roles.detail",
    }),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    selectRole(role) {
      this.$store.commit("auth.roles.select", role.id);
    },
    updateRole() {
      this.$store.dispatch("auth.users.update", {
        id: this.id,
        attributes: { role_id: this.role_selected.id },
      });
    },
  },
};
</script>
