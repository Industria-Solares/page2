<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary-darken-1">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-img src="/page2/img/logo.png" />
        <v-spacer />
      </v-app-bar>
      <v-navigation-drawer color="primary" v-model="drawer">
        <v-list nav>
          <v-list-item>
            <NuxtLink to="/"><v-icon icon="mdi-home" /> Home</NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/calculator"><v-icon icon="mdi-calculator" /> Calculator</NuxtLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
const drawer = ref(false)
</script>

<style>
.v-list-item a {
  color: inherit;
  text-decoration: none;
}
</style>