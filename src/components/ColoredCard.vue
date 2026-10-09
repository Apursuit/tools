<script setup lang="ts">
import type { Component } from 'vue';
import { useThemeVars } from 'naive-ui';

const props = defineProps<{ icon: Component; title: string }>();
const { icon, title } = toRefs(props);
const themeVars = useThemeVars();
</script>

<template>
  <c-card class="colored-card">
    <n-icon class="icon" size="40" :component="icon" />
    <n-h3 class="title">
      <n-ellipsis>{{ title }}</n-ellipsis>
    </n-h3>

    <div class="description">
      <n-ellipsis :line-clamp="2" :tooltip="false">
        <slot />
      </n-ellipsis>
    </div>
  </c-card>
</template>

<style lang="less" scoped>
.colored-card {
  background: v-bind('themeVars.primaryColorHover');
  color: #fff;
  border: none;

  .icon {
    opacity: 0.8;
  }

  .title {
    color: #fff;

    margin: 5px 0;
  }

  .description {
    opacity: 0.9;

    margin: 5px 0;

    ::v-deep(a) {
      color: inherit;
      text-decoration: underline;
      font-weight: bold;
      transition: color ease 0.2s;

      &:hover {
        color: rgb(20, 20, 20);
      }
    }
  }
}
</style>
