<template>
  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="computedDateFormatted"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
  </v-menu>
</template>

<script src="./script.js"/>