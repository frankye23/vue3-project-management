<template>
  <div class="wrapper">
    <img v-if="picUrl" :src="picUrl" alt="avatar" />
    <a-button @click="getPic">点击</a-button>
    <a-upload
      v-model:file-list="fileList"
      name="avatar"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="true"
      :customRequest="uploading"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <loading-outlined v-if="loading" />
        <plus-outlined v-else />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { nanoid } from 'nanoid';
  import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
  import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
  import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

  let image_key = nanoid();
  const uploadFile = ref();
  const loading = ref<boolean>(false);

  const imageUrl = ref<string>('');
  const picUrl = ref<string>('');

  const handleChange = (info: FileInfo) => {
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  };
  const beforeUpload = (file: FileItem) => {
    console.log(file.type);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!');
    }

    uploadFile.value = file;
    console.log(uploadFile.value);
  };
  // 解开注释
  // const s3 = ref();
  // //将s3的调用放在s3初始化下方，否则会报错
  // // 以下的内容都需要填写
  // s3.value = new S3Client({
  //   apiVersion: '2006-03-01',
  //   // 这里填写bucket
  //   params: { Bucket: '' },
  //   // 填写地区
  //   region: '',
  //   credentials: fromCognitoIdentityPool({
  //     // 这里填写地区，
  //     client: new CognitoIdentityClient({ region: '' }),
  //     // 这里填写poolId
  //     identityPoolId: '',
  //   }),
  // });
  async function uploading() {
    const params = {
      // 填写bucket
      Bucket: '',
      Key: image_key,
      Body: uploadFile.value,
      CacheControl: 'max-age=259200',
    };
    const data = await S3.send(new PutObjectCommand(params));
    console.log(data);
    if (data) {
      handleSuccess(image_key);
    } else {
      return alert('There was an error uploading your photo');
    }
  }
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }
  function handleSuccess(res) {
    console.log(res);
    loading.value = false;
  }
  function getPic() {
    // amazon地址,xxx.s3.region.amazonaws.com,后一个填对应的Key
    picUrl.value = 'address' + 'picKey';
  }
</script>
<style>
  .wrapper {
    width: 96%;
    margin: 10px auto;
  }
</style>
