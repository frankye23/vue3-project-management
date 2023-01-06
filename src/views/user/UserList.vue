<template>
  <div class="container">
    <UserSelector class="mb-20" @fetch-user-list="handleUserList" />

    <div class="btns-area clearfix">
      <a-button
        type="primary"
        class="right"
        :disabled="selectedLength === 0"
        @click="onDeleteUsers"
      >
        批量删除
      </a-button>
    </div>

    <a-table
      :loading="loading"
      :row-selection="rowSelection"
      :data-source="state.userTable"
      :columns="columns"
      :scroll="{ x: 1500 }"
      :rowKey="(record) => record.id.toString()"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #phone="{ record }">
        <span v-if="record.phone_code && record.phone">
          {{ `+${record.phone_code} ${record.phone}` }}
        </span>
      </template>
      <template #operation="{ record }">
        <router-link :to="`/user/${record.id}`">编辑</router-link>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="state.userTable.length"
          title="确定删除该用户？"
          @confirm="onDelete(record.id)"
        >
          <a-button type="link" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, onMounted, createVNode, computed } from 'vue';
  import UserSelector from './components/UserSelector.vue';
  import { ColumnProps } from 'ant-design-vue/es/table/interface';
  import { delUser, delUsers, getUserList } from '/@/api/user';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { formatToDateTime } from '/@/utils/dateUtil';

  onMounted(() => {
    fetchUserList();
  });

  type Key = ColumnProps['key'];
  const loading = ref(false);
  const selectedLength = ref(0);

  // 筛选组件的搜索条件
  const search = reactive({
    uid: null,
    email: null,
    phone: null,
  });
  const state = reactive({
    userTable: [],
    selectedIds: [],
    modalTitle: '',
    modalConfirm: '',
    pageSize: 20,
    currentPage: 1,
    totalCount: 0,
  });

  // 表头显示
  const columns = [
    {
      title: 'UID',
      dataIndex: 'uid',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: '200px',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      slots: { customRender: 'phone' },
    },
    {
      title: '注册地址',
      dataIndex: 'register_place',
      width: '300px',
    },
    {
      title: '最后登录时间',
      dataIndex: 'last_login_time',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      fixed: 'right',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      state.selectedIds = selectedRows.map((e) => {
        return e.id;
      });
      selectedLength.value = selectedRows.length;
    },
    getCheckboxProps: (record: any) => ({
      id: record.id.toString(),
    }),
  };
  // 删除用户
  async function onDelete(id: any) {
    await delUser(id);
    await fetchUserList();
  }
  // 批量删除用户
  async function onDeleteUsers() {
    Modal.confirm({
      title: () => '是否删除所选的用户？',
      icon: () => createVNode(ExclamationCircleOutlined),
      okText: () => '确认',
      okType: 'danger',
      cancelText: () => '取消',

      async onOk() {
        await delUsers(`[${state.selectedIds.toString()}]`);
        await fetchUserList();
        selectedLength.value = 0;
      },
      onCancel() {
        selectedLength.value = 0;
      },
    });
  }
  // 筛选用户
  const handleUserList = (uid, email, phone) => {
    search.uid = uid;
    search.email = email;
    search.phone = phone;
    fetchUserList();
  };
  // 获取用户列表
  async function fetchUserList() {
    loading.value = true;
    const params = {
      uid: search.uid,
      email: search.email,
      phone: search.phone,
      page_size: state.pageSize,
      offset: (state.currentPage - 1) * state.pageSize,
    };
    // const data = await getUserList(params);
    // state.totalCount = data.total_count;
    // if (state.totalCount !== 0) {
    //   for (let i = 0; i < data.items.length; i++) {
    //     data.items[i].created_at = formatToDateTime(data.items[i].created_at);
    //     data.items[i].updated_at = formatToDateTime(data.items[i].updated_at);
    //     data.items[i].last_login_time = formatToDateTime(data.items[i].last_login_time);
    //   }
    //   state.userTable = data.items;
    // } else {
    //   state.userTable = [];
    // }
    state.userTable = [];
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
  const handleTableChange = (page) => {
    state.currentPage = page.current;
    state.pageSize = page.pageSize;
    fetchUserList();
  };
</script>
