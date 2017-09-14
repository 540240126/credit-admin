export default {
  brAction: {
    name: '百融',
    specialListc: {
      name: '特殊名单核查',
      data: require('./config/brAction/specialListc').default
    },
    applyLoanMon: {
      name: '多次申请核查—月度版',
      data: require('./config/brAction/applyLoanMon').default
    },
    inforelation: {
      name: '申请信息关联',
      data: require('./config/brAction/inforelation').default
    },
    execution: {
      name: '法院被执行人-个人版',
      data: require('./config/brAction/execution').default
    },
    keyattribution: {
      name: '身份证号手机号归属地',
      data: require('./config/brAction/keyattribution').default
    },
    telCheck: {
      name: '手机三要素',
      data: require('./config/brAction/telCheck').default
    },
    idTwoz: {
      name: '身份证二要素验证',
      data: require('./config/brAction/idTwoz').default
    },
    stabilityc: {
      name: '稳定性评估',
      data: require('./config/brAction/stabilityc').default
    },
    telPeriod: {
      name: '手机在网时长',
      data: require('./config/brAction/telPeriod').default
    },
    telStatus: {
      name: '手机在网状态',
      data: require('./config/brAction/telStatus').default
    }
  },
  wsdinter: {
    name: '维士顿',
    BankData: {
      name: '银行卡三要素验证',
      data: require('./config/wsdinter/BankData').default
    },
    PhoneData: {
      name: '手机号验证',
      data: {
        result: {
          __name__: '返回信息',
          T: '验证信息通过',
          F: '验证信息不一致',
          N: '系统无记录'
        }
      }
    },
    PSData: {
      name: '手机号在网状态验证',
      data: {
        state: '时长',
        statcode: {
          __name__: '查询结果',
          0: '在网状态正常',
          1: '在网状态停机',
          2: '预销号',
          3: '已销号/未启用',
          4: '在网但不可用',
          5: '号码状态有误',
          6: '认证通过',
          7: '认证未通过'
        },
        ispType: {
          0: '中国移动',
          1: '中国联通',
          2: '中国电信'
        },
        phone: '手机号'
      }
    },
    PLData: {
      name: '手机在网时长验证',
      data: {}
    },
    PBData: {
      name: '个人不良记录',
      data: {
        name: '姓名',
        crimetime: '犯案时间',
        hethercrime: '犯案记录',
        idNumber: '身份证号'
      }
    },
    BLData: {
      name: '个人黑名单',
      data: {
        overdue_date: '逾期时间（天）',
        legal_state: '法律状态',
        type: '黑名单类型',
        overdue_amount: '逾期金额（元）',
        overdue_days: '数据入库时间（天）'
      }
    },
    PJudicial: {
      name: '个人司法验证',
      data: {}
    },
    OPlatInfo: {
      name: '贷款逾期查询',
      data: {
        P_TYPE: '平台类型',
        PLATFORM: '平台代码',
        COUNTS: '该平台的逾期数量',
        MONEY: '逾期金额区间',
        PROVINCE: '省',
        CITY: '市'
      }
    },
    LApplication: {
      name: '贷款申请详情信息查询',
      data: {
        P_TYPE: '平台类型',
        PLATFORMCODE: '平台代码',
        APPLICATIONTIME: '申请时间',
        APPLICATIONAMOUNT: '申请金额区间',
        APPLICATIONRESULT: '申请结果'
      }
    },
    LonLenders: {
      name: '贷款放款详情信息查询',
      data: {
        P_TYPE: '平台类型',
        PLATFORMCODE: '平台代码',
        LOANLENDERSTIME: '放款时间',
        LOANLENDERSAMOUNT: '放款金额区间'
      }
    },
    LRejection: {
      name: '贷款驳回详情信息查询',
      data: {
        P_TYPE: '平台类型',
        PLATFORMCODE: '平台代码',
        REJECTIONTIME: '驳回时间'
      }
    },
    PEducation: {
      name: '学历信息查询',
      data: {
        username: '姓名',
        identity: '身份证号',
        educationdegree: '学历',
        enroldate: '入学年份',
        graduate: '毕业院校',
        graduatetime: '毕业时间',
        specialityname: '专业',
        studyresult: '毕业结论',
        studystyle: '学历类型'
      }
    }
  }
}
