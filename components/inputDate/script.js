export default {
  props: {
    label: {
      type: String
    },
    date: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  data() {
    return {
      menu: false
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date: function () {
      this.$emit('date', this.date)
    }
  },
  methods: {
    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
  },
  mounted() {
    this.$emit('date', this.date)
  }
}
