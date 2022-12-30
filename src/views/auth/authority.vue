<template>
  <div class="container">
    <div class="btns-area">
      <a-button type="primary" @click="addNewAuthority()">新增</a-button>
    </div>
    <a-table
      :loading="loading"
      :data-source="state.tableArr"
      :columns="columns"
      :rowKey="(record: any) => record.role"
    >
      <template #role="{ record }">
        <a>{{ record }}</a>
      </template>
      <template #operation="{ record }">
        <a-popconfirm
          v-if="state.tableArr.length"
          title="确定删除该权限？"
          @confirm="deleteRoleAuth(record)"
        >
          <a-button type="link" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal v-model:visible="addModal" title="添加权限" @ok="handleAdd" :model="newAuth">
      <div class="form-area">
        <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
          <a-form-item label="url">
            <a-input v-model:value="newAuth[0].data" placeholder="例: v1/admin/users" />
          </a-form-item>
          <a-form-item label="方法">
            <a-input v-model:value="newAuth[0].method" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { addAuth, deleteAuth, getAuthList } from '/@/api/auth';

  const route = useRoute();
  const addModal = ref(false);
  const loading = ref(false);
  let role = ref('');
  const state = reactive({
    tableArr: [],
    userArr: [],
    idGroup: [],
  });
  const newAuth = reactive([
    {
      role: '',
      data: '',
      method: '',
    },
  ]);
  role.value = route.query.roleName ? (route.query.roleName as string) : '';

  const columns = [
    {
      title: '接口url',
      dataIndex: 'data',
    },
    {
      title: '方法',
      dataIndex: 'method',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      fixed: 'right',
    },
  ];

  onMounted(() => {
    loadAuthTable();
  });

  async function loadAuthTable() {
    loading.value = true;
    const res = await getAuthList(role.value);
    state.tableArr = res.items;
    loading.value = false;
  }
  async function addNewAuthority() {
    addModal.value = true;
  }
  async function deleteRoleAuth(data: any) {
    let temp: any[] = [];
    temp.push(data);
    await deleteAuth(temp);
    loadAuthTable();
  }
  async function handleAdd() {
    newAuth[0].role = role.value;
    await addAuth(newAuth);
    addModal.value = false;
    loadAuthTable();
  }
</script>
