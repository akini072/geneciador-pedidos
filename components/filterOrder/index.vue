<template>
  <v-row class="filter">
    <v-col class="d-flex" cols="12" lg="2" >
      <v-select :items="items" label="Ordenar por"  background-color="#FFF4FE" filled dense/>
    </v-col>
    <v-col class="d-flex ml-lg-5 mr-3 ml-4" cols="10" lg="2">
      <v-row class="flex-nowrap align-baseline ">
        <span class="mr-2">De</span>
        <input-date label="Início"/>
      </v-row>
    </v-col>
    <v-col class="d-flex ml-4" cols="10" lg="2">
      <v-row class="flex-nowrap align-baseline">
        <span class="mr-2">Até</span>
        <input-date label="Fim"/>
      </v-row>
    </v-col>
    <v-col class="d-flex ml-auto" cols="12" lg="3">
      <v-text-field label="Pesquisar" append-icon="mdi-magnify" background-color="#FFF4FE" filled dense/>
    </v-col> 
  </v-row>
</template>

<script  src="./script.js" />
<style  src="./style.scss" lang="scss"/>