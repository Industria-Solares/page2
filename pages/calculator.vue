<template>
  <Calculator />
  <v-btn color="primary" @click="addContact">Add Contact</v-btn>
</template>


<script lang="ts" setup>
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://eefncycjrylkbalioskc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZm5jeWNqcnlsa2JhbGlvc2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ3NjkwNTIsImV4cCI6MTk5MDM0NTA1Mn0.KiWwytF2Z5ipkI-xPMV2D4iGte6xdJxyF8YSQqIVWGQ'
const supabase = createClient(supabaseUrl, supabaseKey)

async function addContact() {
  const { error } = await supabase
    .from('contacts')
    .insert({
      first_name: 'Test',
      last_name: 'Test',
      city: 'Test',
      zipcode: 'Test',
      street: 'Test',
      street_no: 'Test',
      email: 'Test',
      phone: 'Test',
    })
}

</script>
