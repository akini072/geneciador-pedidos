<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>RECEITA</h2>
    </v-row>
    <v-data-table
      :headers="headersTable"
      :items="recipeData"
      mobile-breakpoint="0"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:body.append>
        <tr style="background-color:#f5f5f5">
          <td></td>
          <td></td>
          <td class="font-weight-medium">Total</td>
          <td>{{ recipeData.reduce((acc, { qtd }) => acc + qtd, 0) }}</td>
          <td>{{ formatValue(recipeData.reduce((acc, { subTotal }) => acc + parseFloat(subTotal.replace('R$', '')), 0)) }}</td>
          <td>{{ formatValue(recipeData.reduce((acc, { fee }) => acc + parseFloat(fee.replace('R$', '')), 0)) }}</td>
          <td class="success--text font-weight-medium">{{ formatValue(recipeData.reduce((acc, { total }) => acc + parseFloat(total.replace('R$', '')), 0)) }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss"/>