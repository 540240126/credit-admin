<template>
  <div class="tile is-ancestor" style="height: 100%;margin-right: 5px">
    <div class="tile is-parent is-10" style="flex: 1;width: 100%;">
      <article class="tile is-child box"
               style="word-break: break-all; overflow-y: auto; min-height: 450px">
        <p class="title control" :class="{'is-loading': isloading}">
          {{params.name}} 返回信息:
          <span class="subtitle help is-danger is-5">
            {{name}}
          </span>
        </p>
        <div v-for="i in result">
          <p>{{config[code][i.name].name}}</p>
          <table class="table is-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in i.data" :key="index">
                <td>
                  <a>{{item.label}}</a>
                </td>
                <td>
                  {{item.value}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <chart :type="'line'" :data="stockData" :options="options"></chart> -->
      </article>
      <article class="tile is-child box" style="flex: 0 0 auto">
        <ul>
          <li
            v-for="i in options"
            :key="i"
            style="user-select: none;">
            <input type="checkbox" :name="this.code" v-model="checked" :value="i" :id="i">
            <label :for="i" style="font-size: 16px; margin-right: 8px">{{config[code][i].name}}</label>
          </li>
        </ul>
      </article>
    </div>
    <!-- <div class="tile is-parent is-4">
      <article class="tile is-child box">
        <div class="block">
          <p class="title is-5">请求参数</p>
          <a class="link">
            <p class="control">
              <span class="select">
                <select v-model="api">
                  <option v-for="(i,index) in options"
                          :key="i"
                          :value="i">{{config[code][i].name}}</option>
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
          <div class="control is-horizontal" v-if="api === 'BankData'">
            <div class="control-label">
              <label class="label">银行卡号</label>
            </div>
            <div class="control is-fullwidth">
              <input class="input" type="text" v-model="params.bankid">
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
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'
import Notification from 'vue-bulma-notification'

import config from './config.js'

const NotificationComponent = Vue.extend(Notification)

const openNotification = (
  propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 4500,
    container: '.notifications'
  }
) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

const MessageComponent = Vue.extend(Message)

const openMessage = (
  propsData = {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 1500,
    container: '.messages'
  }
) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  props: ['code', 'name', 'params', 'options'],
  data () {
    return {
      api: this.options[0],
      result: [],
      isloading: false,
      checked: this.options
    }
  },
  computed: {},
  created () {
    this.config = config
  },
  methods: {
    loadAll () {
      this.result = []
      this.checked.forEach((item) => this.loadData(item))
    },
    loadData (api) {
      const code = this.code
      this.result = []
      this.isloading = true
      this.$http({
        url: `http://192.168.1.150:8080/zy-credit-app/${code}/${api}`,
        params: this.params
      })
        .then(response => {
          console.log(response)
          let data = response.data
          this.isloading = false
          window.Lockr.set('params', this.params)
          if (code === 'brAction' && (data.code === '100010' || data.code === '100002')) {
            return openMessage({
              title: 'Warning',
              message: data.msg,
              type: 'warning'
            })
          }
          if (code === 'wsdinter' && data.CODE !== '0' && data.CODE !== '200') {
            return openMessage({
              title: 'Warning',
              message: data.MESSAGE,
              type: 'warning'
            })
          }
          openMessage({
            title: 'Success',
            message: '请求成功!',
            type: 'success'
          })
          if (code === 'wsdinter') {
            // data = data.data || data.education || data.DATA
            const _data = data.data || data.judicialList
            if (typeof _data === 'string') {
              try {
                data = JSON.parse(_data)
              } catch (e) {
                data = {result: _data}
              }
            }
          }
          console.log(data)
          if (data instanceof Array) {
            let _data = {}
            data.forEach((item) => {
              for (let i in item) {
                _data[i] = item[i]
              }
            })
            data = _data
          }
          let arr = []
          for (let i in data) {
            // console.log(i, data[i], code, api)
            const formatter = this.config[code][api].formatter
            if (typeof formatter === 'function') {
              const label = formatter.call(this.config[code][api], i, data[i])
              if (!label) continue
              arr.push({ label: label[0], value: label[1] })
              continue
            }
            const item = this.config[code][api].data[i]
            if (!item) {
              // arr.push({ label: i, value: data[i] })
            } else {
              if (typeof item === 'object') {
                arr.push({ label: item.__name__, value: item[data[i]] ? item[data[i]] : data[i] })
              } else {
                arr.push({ label: item, value: data[i] })
              }
            }
          }
          this.result.push({name: api, data: arr})
        })
        .catch(error => {
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

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
