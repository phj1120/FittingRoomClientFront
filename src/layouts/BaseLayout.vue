<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ props.title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="menu in menus" :key="menu.name" :to="{ name: menu.name }" link>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-1">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import {ref} from "vue";


  const props = defineProps(['title'])
  const drawer = ref(false)
  const menus = ref([
    {title: '입어볼래?', name: 'DressPage'},
    {title: '장바구니', name: 'CartPage'},
    {title: '마이페이지', name: 'MyPage'},
  ])
</script>

<style scoped>

</style>
