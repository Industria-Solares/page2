<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="calculation in calculations" :key="calculation.id">
      <v-expansion-panel-title>
        <v-icon icon="mdi-account" /> {{ calculation.first_name }} {{ calculation.last_name }} <v-spacer /> {{ formatDateTime(calculation.created_at) }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-icon icon="mdi-email" /> {{ calculation.email }}
        <v-divider />
        <v-list>
          <v-list-item>
            <v-list-item-title>Verfügbare Länge</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.available_length }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Verfügbare Breite</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.available_width }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modullänge</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_length }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulbreite</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_width }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulanzahl</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_count }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulpreis</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_price }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulleistung</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_power }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulausrichtung</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_alignment }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Modulneigungswinkel</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_angle }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Moduleffizienz</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_efficiency }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Mögliche Gesammtleistung</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.total_power }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Möglicher Ertrag (kWh/Jahr))</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.harvest_per_year }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Strompreis</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.current_price }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Möglicher Gewinn (€/Jahr)</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.yield_per_year }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Gesammtkosten (€)</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.total_cost }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Amortisationszeit (Jahre)</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.time_till_roi }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Lebenszeit (Jahre)</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.module_lifetime }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Mögliche Nettogewinn (€)</v-list-item-title>
            <v-list-item-subtitle>{{ calculation.total_yield }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>


<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://eefncycjrylkbalioskc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZm5jeWNqcnlsa2JhbGlvc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkwNTIsImV4cCI6MTk5MDM0NTA1Mn0.KiWwytF2Z5ipkI-xPMV2D4iGte6xdJxyF8YSQqIVWGQ')

const { data: calculations, error } = await supabase
  .from('calculations')
  .select('*')

function formatDateTime(data: string) {
  const date = new Date(data)
  return date.toLocaleString()
}
</script>
