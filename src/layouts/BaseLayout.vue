<template>
  <v-app id="inspire">
    <v-app-bar class="bg-brown-lighten-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ props.title }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item :to="{ name: 'DressPage' }" title="입어볼래?" link></v-list-item>
        <v-list-item :to="{ name: 'CartPage' }" title="장바구니" link></v-list-item>
        <v-list-group value="마이페이지">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="마이페이지"></v-list-item>
          </template>
          <v-list-item :to="{ name: 'OrderListPage' }" value="주문내역" title="주문내역" link></v-list-item>
          <v-list-item :to="{ name: 'MyProfilePage' }" value="회원정보" title="회원정보" link></v-list-item>
          <v-list-item :to="{ name: 'QnAListPage' }" value="Q&A" title="Q&A" link></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-brown-lighten-4">
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
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@400&display=swap');

  * {
    font-family: 'Noto Sans KR';
  }
</style>
