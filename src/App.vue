<script setup lang="ts">
import { ref } from "vue";
import Select_1 from "./components/Select_1.vue";
import Select_2 from "./components/Select_2.vue";
import Select_3 from "./components/Select_3.vue";
import Select_4 from "./components/Select_4.vue";
import Select_5 from "./components/Select_5.vue";

const place_options = [
  { value: 1, text: "材料大楼" },
  { value: 2, text: "西门" },
  { value: 3, text: "蕙园浴室" },
  { value: 4, text: "蕙园运动场" },
  { value: 5, text: "理工楼" },
];
const selectedOption = ref(1);
</script>

<template>
  <div class="main">
    <div>使用帮助/问题解答 QQ 群: 257302835</div>
    <div>
      <div class="form-floating">
        <select class="form-select" id="floatingSelect" v-model="selectedOption"
          aria-label="Floating label select example">
          <option v-for="option in place_options" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
        <label for="floatingSelect">场地选择</label>
      </div>
    </div>
    <div v-if="selectedOption === 1">
      <Select_1></Select_1>
    </div>
    <div v-if="selectedOption === 2">
      <Select_2></Select_2>
    </div>
    <div v-if="selectedOption === 3">
      <Select_3></Select_3>
    </div>
    <div v-if="selectedOption === 4">
      <Select_4></Select_4>
    </div>
    <div v-if="selectedOption === 5">
      <Select_5></Select_5>
    </div>
  </div>
</template>

<style scoped types="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  flex-wrap: wrap;
}
</style>
