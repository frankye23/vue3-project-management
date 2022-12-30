<template>
  <div class="container">
    <a-spin :spinning="spinning">
      <a-card :title="state.cardTitle" :bordered="false">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="用户UID">
            <span>{{ userArr[0].uid }}</span>
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model:value="userArr[0].email" />
          </a-form-item>
          <a-form-item label="邮箱验证">
            <a-switch v-model:checked="userArr[0].verfiedEmail" />
          </a-form-item>
          <a-form-item label="电话">
            <a-input-group compact>
              <a-select
                show-search
                v-model:value="userArr[0].phone_code"
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
                v-model:value="userArr[0].phone"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="请输入用户手机号"
              />
            </a-input-group>
          </a-form-item>
          <a-form-item label="手机验证">
            <a-switch v-model:checked="userArr[0].verfiedPhone" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitUserForm">{{ state.cardConfirm }}</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { Form, message } from 'ant-design-vue';
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { editUser, getUser } from '/@/api/user';
  import countryCodeLists from '/@/utils/areacode/country-code.json';

  onMounted(() => {
    fetchUserInfo();
  });

  const route = useRoute();
  const router = useRouter();
  const spinning = ref(false);
  const state = reactive({
    cardTitle: '',
    cardConfirm: '',
  });
  const useForm = Form.useForm;
  const labelCol = { span: 6 };
  const wrapperCol = { span: 14 };
  const userId = route.params.id;
  const countryCodeList = ref(countryCodeLists);
  const userArr = reactive([
    {
      uid: '',
      email: '',
      verfiedEmail: false,
      phone_code: '',
      phone: '',
      verfiedPhone: false,
    },
  ]);
  const { resetFields, validate } = useForm(userArr[0]);

  // 获取用户详情
  async function fetchUserInfo() {
    spinning.value = true;
    if (userId !== 'new') {
      state.cardTitle = '编辑用户';
      state.cardConfirm = '更新';
      const data = await getUser(userId);
      userArr[0].email = data.email;
      userArr[0].phone = data.phone;
      userArr[0].phone_code = data.phone_code;
      userArr[0].uid = data.uid;
      userArr[0].verfiedEmail = data.verfied_email === 0 ? false : true;
      userArr[0].verfiedPhone = data.verfied_phone === 0 ? false : true;
    } else {
      state.cardConfirm = '提交';
      state.cardTitle = '创建用户';
      resetUserForm();
    }
    spinning.value = false;
  }
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const resetUserForm = () => {
    userArr[0].uid = '';
    userArr[0].email = '';
    userArr[0].verfiedEmail = false;
    userArr[0].phone_code = '';
    userArr[0].phone = '';
    userArr[0].verfiedPhone = false;
  };
  async function submitUserForm() {
    validate()
      .then(async () => {
        const { email, verfiedEmail, phone_code, phone, verfiedPhone } = userArr[0];
        const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
        if (email && !reg.test(email)) {
          message.error('邮箱格式不正确');
          return;
        }
        console.log(phone_code.slice(1));
        const item = [
          {
            email,
            verfied_email: verfiedEmail === false ? 0 : 1,
            phone_code: phone_code.slice(1),
            phone,
            verfied_phone: verfiedPhone === false ? 0 : 1,
          },
        ];
        await editUser(userId, item[0]);
        resetFields();
        router.push('/user/list');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const resetForm = () => {
    resetFields();
    router.push('/user/list');
  };
</script>
