<template>
  <div class="container">
    <a-card :title="`权限角色: ${role}`" :bordered="false">
      <a-list
        class="demo-loadmore-list"
        :loading="loading"
        item-layout="horizontal"
        :data-source="state.tableArr"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a-popconfirm title="Sure to delete?" @confirm="onDelete(item)">
                <a-button type="text" danger>删除该用户的此权限</a-button>
              </a-popconfirm>
            </template>
            <a-list-item-meta description="这是用户的uid,如要获取用户详细信息请至用户列表进行查询">
              <template #title>
                <a>{{ item }}</a>
              </template>
              <template #avatar>
                <a-avatar src="" />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { deleteRole, getRoleByUser } from '/@/api/auth';

  const route = useRoute();
  const loading = ref(false);
  let role = ref('');
  const state = reactive({
    tableArr: [],
    idGroup: [],
    userArr: [],
  });
  role.value = route.query.roleName ? (route.query.roleName as string) : '';

  onMounted(() => {
    fetchUserTable();
  });

  async function fetchUserTable() {
    loading.value = true;
    const params = {
      page_size: 99,
    };
    const res = await getRoleByUser(role.value, params);
    if (res.total_count !== 0) {
      state.tableArr = res.items;
    } else {
      state.tableArr = [];
    }
    loading.value = false;
  }
  async function onDelete(data: any) {
    let list: any = [];
    list.push(data.toString());
    state.idGroup = list;
    await deleteRole(role.value, state.idGroup);
    fetchUserTable();
  }
</script>
<style scoped>
  .wrapper {
    max-width: 1194px;
    margin: 1rem auto;
    overflow: hidden;
  }
</style>
