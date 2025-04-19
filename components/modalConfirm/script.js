export default {
  props: {
    modalConfirm: {
      type: Boolean,
      required: true
    },
    msg: {
      type: String,
      required: true
    }
  },
  watch: {
    modalConfirm: function () {
      this.$emit('value', this.modalConfirm)
    }
  }
}
