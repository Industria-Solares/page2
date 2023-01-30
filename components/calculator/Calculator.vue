<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-select v-model="moduleSelected" @update:modelValue="selectModule" label="Modul" :items="moduleOptions"
        item-title="text" item-value="value" signle-line />
    </v-col>
  </v-row>
  <v-label>Verfügbare Fläche</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="availableLength" :rules="numberRules" @input="calculate" type="number" label="Länge (cm)"
        variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="availableWidth" :rules="numberRules" @input="calculate" type="number" label="Breite (cm)"
        variant="outlined" />
    </v-col>
  </v-row>
  <v-label>Modul Fläche</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="moduleLength" :rules="numberRules" @input="calculate" type="number" label="Länge (cm)"
        variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="moduleWidth" :rules="numberRules" @input="calculate" type="number" label="Breite (cm)"
        variant="outlined" />
    </v-col>
  </v-row>
  <v-label>Modul Leistung</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="modulePower" :rules="numberRules" @input="calculate" type="number"
        label="Leistung pro Modul (Watt)" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="moduleCount" type="number" label="Mögliche Modulanzahl" variant="outlined"
        :readonly="true">
      </v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-select v-model="moduleAlignment" @update:modelValue="calculate" label="Ausrichtung" :items="alignmentOptions"
        item-title="text" item-value="value" signle-line />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleAngle" :rules="angleRules" @input="calculate" type="number" label="Neigungswinkel"
        variant="outlined" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleEfficiency" :rules="numberRules" @input="calculate" type="number" label="Effizienz"
        variant="outlined" :readonly="true" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="totalPower" type="number" label="Mögliche Gesammtleistung (Watt)" variant="outlined"
        :readonly="true" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="harvestPerYear" type="number" label="Möglicher Ertrag (kWh/Jahr)" variant="outlined"
        :readonly="true" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-text-field v-model="currentPrice" :rules="numberRules" @input="calculate" type="number"
        label="Strompreis (€/kWh)" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="yieldPerYear" type="number" label="Möglicher Gewinn (€/Jahr)" variant="outlined"
        :readonly="true" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="totalCost" :rules="numberRules" @input="calculate" type="number" label="Gesammtkosten (€)"
        variant="outlined" />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-text-field v-model="timeTillROI" type="number" label="Amortisationszeit (Jahre)" variant="outlined"
        :readonly="true" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="moduleLifetime" :rules="numberRules" @input="calculate" type="number"
        label="Lebenszeit (Jahre)" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="4">
      <v-text-field v-model="totalYield" type="number" label="Mögliche Nettogewinn (€)" variant="outlined"
        :readonly="true" />
    </v-col>
  </v-row>
  <v-label>Angebot</v-label>
  <v-row v-if="offerRequested">
    <v-col cols="12" sm="6">
      <v-text-field ref="emailRef" v-model="email" :rules="emailRules" type="email" label="eMail" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-select v-model="salutation" label="Anrede" :items="salutationOptions" item-title="text" item-value="value"
        signle-line />
    </v-col>
  </v-row>
  <v-row v-if="offerRequested">
    <v-col cols="12" sm="6">
      <v-text-field v-model="firstName" :rules="nameRules" type="text" label="Vorname" variant="outlined" />
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="lastName" :rules="nameRules" type="text" label="Nachname" variant="outlined" />
    </v-col>
  </v-row>
  <v-row v-if="offerRequested">
    <v-col cols="12" sm="4">
      <v-btn color="primary" @click="requestOffer">Anfordern</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="4">
      <v-switch v-model="offerRequested" label="Angebot anfordern" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import efficiencyMatrix from './efficiency'


const moduleSelected: Ref<any> | Ref<null> = ref(null)
const availableLength = ref(null)
const availableWidth = ref(null)
const moduleLength = ref(null)
const moduleWidth = ref(null)
const modulePower = ref(null)
const modulePrice = ref(null)
const moduleCount = ref(0)
const moduleAlignment = ref(null)
const moduleAngle = ref(null)
const moduleEfficiency = ref(0)
const totalPower = ref(0)
const harvestPerYear = ref(0)
const currentPrice = ref(null)
const yieldPerYear = ref(0)
const totalCost: Ref<number> | Ref<null> = ref(null)
const timeTillROI = ref(0)
const moduleLifetime = ref(null)
const totalYield = ref(0)
const offerRequested = ref(false)
const email = ref(null)
const salutation = ref(null)
const firstName = ref(null)
const lastName = ref(null)

const moduleOptions = [
  { text: 'Benutzerdefiniert', value: null },
  { text: 'Luxor M120 / 365', value: { length: 175, width: 100, power: 365, price: 400.00, lifetime: 25 } },
  { text: 'Luxor M120 / 370', value: { length: 175, width: 100, power: 370, price: 425.00, lifetime: 25 } },
  { text: 'Luxor M120 / 375', value: { length: 175, width: 100, power: 375, price: 450.00, lifetime: 25 } },
  { text: 'Luxor M120 / 380', value: { length: 175, width: 100, power: 380, price: 475.00, lifetime: 25 } },
  { text: 'Luxor M120 / 385', value: { length: 175, width: 100, power: 385, price: 500.00, lifetime: 25 } },
]

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

const salutationOptions = [
  { text: 'Frau', value: 'Frau' },
  { text: 'Herr', value: 'Herr' },
  { text: 'Andere', value: 'Andere' },
]

