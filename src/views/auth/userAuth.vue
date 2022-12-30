<template>
  <div class="container">
    <div class="buttonGroup">
      <a-button type="primary" style="margin-right: 3px" @click="addNewRole">新增</a-button>
    </div>
    <a-table
      :loading="loading"
      :data-source="state.tableArr"
      :columns="columns"
      :rowKey="(record: any) => record"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #role="{ record }">
        <a>{{ record }}</a>
      </template>
      <template #operation="{ record }">
        <router-link :to="`/auth/role?roleName=${record}`">用户</router-link>
        <a-divider type="vertical" />
        <router-link :to="`/auth/authority?roleName=${record}`">角色权限</router-link>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" title="添加角色" @ok="handleAdd" :model="newRole">
      <a-form :labelCol="{ span: 6 }" :wrapperCol="{ span: 14 }">
        <a-table
          :loading="usersLoading"
          :row-selection="rowSelection"
          :data-source="state.userList"
          :columns="userColumn"
          :rowKey="(record) => record.uid"
          :pagination="pagination"
          @change="handleTableChange"
        />
        <a-form-item label="名称">
          <a-input v-model:value="newRole[0].name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import { getRoleList, addRole } from '/@/api/auth';
  import { getUserList } from '/@/api/user';
  import { ColumnProps } from 'ant-design-vue/es/table/interface';

  type Key = ColumnProps['key'];

  const loading = ref(false);
  const usersLoading = ref(false);
  const state = reactive({
    tableArr: [],
    userList: [],
    idGroup: [],
    pageSize: 20,
    currentPage: 1,
    totalCount: 0,
  });
  const visible = ref(false);
  const newRole = reactive([
    {
      name: '',
    },
  ]);
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'role',
      slots: { customRender: 'role' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      fixed: 'right',
      width: '200px',
    },
  ];
  const userColumn = [
    {
      title: 'UID',
      dataIndex: 'uid',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
  ];

  onMounted(() => {
    loadTableData();
  });
  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      state.idGroup = selectedRows.map((item) => {
        return item.uid.toString();
      });
    },
    getCheckboxProps: (record: any) => ({
      miner_id: record.miner_id,
    }),
  };
  async function loadTableData() {
    loading.value = true;
    const params = {
      page_size: state.pageSize,
      offset: (state.currentPage - 1) * state.pageSize,
    };
    const data = await getRoleList(params);
    state.tableArr = data.items;
    state.totalCount = data.total_count;
    loading.value = false;
  }
  // 分页器
  const pagination = computed(() => ({
    total: state.totalCount,
    current: state.currentPage,
    pageSize: state.pageSize,
    showTotal: (total: any) => `总共 ${total} 项`,
    defaultPageSize: 20,
    pageSizeOptions: ['20', '30', '50', '100'],
    showSizeChanger: true, // 是否显示pagesize选择
    showQuickJumper: true, // 是否显示跳转窗
  }));
  const handleTableChange = (page: any) => {
    state.currentPage = page.current;
    state.pageSize = page.pageSize;
    !visible.value && loadTableData();
    visible.value && fetchUsers();
  };
  const fetchUsers = () => {
    const params = {
      page_size: state.pageSize,
      offset: (state.currentPage - 1) * state.pageSize,
    };
    usersLoading.value = true;
    getUserList(params).then((res) => {
      state.totalCount = res.total_count;
      if (res.total_count !== 0) {
        state.userList = res.items;
      } else {
        state.userList = [];
      }
      usersLoading.value = false;
    });
  };
  async function addNewRole() {
    visible.value = true;
    fetchUsers();
  }
  async function handleAdd() {
    if (newRole[0].name === '') {
      message.warning('权限名称不能为空');
      return;
    }
    await addRole(newRole[0].name, state.idGroup);
    visible.value = false;
    loadTableData();
  }
</script>
<style scoped>
  .buttonGroup {
    margin: 10px 3px;
  }
</style>
