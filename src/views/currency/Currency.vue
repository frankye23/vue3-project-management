<template>
  <div class="container">
    <div class="btns-area clearfix">
      <a-button type="primary" @click="addNewCurrency">添加币种</a-button>
      <a-button
        type="primary"
        class="right"
        :disabled="selectedLength === 0"
        @click="onDeleteCurrencies"
      >
        批量删除
      </a-button>
    </div>

    <a-table
      :loading="loading"
      :row-selection="rowSelection"
      :data-source="state.currencyTable"
      :columns="columns"
      :scroll="{ x: 1300 }"
      :rowKey="(record) => record.id"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #image="{ record }">
        <img class="coin-img" :src="`${aws_s3_url}${record.image_url}`" />
      </template>
      <template #name="{ record }">
        <span>{{ record.name.toUpperCase() }}</span>
      </template>
      <template #operation="{ record }">
        <a @click="editCurrencyInfo(record)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除该货币？" @confirm="onDelete(record.id)">
          <a-button type="link" danger>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal :title="state.modalTitle" v-model:visible="visible" :footer="null">
      <div class="form-area">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="币种名称" v-bind="validateInfos.name">
            <a-input style="width: 50%" v-model:value="currencyArr[0].name" />
          </a-form-item>
          <a-form-item label="币种价格(USD)" v-bind="validateInfos.price">
            <a-input-number style="width: 50%" v-model:value="currencyArr[0].price" :min="0" />
          </a-form-item>
          <a-form-item label="币种符号" v-bind="validateInfos.symbol">
            <a-input style="width: 50%" v-model:value="currencyArr[0].symbol" />
          </a-form-item>
          <a-form-item label="币种排序" v-bind="validateInfos.ranking">
            <a-input-number
              style="width: 50%"
              v-model:value="currencyArr[0].ranking"
              :min="0"
              :formatter="(value) => `$ ${value}`.replace(/[^\d]/g, '')"
              :parser="(value) => value.replace(/[^\d]/g, '')"
            />
          </a-form-item>
          <a-form-item label="是否可挖">
            <a-switch v-model:checked="currencyArr[0].is_active" />
          </a-form-item>
          <a-form-item label="是否启用">
            <a-switch v-model:checked="currencyArr[0].display" />
          </a-form-item>
          <a-form-item label="是否新币">
            <a-switch v-model:checked="currencyArr[0].is_new" />
          </a-form-item>
          <a-form-item label="货币图片">
            <a-upload
              :file-list="fileList"
              list-type="picture"
              :before-upload="beforeUpload"
              :customRequest="uploading"
              :remove="removeImg"
            >
              <a-button type="primary">
                <upload-outlined />
                点击上传
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="submitCurrencyForm">{{ state.modalConfirm }}</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">取消</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { Form, Modal } from 'ant-design-vue';
  import { ColumnProps } from 'ant-design-vue/es/table/interface';
  import { nanoid } from 'nanoid';
  import { computed, createVNode, onMounted, reactive, ref, toRaw } from 'vue';
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
  import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
  import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
  import {
    getCurrencyList,
    delCurrencies,
    editCurrency,
    addCurrency,
    delCurrency,
  } from '/@/api/currency';
  import { formatToDateTime } from '/@/utils/dateUtil';
  import { config } from '../../../config';

  onMounted(() => {
    fetchCurrencyList();
  });

  type Key = ColumnProps['key'];
  const useForm = Form.useForm;
  let imgKey = nanoid();
  const loading = ref(false);
  const search = reactive({
    name: null,
  });
  const state = reactive({
    modalTitle: '',
    modalConfirm: '',
    currencyTable: [],
    selectedIds: [],
    pageSize: 20,
    currentPage: 1,
    totalCount: 0,
  });
  let fileList = ref([]);
  const uploadFile = ref<any>();
  const aws_s3_url = config.aws_s3_url;
  let s3 = ref();
  s3.value = new S3Client({
    apiVersion: '2006-03-01',
    params: { Bucket: config.albumBucketName },
    region: config.bucketRegion,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: config.bucketRegion }),
      identityPoolId: config.IdentityPoolId,
    }),
  });
  const selectedLength = ref(0);
  const currencyId = ref(null);
  const visible = ref(false);
  const labelCol = { span: 6 };
  const wrapperCol = { span: 14 };
  const currencyArr = reactive([
    {
      name: '',
      price: 0,
      is_active: false,
      is_new: false,
      display: false,
      symbol: '',
      ranking: 0,
      imgUrl: '',
    },
  ]);
  const rulesRef = reactive({
    name: [{ required: true, message: '请输入货币名称' }],
    price: [{ required: true, message: '请输入货币价格' }],
    symbol: [{ required: true, message: '请输入货币符号' }],
    ranking: [{ required: true, message: '请输入货币排序' }],
  });
  const { resetFields, validate, validateInfos } = useForm(currencyArr[0], rulesRef);

  const columns = [
    {
      title: '币种图片',
      dataIndex: 'image',
      slots: { customRender: 'image' },
      width: '100px',
    },
    {
      title: '币种名称',
      dataIndex: 'name',
      slots: { customRender: 'name' },
      width: '100px',
      align: 'center',
    },
    {
      title: '币价(USD)',
      dataIndex: 'price',
    },
    {
      title: '是否可挖',
      dataIndex: 'is_active',
      align: 'center',
    },
    {
      title: '是否新币',
      dataIndex: 'is_new',
      align: 'center',
    },
    {
      title: '是否启用',
      dataIndex: 'display',
      align: 'center',
    },
    {
      title: '货币符号',
      dataIndex: 'symbol',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      width: '150px',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: '150px',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
      fixed: 'right',
      width: '150px',
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: Key[],
      selectedRows: { map: (arg0: (e: any) => any) => never[]; length: number },
    ) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      state.selectedIds = selectedRows.map((e: { id: any }) => {
        return e.id;
      });
      selectedLength.value = selectedRows.length;
    },
    getCheckboxProps: (record: any) => ({
      id: record.id,
    }),
  };

  async function fetchCurrencyList() {
    loading.value = true;
    const params = {
      name: search.name,
      page_size: state.pageSize,
      offset: (state.currentPage - 1) * state.pageSize,
    };
    const data = await getCurrencyList(params);
    state.totalCount = data.total_count;
    if (state.totalCount !== 0) {
      for (let i = 0; i < data.items.length; i++) {
        data.items[i].display = data.items[i].display === 0 ? '否' : '是';
        data.items[i].is_active = data.items[i].is_active === 0 ? '否' : '是';
        data.items[i].is_new = data.items[i].is_new === 0 ? '否' : '是';
        data.items[i].created_at = formatToDateTime(data.items[i].created_at);
        data.items[i].updated_at = formatToDateTime(data.items[i].updated_at);
      }
      state.currencyTable = data.items;
    } else {
      state.currencyTable = [];
    }
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
    fetchCurrencyList();
  };
  async function onDelete(id: any) {
    await delCurrency(id);
    await fetchCurrencyList();
  }

  // 批量删除币种
  async function onDeleteCurrencies() {
    Modal.confirm({
      title: () => '是否删除所选的币种？',
      icon: () => createVNode(ExclamationCircleOutlined),
      okText: () => '确认',
      okType: 'danger',
      cancelText: () => '取消',

      async onOk() {
        await delCurrencies(`[${state.selectedIds.toString()}]`);
        selectedLength.value = 0;
        fetchCurrencyList();
      },
      onCancel() {
        selectedLength.value = 0;
      },
    });
  }
  const resetCurrencyForm = () => {
    currencyArr[0].name = '';
    currencyArr[0].display = false;
    currencyArr[0].is_active = false;
    currencyArr[0].is_new = false;
    currencyArr[0].price = 0;
    currencyArr[0].ranking = 0;
    currencyArr[0].symbol = '';
    currencyArr[0].imgUrl = '';
    currencyId.value = null;
    fileList.value = [];
  };
  const addNewCurrency = () => {
    state.modalTitle = '添加货币';
    state.modalConfirm = '创建';
    resetCurrencyForm();
    visible.value = true;
  };
  const editCurrencyInfo = (data: any) => {
    state.modalTitle = '编辑货币';
    state.modalConfirm = '更新';
    fileList.value = [];
    visible.value = true;
    const { id, name, price, symbol, ranking, display, is_active, is_new, image_url } = toRaw(data);
    currencyId.value = id;
    currencyArr[0].name = name;
    currencyArr[0].display = display === '是' ? true : false;
    currencyArr[0].is_active = is_active === '是' ? true : false;
    currencyArr[0].is_new = is_new === '是' ? true : false;
    currencyArr[0].price = price;
    currencyArr[0].ranking = ranking;
    currencyArr[0].symbol = symbol;
    currencyArr[0].imgUrl = image_url;
    let resFileList: any = [];
    if (image_url) {
      resFileList.push({ url: aws_s3_url + image_url });
      fileList.value = resFileList;
    } else {
      fileList.value = [];
    }
  };
  // 图片上传
  const beforeUpload = (file: any) => {
    uploadFile.value = file;
  };
  async function uploading() {
    const params = {
      Bucket: config.albumBucketName,
      Key: imgKey,
      Body: uploadFile.value,
      CacheControl: 'max-age=259200',
    };
    const data = await s3.value.send(new PutObjectCommand(params));
    if (data) {
      currencyArr[0].imgUrl = imgKey;
      let resFileList: any = [];
      if (currencyArr[0].imgUrl) {
        resFileList.push({ url: aws_s3_url + imgKey });
        fileList.value = resFileList;
      }
    }
  }
  const removeImg = () => {
    fileList.value = [];
    currencyArr[0].imgUrl = '';
  };
  async function submitCurrencyForm() {
    validate().then(async () => {
      const { name, price, is_active, is_new, display, symbol, ranking, imgUrl } = currencyArr[0];
      const item = [
        {
          name,
          price,
          is_active: is_active === false ? 0 : 1,
          is_new: is_new === false ? 0 : 1,
          display: display === false ? 0 : 1,
          symbol,
          ranking,
          image_url: imgUrl,
        },
      ];
      if (currencyId.value) {
        await editCurrency(currencyId.value, item[0]);
      } else {
        await addCurrency(item);
      }
      resetFields();
      visible.value = false;
      await fetchCurrencyList();
    });
  }
  const resetForm = () => {
    resetFields();
    visible.value = false;
  };
</script>

<style lang="less" scoped>
  .container {
    .coin-img {
      width: 40px;
    }
  }
</style>
