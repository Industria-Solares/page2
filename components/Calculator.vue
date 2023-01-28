<template>
  <v-label>Verfügbare Fläche</v-label>
  <v-row>
    <v-col cols="12" sm="6">
      <v-text-field v-model="availableLenght" :rules="numberRules" @input="calculate" type="number"
        label="Länge" variant="outlined">
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
      <v-text-field v-model="moduleAngle" :rules="angelRules" @input="calculate" type="number" label="Neigungswinkel"
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
      <v-text-field v-model="totalCost" :rules="numberRules" @input="calculate" type="number"
        label="Gesammtkosten (€)" variant="outlined">
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import efficiencyMatrix from './efficiency'

export default defineComponent({
  setup() {
    return {
      availableLenght: ref(null),
      availableWidth: ref(null),
      moduleLenght: ref(null),
      moduleWidth: ref(null),
      maxModulePower: ref(null),
      maxModuleCount: ref(0),
      moduleAlignment: ref(null),
      moduleAngle: ref(null),
      moduleEfficiency: ref(0),
      maxTotalPower: ref(0),
      maxHarvestPerYear: ref(0),
      currentPrice: ref(null),
      maxYieldPerYear: ref(0),
      totalCost: ref(null),
      timeTillROI: ref(0),
      moduleLifetime: ref(null),
      maxTotalYield: ref(0),
      alignmentOptions: [
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
      ],
      numberRules: [
        (v: number) => !!v || 'Dieses Feld ist erforderlich',
        (v: number) => v > 0 || 'Dieses Feld muss größer als 0 sein',
      ],
      angelRules: [
        (v: number) => !!v || 'Dieses Feld ist erforderlich',
        (v: number) => v >= 0 || 'Dieses Feld muss größer oder gleich 0 sein',
        (v: number) => v <= 90 || 'Dieses Feld muss kleiner oder gleich 90 sein',
      ],
    }
  },

  methods: {
    calculate() {
      const availableLenght = this.availableLenght ? this.availableLenght : 0
      const availableWidth = this.availableWidth ? this.availableWidth : 0
      const moduleLenght = this.moduleLenght ? this.moduleLenght : 0
      const moduleWidth = this.moduleWidth ? this.moduleWidth : 0
      const maxModulePower = this.maxModulePower ? this.maxModulePower : 0
      const moduleAlignment = this.moduleAlignment ? this.moduleAlignment : 0
      const moduleAngle = this.moduleAngle ? this.moduleAngle : 0
      const currentPrice = this.currentPrice ? this.currentPrice : 0
      const moduleLifetime = this.moduleLifetime ? this.moduleLifetime : 0
      const totalCost = this.totalCost ? this.totalCost : 0

      const maxModuleCountHorizontal = Math.floor(availableLenght / moduleLenght) * Math.floor(availableWidth / moduleWidth)
      const maxModuleCountVertical = Math.floor(availableLenght / moduleWidth) * Math.floor(availableWidth / moduleLenght)
      this.maxModuleCount = Math.max(maxModuleCountHorizontal, maxModuleCountVertical)
      const alignmentIndex = Math.floor(Math.abs(moduleAlignment) / 5)
      const angleIndex = Math.floor(moduleAngle / 5)
      this.moduleEfficiency = efficiencyMatrix[alignmentIndex][angleIndex]
      this.maxTotalPower = Math.floor(this.maxModuleCount * maxModulePower * (this.moduleEfficiency / 100) * 100) / 100
      this.maxHarvestPerYear = Math.floor(this.maxTotalPower * 1650 / 1000 * 100) / 100
      this.maxYieldPerYear = Math.floor(this.maxHarvestPerYear * currentPrice * 100) / 100
      this.timeTillROI = Math.floor(totalCost / this.maxYieldPerYear * 100) / 100
      this.maxTotalYield = Math.floor(this.maxYieldPerYear * (moduleLifetime - this.timeTillROI) * 100) / 100
    },
    clearIfZero(event: any) {
      if (event.target.value == 0) {
        event.target.value = ''
      }
    },
  },
})
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