<template>
  <div style="display: flex; flex-wrap: wrap;">
    <article
      class="tile is-child box"
      style="display: flex;word-break: break-all; overflow-y: auto; flex: 1 1 100%;margin-bottom: 10px !important">
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label"></label>
        </div>
        <div class="control is-fullwidth">
          <select class="select" v-model="selectUser" @change="onTestUserChange">
            <option
              v-for="i in testUser"
              :value="i.name">
              {{i.name}}
            </option>
          </select>
        </div>
      </div>
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
          <label class="label">银行卡号</label>
        </div>
        <div class="control is-fullwidth">
          <input class="input" type="text" v-model="params.bankid">
        </div>
      </div>
      <div class="control is-horizontal" style="align-self: center">
        <div class="control-label">
          <label class="label"></label>
        </div>
        <div class="control">
          <button class="button is-primary" :class="{'is-loading': isloading}" @click="loadData">Query</button>
        </div>
      </div>
    </article>
    <article
      class="tile is-child box"
      style="display: flex;word-break: break-all; overflow-y: auto; flex: 1 1 100%;margin-bottom: 10px !important">
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">驾驶证号</label>
        </div>
        <div class="control is-fullwidth">
          <input class="input" type="text" v-model="params.drivercard">
        </div>
      </div>
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">初次领证日期</label>
        </div>
        <div class="control is-fullwidth">
          <input class="input" type="text" v-model="params.drivertime">
        </div>
      </div>
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">档案单号</label>
        </div>
        <div class="control is-fullwidth">
          <input class="input" type="text" v-model="params.driverdabh">
        </div>
      </div>
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">准驾车型</label>
        </div>
        <div class="control is-fullwidth">
          <input class="input" type="text" v-model="params.driverzjcx">
        </div>
      </div>
    </article>
    <action
      ref="brAction"
      code="brAction"
      name="百融"
      :params="params"
      :options="brActionOptions"></action>
    <action
      ref="wsdinter"
      code="wsdinter"
      name="维士顿"
      :params="params"
      :options="wsdinterOptions"
      style="margin-right: 0px"
      ></action>
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
      testUser: [
        {
          name: '黄国升',
          idcard: '440923198410303437',
          accountId: '13922965003',
          bankid: '62145624000218811'
        },
        {
          name: '崔振华',
          idcard: '430482198903106870',
          accountId: '15914064589',
          bankid: '62145624000218811'
        },
        {
          name: '江帆',
          idcard: '440902198107220135',
          accountId: '13686856918',
          bankid: '62145624000218811'
        }
      ],
      params: {
        name: null,
        idcard: null,
        accountId: null,
        bankid: null,
        drivercard: null,
        drivertime: null,
        driverdabh: null,
        driverzjcx: null
      },
      selectUser: '',
      result: [],
      isloading: false
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
      this.$refs.brAction.loadAll()
      this.$refs.wsdinter.loadAll()
    },
    onTestUserChange (event) {
      const id = this.testUser.findIndex((item) => {
        return item.name === this.selectUser
      })
      this.params = this.testUser[id]
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
  .control.is-horizontal {
    margin-bottom: 0px;
    margin-right: 10px;
    align-items: baseline;
  }
  .label {
    word-break: keep-all;
  }
</style>
