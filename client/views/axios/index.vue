<template>
  <div>
    <action code="brAction" name="百融" :params="params" :options="brActionOptions"></action>
    <action code="wsdinter" name="维士顿" :params="params" :options="wsdinterOptions"></action>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

import config from './config.js'
import Action from './action'

// const api = '/MODApis/Api/v2/InteractiveChart/json'

export default {
  components: {
    Chart,
    Action
  },

  data () {
    return {
      params: {
        name: null,
        idcard: null,
        accountId: null,
        bankid: null
      },
      result: []
    }
  },

  computed: {
    brActionOptions () {
      return Object.keys(config.brAction).filter((item) => {
        return item !== 'name'
      })
    },
    wsdinterOptions () {
      return Object.keys(config.wsdinter).filter((item) => {
        return item !== 'name'
      })
    }
  },

  methods: {
  },
  created () {
    this.config = config
    let params = window.Lockr.get('params')
    if (params) {
      this.params = params
    }
  }
}
</script>

<style scoped>
</style>
