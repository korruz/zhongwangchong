<script setup lang="ts">
import { ref } from "vue";
import select_1 from "./components/Select_1.vue";
import select_2 from "./components/Select_2.vue";
import select_3 from "./components/Select_3.vue";

const place_options = [
  { value: 1, text: "材料大楼" },
  { value: 2, text: "西门" },
  { value: 3, text: "蕙园浴室" }
];
const selectedOption = ref(2);
</script>

<template>
  <div class="main">
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
      <select_1></select_1>
    </div>
    <div v-if="selectedOption === 2">
      <select_2></select_2>
    </div>
    <div v-if="selectedOption === 3">
      <select_3></select_3>
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
