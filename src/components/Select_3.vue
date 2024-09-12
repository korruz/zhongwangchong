<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { ProductList } from '../types/productList_2.ts';

const headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36 Edg/128.0.0.0",
    "Host": "wx.hychong.com",
    "Cookie": "JSESSIONID=622A9C442D7502056004451020816535",
    "Accept": "*/*",
    "Connection": "keep-alive",
};

const params1 = [
    {
        "boxCode": "78080643",
    },
    {
        "boxCode": "84001789",
    },
    {
        "boxCode": "11007351",
    },
    {
        "boxCode": "41007997",
    },
    {
        "boxCode": "20007007",
    },
    {
        "boxCode": "99080650",
    },
    {
        "boxCode": "34080657",
    },
    {
        "boxCode": "74001223",
    },
    {
        "boxCode": "74003272",
    },
    {
        "boxCode": "04001770",
    },
    {
        "boxCode": "98001749",
    },
    {
        "boxCode": "64001606",
    },
    {
        "boxCode": "80088112",
    },
    {
        "boxCode": "99007809",
    },
    {
        "boxCode": "26001290",
    },
    {
        "boxCode": "75001719",
    },
    {
        "boxCode": "59001291",
    },
    {
        "boxCode": "15001771",
    },
    {
        "boxCode": "64003467",
    },
    {
        "boxCode": "43089460",
    },
    {
        "boxCode": "09089373",
    },
    {
        "boxCode": "51080603",
    },
    {
        "boxCode": "07089887",
    },
    {
        "boxCode": "00080591",
    },
    {
        "boxCode": "88080673",
    },
    {
        "boxCode": "04080671",
    },
    {
        "boxCode": "74080606",
    },
    {
        "boxCode": "79089837",
    },
    {
        "boxCode": "36003276",
    },
    {
        "boxCode": "07080533",
    },
    {
        "boxCode": "28001616",
    },
    {
        "boxCode": "81001619",
    },
    {
        "boxCode": "15080609",
    },
    {
        "boxCode": "93006087",
    },
    {
        "boxCode": "52080619",
    },
    {
        "boxCode": "69089510",
    },
    {
        "boxCode": "84080317",
    },
    {
        "boxCode": "43089028",
    },
    {
        "boxCode": "46009585",
    }
]

const params2 = [
    {
        "boxCode": "14088257",
    },
    {
        "boxCode": "54086466",
    },
    {
        "boxCode": "81088761",
    },
    {
        "boxCode": "12089912",
    },
    {
        "boxCode": "58089592",
    },
    {
        "boxCode": "78083444",
    },
    {
        "boxCode": "60089480",
    },
    {
        "boxCode": "24089564",
    },
    {
        "boxCode": "89086082",
    },
    {
        "boxCode": "31086879",
    },
    {
        "boxCode": "05083428",
    },
    {
        "boxCode": "04089587",
    },
    {
        "boxCode": "18089906",
    },
    {
        "boxCode": "85086596",
    },
    {
        "boxCode": "16086959",
    },
    {
        "boxCode": "37083571",
    },
    {
        "boxCode": "85080782",
    },
    {
        "boxCode": "74088127",
    },
    {
        "boxCode": "61086952",
    },
    {
        "boxCode": "08089487",
    },
    {
        "boxCode": "64089569",
    },
    {
        "boxCode": "25083493",
    },
    {
        "boxCode": "66083578",
    },
    {
        "boxCode": "33089549",
    },
    {
        "boxCode": "80089536",
    },
    {
        "boxCode": "56086805",
    },
    {
        "boxCode": "34083853",
    },
    {
        "boxCode": "13089656",
    },
    {
        "boxCode": "98083636",
    },
    {
        "boxCode": "67086995",
    },
    {
        "boxCode": "20083504",
    },
    {
        "boxCode": "16089711",
    },
    {
        "boxCode": "77086854",
    },
    {
        "boxCode": "01089420",
    },
    {
        "boxCode": "25083997",
    }
]

