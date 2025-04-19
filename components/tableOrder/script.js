import {
  loadingOrder,
  updateOrder,
  deleteOrder
} from '../../services/order';

import modalConfirm from '../modalConfirm';

export default {
  components: {
    modalConfirm
  },
  data() {
    return {
      search: '',
      idOrderCurrent: '',
      confirmDelete: false,
      confirmFinish: false,
      headersTable: [{
          sortable: false,
          value: "edit"
        }, {
          text: "Código",
          value: "id"
        },
        {
          text: "Cliente",
          value: "client"
        },
        {
          text: "Quantidade",
          value: "qtd"
        },
        {
          text: "Total",
          value: "totalValue"
        },
        {
          text: "Entrega",
          value: "date"
        }, {
          sortable: false,
          value: "delete"
        },

      ],
      orderData: [],
      singleExpand: false,
      expanded: []
    }
  },
  methods: {
    totalValueOrder(unitValue, ordersNumber, deliveryFee) {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })

      return formatter.format(unitValue * ordersNumber + deliveryFee)
    },
    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
    async loadOrders() {
      this.itemsOrder = []
      try {
        await loadingOrder().then(res => {
          res.data.order.map((item, i) => {
            this.orderData.push({
              _id: item._id,
              id: i + 1,
              client: item.client,
              qtd: item.order.length,
              totalValue: this.totalValueOrder(item.unitValue, item.order.length, item.deliveryFee),
              date: item.deliveryDate,
              ...item
            });
          });
        });
      } catch (error) {
        throw error;
      }
    },
    updateOrderEvent(_id) {
      this.$router.push({
        name: 'createUpdateOrder',
        query: {
          id: _id
        }
      })
    },
    async deleteOrderEvent(_id) {
      try {
        await deleteOrder(_id).then(() => this.loadOrders())
      } catch (error) {
        throw error
      }
      this.disabled = false
    },
    async finishOrder(_id) {
      try {
        const data = {
          deliveryStatus: true,
          _id: _id
        }
        await updateOrder(data).then(() => this.loadOrders())
      } catch (error) {
        throw error
      }
    },
    getColorDate(date) {
      const now = new Date(); // Data de hoje
      const deliveryDate = new Date(date); // Outra data 
      const diff = Math.abs(now.getTime() - deliveryDate.getTime()); // Subtrai uma data pela outra
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

      if (now > deliveryDate) return 'error'
      if (days > 7) return 'success'
      if (days > 1) return 'warning'

    }
  },
  mounted() {
    this.loadOrders()
  }
}
