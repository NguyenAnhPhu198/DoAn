<template>
  <CRow>
    <CCol md="4">
      <TSelect
        label="Province"
        :options="provinces"
        :loading="provinces_fetching"
        @select="selectProvince"
        :value="provinces_selected"
      />
    </CCol>
    <CCol md="4">
      <TSelect
        label="District"
        :options="districts"
        :loading="districts_fetching"
        :value="districts_selected"
        @select="selectDistrict"
      />
    </CCol>
    <CCol md="4">
      <TSelect
        label="Ward"
        :options="wards"
        :loading="wards_fetching"
        :value="wards_selected"
        @select="selectWard"
      />
    </CCol>
    <CCol col="12">
      <CInput
        :label="$t('Address detail')"
        :value="address_detail"
        @change="$emit('update:address_detail', $event)"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    ward_id: {
      type: [String, Number],
      required: false,
    },
    address_detail: {
      type: String,
      required: false,
    },
  },
  created() {
    this.$store.dispatch("notification.provinces.fetch.if-first-time");
  },
  watch: {
    ward_id: {
      immediate: true,
      handler(id) {
        if (id) {
          this.$store.dispatch("notification.wards.detail.fetch-missing", id);
        } else {
          this.$store.commit("notification.provinces.detail.purge");
          this.$store.commit("notification.districts.detail.purge");
          this.$store.commit("notification.wards.detail.purge");
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      provinces: "notification.provinces.list",
      provinces_fetching: "notification.provinces.fetching",
      provinces_selected: "notification.provinces.detail",
      districts: "notification.districts.list",
      districts_fetching: "notification.districts.fetching",
      districts_selected: "notification.districts.detail",
      wards: "notification.wards.list",
      wards_fetching: "notification.wards.fetching",
      wards_selected: "notification.wards.detail",
    }),
  },
  methods: {
    selectProvince(province) {
      this.$store.commit("notification.provinces.select", province.id);
      this.$store.commit("notification.districts.purge");
      this.$store.commit("notification.wards.purge");
      this.$store.dispatch("notification.districts.push-query", {
        search: `province_id:${province.id}`,
      });
      this.$emit("update:ward_id", null);
    },
    selectDistrict(district) {
      this.$store.commit("notification.districts.select", district.id);
      this.$store.commit("notification.wards.purge");
      this.$store.dispatch("notification.wards.push-query", {
        search: `district_id:${district.id}`,
      });
      this.$emit("update:ward_id", null);
    },
    selectWard(ward) {
      this.$store.commit("notification.wards.select", ward.id);
      this.$emit("update:ward_id", ward.id);
    },
  },
};
</script>