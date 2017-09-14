<template>
  <div>
    <action code="brAction" name="百融" :params="params" :options="brActionOptions"></action>
    <action code="wsdinter" name="维士顿" :params="params" :options="wsdinterOptions"></action>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

import Vue from 'vue'
import Message from 'vue-bulma-message'
import Notification from 'vue-bulma-notification'

import config from './config.js'
import Action from './action'

const NotificationComponent = Vue.extend(Notification)

const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

const MessageComponent = Vue.extend(Message)

const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}
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
    loadData () {
      this.isloading = true
      this.$http({
        url: `http://192.168.1.150:8080/zy-credit-app/brAction/${this.api}`,
        params: this.params
      }).then((response) => {
        this.isloading = false
        window.Lockr.set('params', this.params)
        if (response.data.code === '100010') {
          return openMessage({
            title: 'Warning',
            message: '超出当天访问次数!',
            type: 'warning'
          })
        }
        openMessage({
          title: 'Success',
          message: '请求成功!',
          type: 'success'
        })
        let arr = []
        for (let i in response.data) {
          if (!this.config.brAction[this.api].data[i]) {
            continue
          }
          arr.push({label: this.config.brAction[this.api].data[i], value: response.data[i]})
        }
        this.result = arr
      }).catch((error) => {
        this.isloading = false
        openNotification({
          title: 'Error',
          message: '发生错误!',
          type: 'danger'
        })
        console.log(error)
      })
    }
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
