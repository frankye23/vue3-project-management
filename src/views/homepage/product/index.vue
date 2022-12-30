<!--
 * @Author: your name
 * @Date: 2022-02-28 16:27:00
 * @LastEditTime: 2022-03-18 11:49:26
 * @LastEditors: your name
 * @Description: 产品列表
 * @FilePath: \apollo_backend\src\views\homepage\product\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="wrapper">
    <div class="buttonGroup">
      <a-button type="primary" style="margin-right: 3px">新增</a-button>
      <a-button type="primary">批量删除</a-button>
    </div>
    <a-table
      :row-selection="rowSelection"
      :data-source="dataSource"
      :columns="columns"
      :rowKey="(record: any) => record.miner_id"
    >
      <template #operation="{ record }">
        <router-link :to="`/miner/${record.miner_id}`">详情</router-link>
        <a-divider type="vertical" />
        <router-link :to="`/miner/${record.miner_id}`">描述</router-link>
        <a-divider type="vertical" />
        <router-link :to="`/miner/${record.miner_id}`">属性</router-link>
        <a-divider type="vertical" />
        <router-link :to="`/miner/${record.miner_id}`">编辑</router-link>
        <a-divider type="vertical" />
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.miner_id)"
        >
          <a-button type="text" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { ColumnProps } from 'ant-design-vue/es/table/interface';
  type Key = ColumnProps['key'];
  const columns = [
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: '商品名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      width: 100,
    },
    {
      title: '属性',
      dataIndex: 'attrname',
      key: 'attrname',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      fixed: 'right',
    },
  ];
  const dataSource = ref([
    {
      miner_id: 0,
      attr_id: '1',
      name: '商品1',
      desc: '这是商品1的描述',
      attrname: 0,
      date: '961208',
    },
  ]);
  function onDelete(id: any) {
    console.log('deleting product' + id);
  }
  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      id: record.id,
    }),
  };
</script>
<style>
  .buttonGroup {
    margin: 10px 3px;
  }
</style>
