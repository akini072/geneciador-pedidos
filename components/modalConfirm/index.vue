<template>
  <v-dialog v-model="modalConfirm" max-width="300px">
    <v-card>
      <v-card-title>
        <p>{{ msg }}</p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="modalConfirm = false">Cancelar</v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="() => { $emit('confirm'), modalConfirm = false }"
        >Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src="./script.js" />