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
  // const aws_s3_url = 'https://dxpool.s3.ap-northeast-1.amazonaws.com/';
  const imageUrl = ref<string>('');
  const picUrl = ref<string>('');

  const handleChange = (info: FileInfo) => {
    // if (info.file.status === 'uploading') {
    //   loading.value = true;
    //   // return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (base64Url: string) => {
    //     console.log(base64Url);
    //     imageUrl.value = base64Url;
    //     loading.value = false;
    //   });
    // }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
    getBase64(info.file.originFileObj, (base64Url: string) => {
      console.log(base64Url);
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
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    uploadFile.value = file;
    console.log(uploadFile.value);
  };
  const s3 = ref();
  //将s3的调用放在s3初始化下方，否则会报错
  s3.value = new S3Client({
    apiVersion: '2006-03-01',
    params: { Bucket: 'dxpool' },
    // client: new CognitoIdentityClient({ region: 'ap-northeast-1' }),
    region: 'ap-northeast-1',
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: 'ap-northeast-1' }),
      identityPoolId: 'ap-northeast-1:c0769e44-22d9-4825-9bd5-fc80903eceec',
    }),
  });
  async function uploading() {
    const params = {
      Bucket: 'dxpool',
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
    //res.key用于对图片的请求
    // this.formData.icon = res.key;
    console.log(res);
    loading.value = false;
  }
  function getPic() {
    picUrl.value = 'https://dxpool.s3.ap-northeast-1.amazonaws.com/' + 'jK-euA4zDYCQKfnSU3v-a';
  }
  // const dataSource = [
  //   {
  //     key: '1',
  //     name: 'yedaf',
  //     age: 32,
  //     address: '西湖区湖底公园1号',
  //   },
  //   {
  //     key: '2',
  //     name: 'frank',
  //     age: 42,
  //     address: '西湖区湖底公园1号',
  //   },
  // ];
</script>
<style>
  .wrapper {
    width: 96%;
    margin: 10px auto;
  }
</style>
