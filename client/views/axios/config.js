export default {
  brAction: {
    name: '百融',
    specialListc: {
      name: '特殊名单核查',
      data: require('./config/brAction/specialListc').default,
      formatter (key, value) {
        const conf = {
          cell: '手机号',
          lm_cell: '联系人手机号',
          id: '身份证号'
        }
        const vConf = {
          '': '未命中',
          '0': '本人直接命中',
          '1': '一度关系命中',
          '2': '二度关系命中'
        }
        let str = ''
        const res = key.match(/^sl_(cell|lm_cell|id)_([a-z_]+)$/)
        if (!res) {
          return false
        }
        // console.log(key, res, this.data)
        str += '通过' + conf[res[1]] + this.data[res[2]]
        return [str, vConf[value] ? vConf[value] : value]
      }
    },
    applyLoanMon: {
      name: '多次申请核查—月度版',
      data: require('./config/brAction/applyLoanMon').default,
      formatter (key, value) {
        const conf = {
          cell: '手机号',
          lm_cell: '联系人手机号',
          id: '身份证号'
        }
        const vConf = {
          '': '无申请信息',
          '0': '该分类无申请信息'
        }
        let str = ''
        const res = key.match(/^alm_([a-z])(\d+)_(cell|lm_cell|id)_([a-z_]+)$/)
        if (!res) {
          return false
        }
        // console.log(key, res)
        if (res[1] === 'd') {
          str += `近${res[2]}天内, `
        } else {
          str += `过去第${res[2]}个月, `
        }
        str += '按' + conf[res[3]] + this.data[res[4]]
        return [str, vConf[value] ? vConf[value] : `申请了 ${value} 次`]
      }
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
      data: {
        result: '返回结果'
      }
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
        statCode: '查询结果',
        ispType: '运营商',
        phone: '手机号'
      }
    },
    PLTData: {
      name: '手机在网时长验证',
      data: {
        state: '时长',
        statCode: '查询结果',
        ispType: '运营商',
        phone: '手机号'
      }
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
      data: {
        entryId: '裁判文书ID',
        body: '内容',
        title: '标题',
        sortTime: '审结时间',
        dataType: '公告类型'
      }
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
    },
    CheckDriverState: {
      name: '驾驶证查询状态接口',
      data: {
        ztDescript: '状态'
      }
    },
    QPIdentity: {
      name: '个人风控反欺诈',
      data: {
        mcSaddInfoList: [
          {
            datebSadd: '同住址成员出生日期',
            nameSadd: '同住址成员姓名',
            natSadd: '同住址成员民族',
            sexSadd: '同住址成员性别',
            fkResultId: '同住址成员信息ID'
          }
        ],
        resultInfo: {
          identId: '身份证号',
          nameUsd: '姓名',
          statId: '曾用名',
          sex: '性别',
          nat: '民族',
          dateBirth: '出生日期',
          emp: '工作单位',
          educa: '学历',
          statMa: '婚姻状况',
          addHr: '户籍地址',
          disHr: '户籍所属区',
          np: '籍贯',
          ifAl: '是否在逃',
          ifcd: '是否违法犯罪和吸毒',
          iff: '是否欺诈',
          ifOc: '是否失联',
          ifOd: '曾经是否逾期',
          ifOdn: '当前是否逾期'
        }
      }
    },
    CheckStree: {
      name: '行驶证五要素验证',
      data: {
        syr: '所有人匹配结果',
        sfxh: '身份证匹配结果',
        hphm: '车牌号匹配结果',
        hpxl: '号牌种类匹配结果',
        clsbdh6: '车架号匹配结果'
      }
    },
    CheckDriverInfo: {
      name: '驾驶证五要素验证',
      data: {
        jszh: '驾驶证号匹配结果',
        xm: '姓名匹配结果',
        zjcx: '档案编号匹配结果',
        cclzrq: '初次领证日期匹配结果'
      }
    }
  }
}
