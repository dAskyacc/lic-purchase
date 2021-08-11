import React, { Component, createRef } from 'react'

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Divider,
} from 'antd'

import { getUUID32Hex } from '~Lib/utils/random-utils'
import { compressAddress } from '~Lib/utils'

import BraveIcon from '~UI/brave-icon'

import { HOME_INDEX_ROOT } from '~/router/routes-cnsts'

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
export default class PurchaseComp extends Component {
  formRef = createRef()
  constructor(props) {
    super(props)
    this.state = {
      // a: 1,
      loading: false,
      unitPrice: 1,
      purchaseId: getUUID32Hex(),
      tokenBal: 0,
      colSpan: 12,
      selectPeroid: 30,
      purchaseDays: 30,
      totalFee: 30,

      transactionHash:
        '0x34acdbfb65651ad2ce2c2bde0830fac9979c30ad808bf7a966abace386695a7e',

      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
    }
  }

  componentDidMount() {
    // there regist something handle.
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  formValuesChangedHandle = (changeValues, allValues) => {
    const { selectPeroid, purchaseDays } = changeValues
    const price = this.state.unitPrice

    // console.log('>>>>>>>>>>>>Select', changeValues, purchaseDays)

    if (selectPeroid) {
      this.formRef.current.setFieldsValue({
        purchaseDays: selectPeroid,
      })

      this.setState({ totalFee: selectPeroid * price })

      // console.log('>>>>>>>>>>>>', this.state)
    }

    if (purchaseDays) {
      this.setState({ totalFee: purchaseDays * price })
    }
  }

  regenerateId = () => {
    if (!this.state.loading) {
      const id = getUUID32Hex()
      this.setState({ purchaseId: id })
    }
  }

  getFormValue = () => {
    const form = this.formRef.current
    console.log(
      '>>>>>>form data>>>>>>>>>>>>>>',
      form.getFieldValue('purchaseDays'),
      this.state.purchaseId
    )
  }

  goHome = () => {
    const { history } = this.props
    history.push(HOME_INDEX_ROOT)
  }

  renderForm() {
    return (
      <>
        <Form
          {...formLayout}
          initialValues={{
            selectPeroid: this.state.selectPeroid,
            purchaseDays: this.state.purchaseDays,
          }}
          onValuesChange={this.formValuesChangedHandle}
          className='purchase-form'
          ref={this.formRef}
          name='purchaseForm'
        >
          <Form.Item label='当前余额'>
            <span className='purchase-uuid'>{this.state.tokenBal}</span>
          </Form.Item>
          <Form.Item label='订单ID' wrapperCol={{ span: 16 }}>
            <span className='purchase-uuid'>{this.state.purchaseId}</span>
            <BraveIcon
              type='brave-gear'
              onClick={this.regenerateId}
              style={{
                fontSize: '1.05rem',
                paddingLeft: '0.5rem',
                cursor: !this.state.loading ? 'pointer' : 'not-allowed',
              }}
            />
          </Form.Item>

          <Form.Item name='selectPeroid' label='选择订购周期'>
            <Select placeholder='请选择'>
              <Select.Option value={30}>一个月</Select.Option>
              <Select.Option value={60}>两个月</Select.Option>
              <Select.Option value={90}>三个月(90天)</Select.Option>
              <Select.Option value={180}>半年(180天)</Select.Option>
              <Select.Option value={365}>一年(365天)</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='购买天数' required>
            <Form.Item name='purchaseDays' noStyle>
              <InputNumber min={1} max={10000} />
            </Form.Item>
            <span>最大10000</span>
            {/* <Input placeholder='days' /> */}
          </Form.Item>

          <Form.Item label='合计花费'>
            <span className='purchase-fee'>{this.state.totalFee}</span>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <div className='purchase-form-btns'>
              <Button
                type='ghost'
                block
                size='large'
                loading={this.state.loading}
                onClick={this.getFormValue}
              >
                提交
              </Button>
              <Button
                block
                type='text'
                size='large'
                loading={this.state.loading}
                onClick={this.goHome}
              >
                返回
              </Button>
            </div>
          </Form.Item>
        </Form>
        {this.state.loading || !this.state.transactionHash
          ? null
          : this.renderOrder()}
      </>
    )
  }

  renderOrder() {
    const { openKovanEtherscanTab } = this.props
    return (
      <>
        <Divider orientation='left'>License 订单</Divider>
        <div className='purchase-order'>
          <div className='purchase-order-title'>
            <span className='purchase-tx'>
              {compressAddress(this.state.transactionHash)}
              <BraveIcon
                type='brave-link'
                style={{
                  paddingLeft: '1rem',
                  color: 'blue',
                  cursor: 'pointer',
                }}
                onClick={openKovanEtherscanTab.bind(this, {
                  loading: this.state.loading,
                  tx: this.state.transactionHash,
                })}
              />
            </span>
            {/* <span className='purchase-id'>
              {compressAddress(this.state.purchaseId)}
            </span> */}
          </div>
          <div className='purchase-order-action'>
            <span className='text'>Success</span>
            <BraveIcon type='brave-qrcode' className='purchase-order-icon' />
            <BraveIcon type='brave-download' className='purchase-order-icon' />
          </div>
        </div>
      </>
    )
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='purchase-container'>
        {/* <div className='inner-box'> */}
        <Row gutter={24}>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 10, offset: 4 }}
            xl={{ span: 12, offset: 6 }}
          >
            <h1>申请License</h1>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={{ span: 16, offset: 4 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 10, offset: 4 }}
            xl={{ span: 12, offset: 6 }}
          >
            <div className='purchase-form-wrapper'>{this.renderForm()}</div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    )
  }
}