const numberRules = [
  (v: number) => !!v || 'Dieses Feld ist erforderlich',
  (v: number) => v > 0 || 'Dieses Feld muss größer als 0 sein',
]

const angleRules = [
  (v: number) => !!v || 'Dieses Feld ist erforderlich',
  (v: number) => v >= 0 || 'Dieses Feld muss größer oder gleich 0 sein',
  (v: number) => v <= 90 || 'Dieses Feld muss kleiner oder gleich 90 sein',
]

const nameRules = [
  (v: string) => !!v || 'Dieses Feld ist erforderlich',
]

const emailRules = [
  (v: string) => !!v || 'Dieses Feld ist erforderlich',
  (v: string) => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein',
]

async function selectModule() {
  if (moduleSelected.value) {
    moduleLength.value = moduleSelected.value.length
    moduleWidth.value = moduleSelected.value.width
    modulePower.value = moduleSelected.value.power
    modulePrice.value = moduleSelected.value.price
    moduleLifetime.value = moduleSelected.value.lifetime
    calculate()
  } else {
    moduleLength.value = null
    moduleWidth.value = null
    modulePower.value = null
    modulePrice.value = null
    moduleLifetime.value = null
    calculate()
  }
}

async function calculate() {
  const _availableLength = availableLength.value ? availableLength.value : 0
  const _availableWidth = availableWidth.value ? availableWidth.value : 0
  const _moduleLength = moduleLength.value ? moduleLength.value : 0
  const _moduleWidth = moduleWidth.value ? moduleWidth.value : 0
  const _modulePower = modulePower.value ? modulePower.value : 0
  const _modulePrice = modulePrice.value ? modulePrice.value : 0
  const _moduleAlignment = moduleAlignment.value ? moduleAlignment.value : 0
  const _moduleAngle = moduleAngle.value ? moduleAngle.value : 0
  const _currentPrice = currentPrice.value ? currentPrice.value : 0
  const _moduleLifetime = moduleLifetime.value ? moduleLifetime.value : 0

  const moduleCountHorizontal = Math.floor(_availableLength / _moduleLength) * Math.floor(_availableWidth / _moduleWidth)
  const moduleCountVertical = Math.floor(_availableLength / _moduleWidth) * Math.floor(_availableWidth / _moduleLength)
  moduleCount.value = Math.max(moduleCountHorizontal, moduleCountVertical)

  const alignmentIndex = Math.floor(Math.abs(_moduleAlignment) / 5)
  const angleIndex = Math.floor(_moduleAngle / 5)
  moduleEfficiency.value = efficiencyMatrix[alignmentIndex][angleIndex]

  totalPower.value = Math.floor(moduleCount.value * _modulePower * (moduleEfficiency.value / 100) * 100) / 100
  harvestPerYear.value = Math.floor(totalPower.value * 1650 / 1000 * 100) / 100
  yieldPerYear.value = Math.floor(harvestPerYear.value * _currentPrice * 100) / 100
  if (modulePrice.value) totalCost.value = Math.floor(moduleCount.value * _modulePrice * 100) / 100

  const _totalCost = totalCost.value ? totalCost.value : 0
  timeTillROI.value = Math.floor(_totalCost / yieldPerYear.value * 100) / 100
  totalYield.value = Math.floor(yieldPerYear.value * (_moduleLifetime - timeTillROI.value) * 100) / 100
}

async function requestOffer() {
  const supabase = createClient('https://eefncycjrylkbalioskc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZm5jeWNqcnlsa2JhbGlvc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkwNTIsImV4cCI6MTk5MDM0NTA1Mn0.KiWwytF2Z5ipkI-xPMV2D4iGte6xdJxyF8YSQqIVWGQ')



  if (email.value && salutation.value && firstName.value && lastName.value) {
    // check if entry with given email exists
    const { error: fetchError, data: fetchData } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email.value)

    if (fetchError) {
      console.log('error', fetchError)
      return
    }

    let id = null

    if (fetchData.length > 0) {
      id = fetchData[0].id
    } else {

      const { error: contactError, data } = await supabase
        .from('contacts')
        .insert({
          email: email.value,
          salutation: salutation.value,
          first_name: firstName.value,
          last_name: lastName.value,
        })
        .select('id')

      if (contactError) {
        console.log('error', contactError)
        return
      }

      if (data.length > 0) {
        id = data[0].id
      }
    }

    const { error: calculationError } = await supabase
      .from('calculations')
      .insert({
        contact: id,
        available_length: availableLength.value,
        available_width: availableWidth.value,
        module_length: moduleLength.value,
        module_width: moduleWidth.value,
        module_power: modulePower.value,
        module_price: modulePrice.value,
        module_lifetime: moduleLifetime.value,
        module_alignment: moduleAlignment.value,
        module_angle: moduleAngle.value,
        current_price: currentPrice.value,
        module_count: moduleCount.value,
        module_efficiency: moduleEfficiency.value,
        total_power: totalPower.value,
        harvest_per_year: harvestPerYear.value,
        yield_per_year: yieldPerYear.value,
        total_cost: totalCost.value,
        time_till_roi: timeTillROI.value,
        total_yield: totalYield.value,
      })
    if (calculationError) {
      console.log('error', calculationError)
      return
    }
    await navigateTo('/')
  }
}
</script>

<style>
input[type='number'] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>