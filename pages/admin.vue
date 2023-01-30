<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="calculation in calculations" :key="calculation.id">
      <v-expansion-panel-title>
        <v-icon icon="mdi-account" /> {{ calculation.first_name }} {{ calculation.last_name }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-icon icon="mdi-email" /> {{ calculation.email }}
        <v-divider />
        <v-icon icon="mdi-calculator" /> {{ calculation }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://eefncycjrylkbalioskc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZm5jeWNqcnlsa2JhbGlvc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkwNTIsImV4cCI6MTk5MDM0NTA1Mn0.KiWwytF2Z5ipkI-xPMV2D4iGte6xdJxyF8YSQqIVWGQ')

const { data: calculations, error} = await supabase
  .from('calculations')
  .select('*')

</script>
