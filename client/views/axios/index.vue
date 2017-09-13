<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-8">
        <article class="tile is-child box" style="word-break: break-all">
        <p class="title control" :class="{'is-loading': isloading}">
          {{params.name}} 返回信息:
          <span class="subtitle help is-danger is-5">
            tips
          </span>
        </p>
        {{result}}
        <!-- <chart :type="'line'" :data="stockData" :options="options"></chart> -->
      </article>
      </div>
      <div class="tile is-parent is-4">
        <article class="tile is-child box">
          <div class="block">
            <p class="title is-5">请求参数</p>
            <a class="link">
              <p class="control">
                <span class="select">
                  <select v-model="api">
                    <option v-for="i in apiOptions" :key="i">{{i}}</option>
                  </select>
                </span>
              </p>
            </a>
          </div>
          <div class="block">
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">姓名</label>
              </div>
              <div class="control is-fullwidth">
                <input class="input" type="text" v-model="params.name">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">身份证号码</label>
              </div>
              <div class="control is-fullwidth">
                  <input class="input" type="text" v-model="params.idcard">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label">手机号</label>
              </div>
              <div class="control is-fullwidth">
                <input class="input" type="text" v-model="params.accountId">
              </div>
            </div>
            <div class="control is-horizontal">
              <div class="control-label">
                <label class="label"></label>
              </div>
              <div class="control">
                <button class="button is-primary" :class="{'is-loading': isloading}" @click="loadData">Query</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

import Vue from 'vue'
import Message from 'vue-bulma-message'
import Notification from 'vue-bulma-notification'

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
    Chart
  },

  data () {
    return {
      api: 'specialListc',
      apiOptions: [
        'specialListc',
        'applyLoanMon',
        'inforelation',
        'execution',
        'keyattribution',
        'telCheck',
        'idTwoz',
        'stabilityc',
        'telPeriod',
        'telStatus'
      ],
      params: {
        name: null,
        idcard: null,
        accountId: null
      },
      result: '',
      symbols: ['AAPL', 'MSFT', 'JNJ', 'GOOG'],
      periods: ['Day', 'Week', 'Month', 'Quarter', 'Year'],
      data: [],
      labels: [],
      isloading: false,
      options: {
        legend: { display: false },
        animation: { duration: 0 },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }
    }
  },

  computed: {
    stockData () {
      return {
        labels: this.labels,
        datasets: [{
          fill: false,
          lineTension: 0.25,
          data: this.data,
          label: 'Close price',
          pointBackgroundColor: '#1fc8db',
          pointBorderWidth: 1
        }]
      }
    }
  },

  methods: {
    loadData () {
      this.isloading = true
      this.$http({
        url: `http://192.168.1.150:8080/zy-credit-app/brAction/${this.api}`,
        // transformResponse: [(data) => {
        //   return JSON.parse(data.replace(/T00:00:00/g, ''))
        // }],
        params: this.params
      }).then((response) => {
        openMessage({
          title: 'Success',
          message: '请求成功!',
          type: 'success'
        })
        console.log(response)
        this.isloading = false
        this.result = JSON.stringify(response.data)
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
  }
}
</script>

<style scoped>
</style>
