<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
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
        "boxCode": "78086939",
    },
    {
        "boxCode": "52006822",
    },
    {
        "boxCode": "04083356",
    },
    {
        "boxCode": "85086318",
    },
    {
        "boxCode": "57089504",
    },
    {
        "boxCode": "27088759",
    },
    {
        "boxCode": "04089779",
    },
    {
        "boxCode": "08089664",
    },
    {
        "boxCode": "88083015",
    },
    {
        "boxCode": "12083983",
    },
    {
        "boxCode": "02083325",
    },
    {
        "boxCode": "71086359",
    },
    {
        "boxCode": "83083260",
    },
    {
        "boxCode": "77086079",
    },
    {
        "boxCode": "69089954",
    },
    {
        "boxCode": "65089625",
    },
    {
        "boxCode": "46086648",
    },
    {
        "boxCode": "83083321",
    },
    {
        "boxCode": "50086697",
    },
    {
        "boxCode": "10088109",
    },
    {
        "boxCode": "13083386",
    },
    {
        "boxCode": "22089464",
    },
    {
        "boxCode": "14086352",
    },
    {
        "boxCode": "09086047",
    },
    {
        "boxCode": "97083326",
    },
    {
        "boxCode": "94086368",
    },
    {
        "boxCode": "15088254",
    },
    {
        "boxCode": "38086289",
    },
    {
        "boxCode": "17089676",
    },
    {
        "boxCode": "95083706",
    },
    {
        "boxCode": "84089033",
    },
    {
        "boxCode": "42083380",
    },
    {
        "boxCode": "73088123",
    },
    {
        "boxCode": "03086970",
    },
    {
        "boxCode": "18083302",
    },
    {
        "boxCode": "78086341",
    },
    {
        "boxCode": "34086646",
    },
    {
        "boxCode": "73089619",
    },
    {
        "boxCode": "17083953",
    }
]


const data = ref<{ listindex: number, result: ProductList }[]>([{ listindex: 0, result: {} }]);

const dataLoaded = ref(true);

onMounted(() => {
    load_data();
});

function load_data() {
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

</script>

<template>
    <div class="main">
        <div>从外围到围墙顺序计数</div>
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
