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
        "boxCode": "93089447", // 请求不成功?
    },
    {
        "boxCode": "00001320",
    },
    {
        "boxCode": "59001176",
    },
    {
        "boxCode": "42001393",
    },
    {
        "boxCode": "22080655",
    },
    {
        "boxCode": "41080365",
    },
    {
        "boxCode": "83003450",
    },
    {
        "boxCode": "50080002",
    },
    {
        "boxCode": "86003095",
    },
    {
        "boxCode": "51088056",
    },
    {
        "boxCode": "06086618",
    },
    {
        "boxCode": "43001779",
    },
    {
        "boxCode": "39001266",
    },
    {
        "boxCode": "28007781",
    },
    {
        "boxCode": "88001792",
    },
    {
        "boxCode": "81007863",
    }
]

const params2 = [
    {
        "boxCode": "32006848",
    },
    {
        "boxCode": "03007083",
    },
    {
        "boxCode": "38086491",
    },
    {
        "boxCode": "97007099",
    },
    {
        "boxCode": "57007886",
    },
    {
        "boxCode": "70007799",
    },
    {
        "boxCode": "95007008",
    },
    {
        "boxCode": "24007796",
    },
    {
        "boxCode": "35007050",
    },
    {
        "boxCode": "75089284",
    },
    {
        "boxCode": "17007058",
    },
    {
        "boxCode": "21009677",
    },
    {
        "boxCode": "77007834",
    },
    {
        "boxCode": "77001711",
    },
    {
        "boxCode": "55007747",
    },
    {
        "boxCode": "60001306",
    },
    {
        "boxCode": "01001714",
    },
    {
        "boxCode": "95007800",
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
        <div>从桔园餐厅那一侧开始计数</div>
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
