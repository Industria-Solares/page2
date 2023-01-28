<template>
  <v-app :theme="theme">
    <v-layout>
      <v-navigation-drawer v-model="drawer">
        <v-list nav>
          <v-list-item>
            <NuxtLink to="/"><v-icon icon="mdi-home" /> Home</NuxtLink>
          </v-list-item>
          <v-list-item>
            <NuxtLink to="/calculator"><v-icon icon="mdi-calculator" /> Calculator</NuxtLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar floating>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-img src="/page2/img/logo.png" />
        <v-spacer />
        <v-btn @click="changeTheme">
          <v-icon :icon="theme === 'lightTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
const drawer = ref(true)
const theme = ref('lightTheme')

function changeTheme() {
  theme.value = theme.value === 'lightTheme' ? 'darkTheme' : 'lightTheme'
}
</script>

<style>
.v-list-item a {
  color: inherit;
  text-decoration: none;
}
</style>