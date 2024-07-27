<script setup lang="ts">
import { useRequest } from "../../hooks";
defineOptions({
  name: "HomePage",
});
const { api } = useRequest();

function callLogin() {
  api.accountControllerLogin({
    username: "admin",
    password: "admin",
    type: "account",
  });
}
</script>

<template>
  <a-space wrap>
    <a-button type="primary" @click="callLogin">Primary Button</a-button>
  </a-space>
</template>
