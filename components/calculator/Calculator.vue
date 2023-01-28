<template>
  <v-label>Verfügbare Fläche</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="availableLenght" :rules="numberRules" @input="calculate" type="number" label="Länge"
        variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="availableWidth" :rules="numberRules" @input="calculate" type="number" label="Breite"
        variant="outlined">
      </v-text-field>
    </v-col>
  </v-row>
  <v-label>Modul Fläche</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="moduleLenght" :rules="numberRules" @input="calculate" type="number" label="Länge"
        variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="moduleWidth" :rules="numberRules" @input="calculate" type="number" label="Breite"
        variant="outlined">
      </v-text-field>
    </v-col>
  </v-row>
  <v-label>Modul Leistung</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="maxModulePower" :rules="numberRules" @input="calculate" type="number"
        label="Leistung pro Modul (Watt)" variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="maxModuleCount" type="number" label="Mögliche Modulanzahl" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-select v-model="moduleAlignment" @update:modelValue="calculate" label="Ausrichtung" :items="alignmentOptions"
        item-title="text" item-value="value" signle-line></v-select>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleAngle" :rules="angleRules" @input="calculate" type="number" label="Neigungswinkel"
        variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleEfficiency" :rules="numberRules" @input="calculate" type="number" label="Effizienz"
        variant="outlined" :readonly="true">
      </v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="maxTotalPower" type="number" label="Mögliche Gesammtleistung (Watt)" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="maxHarvestPerYear" type="number" label="Möglicher Ertrag (kWh/Jahr)" variant="outlined"
        :readonly="true"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-text-field v-model="currentPrice" :rules="numberRules" @input="calculate" type="number"
        label="Strompreis (€/kWh)" variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="maxYieldPerYear" type="number" label="Möglicher Gewinn (€/Jahr)" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="totalCost" :rules="numberRules" @input="calculate" type="number" label="Gesammtkosten (€)"
        variant="outlined">
      </v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-text-field v-model="timeTillROI" type="number" label="Amortisationszeit (Jahre)" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleLifetime" :rules="numberRules" @input="calculate" type="number"
        label="Lebenszeit (Jahre)" variant="outlined">
      </v-text-field>
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="maxTotalYield" type="number" label="Mögliche Nettogewinn (€)" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import efficiencyMatrix from './efficiency'

import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://eefncycjrylkbalioskc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZm5jeWNqcnlsa2JhbGlvc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkwNTIsImV4cCI6MTk5MDM0NTA1Mn0.KiWwytF2Z5ipkI-xPMV2D4iGte6xdJxyF8YSQqIVWGQ')


const availableLenght = ref(null)
const availableWidth = ref(null)
const moduleLenght = ref(null)
const moduleWidth = ref(null)
const maxModulePower = ref(null)
const maxModuleCount = ref(0)
const moduleAlignment = ref(null)
const moduleAngle = ref(null)
const moduleEfficiency = ref(0)
const maxTotalPower = ref(0)
const maxHarvestPerYear = ref(0)
const currentPrice = ref(null)
const maxYieldPerYear = ref(0)
const totalCost = ref(null)
const timeTillROI = ref(0)
const moduleLifetime = ref(null)
const maxTotalYield = ref(0)

const alignmentOptions = [
  { text: 'Nord', value: 180 },
  { text: 'Nord-Nord-Ost', value: 160 },
  { text: 'Nord-Ost', value: 135 },
  { text: 'Ost-Nord-Ost', value: 115 },
  { text: 'Ost', value: 90 },
  { text: 'Ost-Süd-Ost', value: 70 },
  { text: 'Süd-Ost', value: 45 },
  { text: 'Süd-Süd-Ost', value: 25 },
  { text: 'Süd', value: 0 },
  { text: 'Süd-Süd-West', value: -25 },
  { text: 'Süd-West', value: -45 },
  { text: 'West-Süd-West', value: -70 },
  { text: 'West', value: -90 },
  { text: 'West-Nord-West', value: -115 },
  { text: 'Nord-West', value: -135 },
  { text: 'Nord-Nord-West', value: -160 },
]

const numberRules = [
  (v: number) => !!v || 'Dieses Feld ist erforderlich',
  (v: number) => v > 0 || 'Dieses Feld muss größer als 0 sein',
]

let angleRules = [
  (v: number) => !!v || 'Dieses Feld ist erforderlich',
  (v: number) => v >= 0 || 'Dieses Feld muss größer oder gleich 0 sein',
  (v: number) => v <= 90 || 'Dieses Feld muss kleiner oder gleich 90 sein',
]

function calculate() {
  const _availableLenght = availableLenght.value ? availableLenght.value : 0
  const _availableWidth = availableWidth.value ? availableWidth.value : 0
  const _moduleLenght = moduleLenght.value ? moduleLenght.value : 0
  const _moduleWidth = moduleWidth.value ? moduleWidth.value : 0
  const _maxModulePower = maxModulePower.value ? maxModulePower.value : 0
  const _moduleAlignment = moduleAlignment.value ? moduleAlignment.value : 0
  const _moduleAngle = moduleAngle.value ? moduleAngle.value : 0
  const _currentPrice = currentPrice.value ? currentPrice.value : 0
  const _moduleLifetime = moduleLifetime.value ? moduleLifetime.value : 0
  const _totalCost = totalCost.value ? totalCost.value : 0

  const maxModuleCountHorizontal = Math.floor(_availableLenght / _moduleLenght) * Math.floor(_availableWidth / _moduleWidth)
  const maxModuleCountVertical = Math.floor(_availableLenght / _moduleWidth) * Math.floor(_availableWidth / _moduleLenght)
  maxModuleCount.value = Math.max(maxModuleCountHorizontal, maxModuleCountVertical)

  const alignmentIndex = Math.floor(Math.abs(_moduleAlignment) / 5)
  const angleIndex = Math.floor(_moduleAngle / 5)
  moduleEfficiency.value = efficiencyMatrix[alignmentIndex][angleIndex]
  
  maxTotalPower.value = Math.floor(maxModuleCount.value * _maxModulePower * (moduleEfficiency.value / 100) * 100) / 100
  maxHarvestPerYear.value = Math.floor(maxTotalPower.value * 1650 / 1000 * 100) / 100
  maxYieldPerYear.value = Math.floor(maxHarvestPerYear.value * _currentPrice * 100) / 100
  timeTillROI.value = Math.floor(_totalCost / maxYieldPerYear.value * 100) / 100
  maxTotalYield.value = Math.floor(maxYieldPerYear.value * (_moduleLifetime - timeTillROI.value) * 100) / 100
}
</script>

<style scoped>
input[type='number'] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>