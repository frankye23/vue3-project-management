<template>
  <a-card>
    <div class="select-area clearfix">
      <div class="select-item left">
        <a-input v-model:value="uidValue" placeholder="请输入用户UID" allowClear />
      </div>
      <div class="select-item left">
        <a-input v-model:value="emailValue" placeholder="请输入用户邮箱" allowClear />
      </div>
      <div class="select-item left">
        <a-input-group compact>
          <a-select
            show-search
            v-model:value="countryCode"
            :filterOption="filterOption"
            style="width: 120px"
          >
            <a-select-option
              :value="item.country_code"
              v-for="(item, index) in countryCodeList"
              :key="index"
            >
              {{ item.country_code + ' ' + item.name }}
            </a-select-option>
          </a-select>
          <a-input
            style="width: 50%"
            v-model:value="phone"
            placeholder="请输入用户手机号"
            allowClear
          />
        </a-input-group>
      </div>
      <a-button type="primary" class="search-btn right" @click="searchUsers">搜索</a-button>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import countryCodeLists from '/@/utils/areacode/country-code.json';

  let uidValue = ref('');
  let emailValue = ref('');
  let countryCode = ref('+1');
  let phone = ref('');
  const countryCodeList = ref(countryCodeLists);
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  const emits = defineEmits(['fetchUserList']);
  const searchUsers = () => {
    emits('fetchUserList', uidValue.value, emailValue.value, phone.value);
  };
</script>

<style lang="less" scoped>
  .select-area {
    .select-item {
      margin-right: 10px;
    }
  }
</style>
