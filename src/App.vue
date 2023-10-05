<script setup lang="ts">
import axios, { AxiosRequestConfig } from 'axios';
import { onMounted, ref } from 'vue';
import { ProductList } from './types/productList.ts';

const headers = {
  "User-Agent": "Mozilla/5.0 (Linux; Android 12; M2007J3SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 MMWEBID/8424 MicroMessenger/8.0.42.2460(0x28002A35) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64",
  "Host": "wx.jwnzn.com",
  "Cookie": "JSESSIONID=622A9C442D7502056004451020816535",
  "Accept": "/",
  "Connection": "keep-alive"
};

const params = [
  {
    "gpsId": "57196",
    "sn": "10753461759"
  },
  {
    "gpsId": "57197",
    "sn": "10753209841"
  },
  {
    "gpsId": "57198",
    "sn": "10753209672"
  },
  {
    "gpsId": "57199",
    "sn": "10753209837"
  },
  {
    "gpsId": "57200",
    "sn": "10753209495"
  },
  {
    "gpsId": "57201",
    "sn": "10753209527"
  },
  {
    "gpsId": "57203",
    "sn": "10753205214"
  }
]

let requestOptions: AxiosRequestConfig = {
  method: 'GET',
  headers,
  url: "api/njjwn/eleProductList.action?queryValue=gpsId%3A57201%3BdevType%3A2%3Bsn%3A10753209527%3B"
};
const data = ref<[{ listindex: number, value: ProductList[] }]>([{ listindex: 0, value: [] }]);
const dataLoaded = ref(false);

onMounted(() => {
  for (let i = 0; i < params.length; ++i) {
    requestOptions = {
      method: 'GET',
      headers,
      url: `api/njjwn/eleProductList.action?queryValue=gpsId%3A${params[i].gpsId}%3BdevType%3A2%3Bsn%3A${params[i].sn}%3B`
    }
    axios(requestOptions)
      .then(response => {
        let cur = response.data.list;
        data.value.push({ 'listindex': i, value: cur }); console.log(response.data.list); console.log(i); if (i == params.length - 1) {
          dataLoaded.value = true
        }
      })
      .catch(error => console.log('error', error));
  }
});

</script>

<template>
  <div>
    <div v-if="dataLoaded">
      <div v-for="(list, index) in data" :key="index">
        <div v-if="index > 0">
          <div>{{ list.listindex + 1 }} 号充电站</div>
          <div class="container">
            <div v-for="item in list.value" :key="item.id">
              <div v-if="item.status == '工作中'">
                <button class="btn btn-secondary">{{ item.name }}, {{ item.status }}</button>
              </div>
              <div v-else-if="item.status == '空闲'">
                <button class="btn btn-success">{{ item.name }}, {{ item.status }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>

  </div>
</template>

<style scoped types="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;

  .btn {
    align-content: center;
  }
}
</style>
