<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-spacer style="width:650px"></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :search="search"
        :headers="headersTable"
        :items="orderData"
        :single-expand="true"
        :expanded.sync="expanded"
        mobile-breakpoint="0"
        item-key="_id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:item.delete="{item}">
          <v-icon @click="confirmDelete = true, idOrderCurrent = item._id">mdi-delete</v-icon>
        </template>
        <template v-slot:item.edit="{item}">
          <v-icon @click="updateOrderEvent(item._id)">mdi-pencil</v-icon>
        </template>
        <template v-slot:item.date="{item}">
          <v-chip :color="getColorDate(item.date)">{{ formatDate(item.date) }}</v-chip>
        </template>

        <template v-slot:expanded-item="{headers, item}">
          <td :colspan="headers.length -3">
            <v-container class="tableItem">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="(item, i) in item.order" :key="item._id">
                      <td>{{ i + 1 }}</td>
                      <td>{{ item }}</td>
                    </tr>
                    <tr v-if="item.streetAddress">
                      <td>
                        <v-icon>mdi-map-marker</v-icon>
                      </td>
                      <td>{{ item.streetAddress }}, {{ item.numberAddress }} - {{ item.districtAddress }}</td>
                    </tr>
                    <tr>
                      <td>
                        <v-icon>mdi-cash-multiple</v-icon>
                      </td>
                      <td>{{ item.payment }}</td>
                    </tr>
                    <tr>
                      <td>
                        <v-icon>mdi-phone</v-icon>
                      </td>
                      <td>{{ item.phone }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </td>
          <td :colspan="3">
            <v-btn
              color="info"
              class="ml-auto"
              @click="confirmFinish = true, idOrderCurrent = item._id"
            >Finalizar pedido</v-btn>
          </td>
        </template>
      </v-data-table>
      <!-- modal confirmar excluir -->
      <modal-confirm
        :modalConfirm="confirmDelete"
        @value="val => confirmDelete = val"
        @confirm="deleteOrderEvent(idOrderCurrent)"
        msg="Tem certeza que deseja excluir o pedido?"
      />
      <!-- modal confirmar finalizar pedido -->
      <modal-confirm
        :modalConfirm="confirmFinish"
        @value="val => confirmFinish = val"
        @confirm="finishOrder(idOrderCurrent)"
        msg="Tem certeza que deseja finalizar o pedido?"
      />
    </v-card>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" />