const data = ref<{ listindex: number, result: ProductList }[]>([{ listindex: 0, result: {} }]);
// const data: any = {};
const dataLoaded = ref(true);
function load_data_1() {
    data.value = [];
    dataLoaded.value = false;
    const requests = params1.map((param, index) => {
        const requestOptions = {
            method: 'GET',
            headers,
            url: `api2/order/prepareChargeOrder?boxCode=${param.boxCode}`,
        };

        return axios(requestOptions).then(response => {
            return { 'listindex': index + 1, result: response.data as ProductList };
        });
    });

    Promise.all(requests)
        .then(results => {
            // 由于 Promise.all 保证了顺序，我们可以直接赋值
            data.value = results;
            // 如果你想在此处进行额外的排序，也可以这样做
            data.value.sort((a: any, b: any) => a.listindex - b.listindex);
            dataLoaded.value = true;
        })
        .catch(error => {
            console.log('error', error);
        });
}

function load_data_2() {
    data.value = [];
    dataLoaded.value = false;
    const requests = params2.map((param, index) => {
        const requestOptions = {
            method: 'GET',
            headers,
            url: `api2/order/prepareChargeOrder?boxCode=${param.boxCode}`,
        };

        return axios(requestOptions).then(response => {
            return { 'listindex': index + 1, result: response.data as ProductList };
        });
    });

    Promise.all(requests)
        .then(results => {
            // 由于 Promise.all 保证了顺序，我们可以直接赋值
            data.value = results;
            // 如果你想在此处进行额外的排序，也可以这样做
            data.value.sort((a: any, b: any) => a.listindex - b.listindex);
            dataLoaded.value = true;
        })
        .catch(error => {
            console.log('error', error);
        });
}

</script>

<template>
    <div class="main">
        <div>从蕙园浴室门口那一侧开始计数</div>
        <div class="station_select">
            <button class="btn btn-warning station_select" v-on:click="load_data_1">1号充电站</button>
            <button class="btn btn-warning station_select" v-on:click="load_data_2">2号充电站</button>
        </div>
        <div class="detail">
            <div v-if="dataLoaded" class="databoard">
                <div v-for="list in data" :key="list.listindex">
                    <div v-if="list.listindex > 0" class="station">
                        <div class="d-inline p-2 m-2 text-bg-primary">{{ list.listindex }} 号充电桩 ({{
                            list.result.data?.boxCode
                            }})</div>
                        <div class="container text-center">
                            <div class="items row">
                                <div v-for="item in list.result.data?.connectors" class=" col">
                                    <div v-if="item.connectorStatus == 7">
                                        <button class="btn btn-secondary item">{{ item.connectorId }}, 正在使用</button>
                                    </div>
                                    <div v-if="item.connectorStatus == 4">
                                        <button class="btn btn-success item">{{ item.connectorId }}, 绿灯(4)</button>
                                    </div>
                                    <div v-if="item.connectorStatus == 5">
                                        <button class="btn btn-danger item">{{ item.connectorId }}, 损坏(5)</button>
                                    </div>
                                    <div v-if="item.connectorStatus == 11">
                                        <button class="btn btn-success item">{{ item.connectorId }}, 绿灯(11)</button>
                                    </div>
                                    <div v-if="item.connectorStatus == 9">
                                        <button class="btn btn-success item">{{ item.connectorId }}, 绿灯(9)</button>
                                    </div>
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
    </div>
</template>

<style scoped types="scss">
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .station_select {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .detail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 10px;
        flex-wrap: wrap;

        .databoard {
            width: 350px;

            .station {
                width: 350px;
                border-bottom: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);

                    .items {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        width: 350px;
                        gap: 5px;
                        justify-items: center;
                        align-items: center;

                        .item {
                            width: 150px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }
}
</style>
