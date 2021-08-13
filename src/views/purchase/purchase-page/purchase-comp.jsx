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
  Popconfirm,
  Tooltip,
} from 'antd'

import QRCode from 'qrcode.react'

import { compressAddress } from '~Lib/utils'

import BraveIcon from '~UI/brave-icon'

import { HOME_INDEX_ROOT } from '~/router/routes-cnsts'
import { TX_COMPLETED } from '~/lib/web3/tx-helper'
import { successToast, infoToast, errorToast } from '~/ui/ant-toast'

const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}
export default class PurchaseComp extends Component {
  formRef = createRef()
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      unitPrice: 1,
      purchaseId: '',
      tokenBal: 0,
      colSpan: 12,
      selectPeroid: 30,
      purchaseDays: 30,
      totalFee: 30,

      qrText:
        '今天繼續使用erc20標準規範按一篇網絡博文的教程進行親自敲打代碼來寫一個可以發行token的智能合約。今天只好另找一個功能更完備的智能合約來進行學習和部署，' +
        '合約部署成功，但不知爲何調用合約中的函數方法失敗。學習共用時53分鐘今天繼續使用erc20標準規範按一篇網絡博文的教程進行親自敲打代碼來寫一個可以發行token的智能合約。' +
        '今天只好另找一個功能更完備的智能合約來進行學習和部署，合約部署成功，但不知爲何調用合約中的函數方法失敗。學習共用時53分鐘今天繼續使用erc20標準規範按一篇網絡博文' +
        '的教程進行親自敲打代碼來寫一個可以發行token的智能合約。今天只好另找一個功能更完備的智能合約來進行學習和部署，合約部署成功，但不知爲何調用合約中的函數方法失敗。' +
        '學習共用時53分鐘今天繼續使用erc20標準規範按一篇網絡博文的教程進行親自敲打代碼來寫一個可以發行token的智能合約。今天只好另找一個功能更完備的智能合約來進行學習' +
        '和部署，合約部署成功，但不知爲何調用合約中的函數方法失敗。學習共用時53分鐘今天繼續使用erc20標準規範按一篇網絡博文的教程進行親自敲打代碼來寫一個可以發行token' +
        '的智能合約。今天只好另找一個功能更完備的智能合約來進行學習和部署，合約部署成功，但不知爲何調用合約中的函數方法失敗。學習共用時53分鐘',
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
    }
  }

  componentDidMount() {
    // there regist something handle.
    const { silentQueryBalance, selectedAddress } = this.props

    if (silentQueryBalance && selectedAddress) {
      silentQueryBalance({ selectedAddress })
    }
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  formValuesChangedHandle = (changeValues, allValues) => {
    const { selectedAddress, recheckAllowance } = this.props

    // console.log(
    //   '>>>>>>>>>>selectedAddress>>>>>>>>>>>>>>>>>>',
    //   selectedAddress,
    //   allValues
    // )
    const { selectPeroid, purchaseDays } = changeValues
    const price = this.state.unitPrice
    let totalFee = allValues.purchaseDays
    if (selectPeroid) {
      this.formRef.current.setFieldsValue({
        purchaseDays: selectPeroid,
      })

      totalFee = selectPeroid * price
      this.setState({ totalFee: selectPeroid * price })
    }

    if (purchaseDays) {
      totalFee = purchaseDays * price
      this.setState({ totalFee: purchaseDays * price })
    }

    if (recheckAllowance) {
      recheckAllowance({ selectedAddress, requiredDays: totalFee }).then(
        (resp) => {
          console.log('>>>>>>>>>resp>>>>>>', resp)
        }
      )
    }
  }

  submitHandle = async () => {
    const { purchaseLicSubmit } = this.props
    try {
      const form = this.formRef.current
      const purchaseDays = form.getFieldValue('purchaseDays')

      this.setState({ loading: true })
      const { purchaseId } = await purchaseLicSubmit({ purchaseDays })
      this.setState({ purchaseId, loading: false })
    } catch (err) {
      console.log('submiit error:', err)
      this.setState({ loading: false })
      errorToast(err.message, 8)
    }
  }

  goHome = () => {
    const { history } = this.props
    history.push(HOME_INDEX_ROOT)
  }

  approveHandle = async () => {
    try {
      this.setState({ loading: true })
      const { selectedAddress, approveToAcceptAddress } = this.props
      const form = this.formRef.current
      const purchaseDays = form.getFieldValue('purchaseDays')
      // errorToast(selectedAddress, 5)
      if (!purchaseDays) throw new Error(`订购周期不正确: ${purchaseDays}`)
      await approveToAcceptAddress(selectedAddress, purchaseDays)
      this.setState({ loading: false })
    } catch (err) {
      this.setState({ loading: false })
      errorToast(err.message, 5)
    }
  }

  renderForm() {
    const {
      tokenSymbol,
      tokenBalText,
      ethBalText,
      needApprove,
      recheckAllowance,
      lastOrder = {},
    } = this.props

    const { txHash, purchaseId } = lastOrder
    return (
      <>
        <Form
          {...formLayout}
          initialValues={{
            selectPeroid: this.state.selectPeroid,
            purchaseDays: this.state.purchaseDays,
          }}
          onValuesChange={(changeValues, allValues) => {
            this.formValuesChangedHandle(
              changeValues,
              allValues,
              recheckAllowance
            )
          }}
          className='purchase-form'
          ref={this.formRef}
          name='purchaseForm'
        >
          <Form.Item label='当前账户余额'>
            <div className='balance-label-box'>
              <span className='token-symbol'>{tokenSymbol}</span>
              <span className='token-valt'>{tokenBalText}</span>
              <span className='token-symbol'>Gas Fee:</span>
              <span className='token-valt'>{ethBalText}</span>
              <span className='token-unit'>ETH</span>
            </div>
          </Form.Item>
          <Form.Item label='订单ID' wrapperCol={{ span: 16 }}>
            <span className='purchase-uuid'>{this.state.purchaseId}</span>
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
              {needApprove ? (
                <Button
                  block
                  type='ghost'
                  size='large'
                  loading={this.state.loading}
                  onClick={this.approveHandle.bind(this)}
                >
                  授权
                </Button>
              ) : null}

              <Button
                type='ghost'
                block
                size='large'
                loading={this.state.loading}
                disabled={needApprove}
                onClick={this.submitHandle.bind(this)}
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
        {this.state.loading || !purchaseId || !txHash
          ? null
          : this.renderOrder()}
      </>
    )
  }

  downloadQrcode = (id, purchaseId) => {
    const canvasImg = document.getElementById(id)
    if (canvasImg) {
      const img = new Image()
      img.src = canvasImg.toDataURL('image/png')

      const downlink = document.getElementById('downLinkID')
      downlink.href = img.src
      const filename = purchaseId ? purchaseId.toString() : 'license'
      downlink.download = filename
    }
  }

  renderOrder() {
    const { openKovanEtherscanTab, lastOrder } = this.props

    const { purchaseId, purchaseDays, txHash, txStatus } = lastOrder
    return (
      <>
        <Divider orientation='left'>License 订单</Divider>
        <div className='purchase-order'>
          <div className='purchase-order-title'>
            <span className='purchase-tx'>
              {compressAddress(txHash)}
              <BraveIcon
                type='brave-link'
                style={{
                  paddingLeft: '1rem',
                  color: 'blue',
                  cursor: 'pointer',
                }}
                onClick={openKovanEtherscanTab.bind(this, {
                  loading: this.state.loading,
                  tx: txHash,
                })}
              />
            </span>
            <span className='purchase-id'>{compressAddress(purchaseId)}</span>
          </div>
          <div className='purchase-order-action'>
            <span className='text'>Success</span>
            {txStatus === TX_COMPLETED ? this.renderLastOrderDownload() : null}
          </div>
        </div>
      </>
    )
  }

  renderLastOrderDownload() {
    const { lastOrder = {} } = this.props
    const { txStatus, txHash, purchaseId, signedData } = lastOrder

    const qrTxt = JSON.stringify(lastOrder)
    return (
      <Tooltip
        defaultVisible={false}
        placement='top'
        overlayClassName='qr-poptip'
        color='#fff'
        trigger='click'
        title={
          <div className='qrcode-wrapper'>
            <QRCode
              id='lastOrderQrCode'
              value={signedData ? signedData.toString() : ''}
              size={200}
            />
            <div style={{ textAlign: 'center' }}>
              <a
                id='downLinkID'
                style={{ color: '#000', textAlign: 'center' }}
                className='qrcode-wrapper-bottom-action'
                onClick={this.downloadQrcode.bind(
                  this,
                  'lastOrderQrCode',
                  purchaseId
                )}
              >
                <BraveIcon
                  type='brave-download'
                  className='purchase-order-icon'
                  style={{ cursor: 'pointer' }}
                />
                <span>下载到本地</span>
              </a>
            </div>
          </div>
        }
      >
        <Button
          type='text'
          icon={
            <BraveIcon type='brave-qrcode' className='purchase-order-icon' />
          }
        ></Button>
      </Tooltip>
    )
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='purchase-container'>
        {/* <div className='inner-box'> */}
        <Row gutter={24}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 16, offset: 4 }}
            md={{ span: 20, offset: 4 }}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 12, offset: 6 }}
            xxl={{ span: 12, offset: 5 }}
          >
            <h1>申请License</h1>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 14, offset: 4 }}
            xxl={{ span: 12, offset: 5 }}
          >
            <div className='purchase-form-wrapper'>{this.renderForm()}</div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col
            xs={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            md={{ span: 24, offset: 0 }}
            lg={{ span: 20, offset: 2 }}
            xl={{ span: 14, offset: 4 }}
            xxl={{ span: 12, offset: 5 }}
          >
            <div className='qr-code-wrapper'></div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    )
  }
}
