<template>
  <v-app :theme="theme">
    <v-app-bar title="Industria Solares">
      <v-spacer></v-spacer>
      <v-btn @click="changeTheme">
        <v-icon :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  const theme = ref('light')

  function changeTheme () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>
