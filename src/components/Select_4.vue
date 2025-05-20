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
        "boxCode": "83001329",
    },
    {
        "boxCode": "99000929",
    },
    {
        "boxCode": "61007718",
    },
    {
        "boxCode": "31007710",
    },
    {
        "boxCode": "29007756",
    },
    {
        "boxCode": "65080066",
    },
    {
        "boxCode": "93080867",
    },
    {
        "boxCode": "22089916",
    },
    {
        "boxCode": "00007807",
    },
    {
        "boxCode": "18009588",
    }
]

const params2 = [
    {
        "boxCode": "68007084",
    },
    {
        "boxCode": "45001233",
    },
    {
        "boxCode": "72007803",
    },
    {
        "boxCode": "83007004",
    },
    {
        "boxCode": "69001297",
    },
    {
        "boxCode": "66080862",
    },
    {
        "boxCode": "17007750",
    },
    {
        "boxCode": "58080307",
    },
    {
        "boxCode": "30080044",
    },
    {
        "boxCode": "24006067",
    }
]

const params3 = [
    {
        "boxCode": "23001364",
    },
    {
        "boxCode": "29080932",
    },
    {
        "boxCode": "83080627",
    },
    {
        "boxCode": "61007308",
    },
    {
        "boxCode": "17080861",
    },
    {
        "boxCode": "65080050",
    },
    {
        "boxCode": "13007805",
    },
    {
        "boxCode": "20080058",
    },
    {
        "boxCode": "87080888",
    },
    {
        "boxCode": "75003537",
    }
]

const params4 = [
    {
        "boxCode": "57080933",
    },
    {
        "boxCode": "32007297",
    },
    {
        "boxCode": "45088039",
    },
    {
        "boxCode": "25080946",
    },
    {
        "boxCode": "43007264",
    },
    {
        "boxCode": "48001475",
    },
    {
        "boxCode": "20080881",
    },
    {
        "boxCode": "64001781",
    },
    {
        "boxCode": "69001709",
    },
    {
        "boxCode": "48009496",
    }
]

const params5 = [
    {
        "boxCode": "98007952",
    },
    {
        "boxCode": "31080633",
    },
    {
        "boxCode": "74089500",
    },
    {
        "boxCode": "32001477",
    },
    {
        "boxCode": "69007109",
    },
    {
        "boxCode": "58001704",
    },
    {
        "boxCode": "26007712",
    },
    {
        "boxCode": "95080938",
    },
    {
        "boxCode": "87080381",
    },
    {
        "boxCode": "70089282",
    }
]

const params6 = [
    {
        "boxCode": "68001630",
    },
    {
        "boxCode": "03007443",
    },
    {
        "boxCode": "22001708",
    },
    {
        "boxCode": "83088033",
    },
    {
        "boxCode": "22007059",
    },
    {
        "boxCode": "15080935",
    },
    {
        "boxCode": "95088097",
    },
    {
        "boxCode": "01080978",
    },
    {
        "boxCode": "19001449",
    },
    {
        "boxCode": "20006053",
    }
]

const params = [params1, params2, params3, params4, params5, params6];

const data = ref<{ listindex: number, result: ProductList }[]>([{ listindex: 0, result: {} }]);

const dataLoaded = ref(true);
function load_data(i: number) {
    data.value = [];
    dataLoaded.value = false;
    const requests = params[i].map((param: any, index: any) => {
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
        <div>从蕙园运动场那一侧开始计数</div>
        <div> 点击下方按钮选择充电站 </div>
        <div class="station_select">
            <button class="btn btn-warning " v-for="i in 6" v-on:click="load_data(i - 1)">{{ i }}号充电站</button>
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
                                        <button class="btn btn-success item">{{ item.connectorId }}, 绿灯(5)</button>
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
