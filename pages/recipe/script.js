import {
  loadingOrder
} from '../../services/order'

export default {
  data() {
    return {
      recipeData: [],
      headersTable: [{
          text: 'Data',
          value: 'date'
        }, {
          text: 'Cliente',
          value: 'client'
        }, {
          text: 'Pagamento',
          value: 'payment'
        }, {
          text: 'Quantidade',
          value: 'qtd'
        }, {
          text: 'SubTotal',
          value: 'subTotal'
        },
        {
          text: 'Frete',
          value: 'fee'
        }, {
          text: 'Total',
          value: 'total'
        },
      ]
    }
  },
  methods: {
    async loadOrders() {
      try {
        await loadingOrder().then(res => {
          res.data.order.map((item, i) => {
            this.recipeData.push({
              qtd: item.order.length,
              subTotal: this.formatValue(item.unitValue * item.order.length),
              fee: this.formatValue(item.deliveryFee),
              total: this.formatValue(item.unitValue * item.order.length + item.deliveryFee),
              date: this.formatDate(item.deliveryDate),
              ...item
            });
          });
        });
      } catch (error) {
        throw error;
      }
    },
    formatValue(value) {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })

      return formatter.format(value)
    },
    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    }
  },
  mounted() {
    this.loadOrders()
  }
}
