import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'qrcode.react'

import { Row, Col, Space, Table, Button, Tooltip } from 'antd'
import { compressAddress, compressSignature58 } from '~Lib/utils'
import { successToast, infoToast, errorToast } from '~/ui/ant-toast'
import BraveIcon from '~/ui/brave-icon/brave-icon'

export default class OrderComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qridPrefix: 'Qrcode_',
      dlaidPrefix: 'DownloadLink_',
      dlbtnidPrefix: 'DownloadBtn_',
      qrsize: 200,
      gutter: 24,
      xs: { span: 24, offset: 0 },
    }

    this.signedLicenseHandler = async (order = {}) => {
      const {
        chainId,
        selectedAddress,
        orderList = [],
        signedAndUPDOrders,
      } = this.props

      try {
        await signedAndUPDOrders(order, orderList)
      } catch (err) {
        errorToast(err.message, 6)
      }
    }

    this.downloadQrcodeHandler = (purchaseId) => {
      const id = `${this.state.qridPrefix}${purchaseId}`

      const canvasImg = document.getElementById(id)
      if (canvasImg) {
        const img = new Image()
        img.src = canvasImg.toDataURL('image/png')
        const aid = `${this.state.dlaidPrefix}${purchaseId}`
        const downlink = document.getElementById(aid)
        downlink.href = img.src
        const filename = purchaseId ? purchaseId.toString() : 'license'
        downlink.download = filename
      }
    }

    this.downloadQrcodeHandlerBtn = (purchaseId) => {
      const id = `${this.state.qridPrefix}${purchaseId}`

      const canvasImg = document.getElementById(id)
      if (canvasImg) {
        const img = new Image()
        img.src = canvasImg.toDataURL('image/png')
        const aid = `${this.state.dlbtnidPrefix}${purchaseId}`
        const downlink = document.getElementById(aid)
        downlink.href = img.src
        const filename = purchaseId ? purchaseId.toString() : 'license'
        downlink.download = filename
      } else {
        console.warn('canvas image uninitialize.')
      }
    }

    this.renderSignatureQR = (r) => {
      const { signature58, purchaseId } = r
      return signature58 ? (
        <div className='sig-cell'>
          <span className='sig-tx'>{compressSignature58(signature58)}</span>
          <Tooltip
            defaultVisible={false}
            placement='top'
            overlayClassName='sig-qrtip'
            color='#fff'
            trigger='click'
            title={
              <div className='sig-qrtip-wrapper'>
                <QRCode
                  id={`${this.state.qridPrefix}${purchaseId}`}
                  value={signature58 ? signature58.toString() : ''}
                  size={this.state.qrsize}
                />
                <a
                  id={`${this.state.dlaidPrefix}${purchaseId}`}
                  className='sig-qrtip-toolbar'
                  onClick={this.downloadQrcodeHandler.bind(this, purchaseId)}
                >
                  <BraveIcon
                    type='brave-download'
                    style={{ fontSize: '1.05em' }}
                  />
                  <span>下载二维码至本地</span>
                </a>
              </div>
            }
          >
            <BraveIcon
              type='brave-qrcode'
              style={{ fontSize: '1.35em', marginLeft: '2em' }}
            />
          </Tooltip>
        </div>
      ) : null
    }
  }

  columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'purchaseId',
      key: 'purchaseId',
      render: (v, r, idx) => idx + 1,
    },
    {
      title: '订单ID',
      dataIndex: 'purchaseId',
      key: 'purchaseId',
      render: (v, r, idx) => compressAddress(v),
    },
    {
      title: '签发账号',
      dataIndex: 'issueAddress',
      key: 'issueAddress',
      align: 'center',
    },
    {
      title: '购买天数',
      align: 'center',
      dataIndex: 'purchaseDays',
      key: 'purchaseDays',
      render: (v, record, idx) => {
        return v
      },
    },
    {
      title: '签名',
      dataIndex: 'signature58',
      key: 'signature58',
      align: 'center',
      render: (v, r) => this.renderSignatureQR(r),
    },
    {
      title: '是否激活',
      dataIndex: 'used',
      key: 'used',
      align: 'center',
      render: (v, r) => <span>{v ? '已激活' : '未激活'}</span>,
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (v, r, idx) => {
        const { purchaseId, signature58 } = r

        // console.log('>>>>>>>>>>>>>>>', r)

        return signature58 && signature58.length ? (
          <Space>
            <CopyToClipboard
              text={signature58}
              onCopy={() => {
                infoToast('签名串已复制.', 2)
              }}
            >
              <Button
                icon={<BraveIcon type='brave-copy' style={{ color: '#000' }} />}
              >
                复制签名
              </Button>
            </CopyToClipboard>

            {/* <a
              id={`${this.state.dlbtnidPrefix}${purchaseId}`}
              onClick={this.downloadQrcodeHandlerBtn.bind(this, purchaseId)}
              className='ant-btn'
            >
              <BraveIcon
                type='brave-download'
                className='purchase-order-icon'
                style={{ cursor: 'pointer' }}
              />
              <span>下载到本地</span>
            </a> */}
          </Space>
        ) : (
          <Space>
            <Button
              type='text'
              icon={
                <BraveIcon
                  type='brave-signature'
                  style={{ fontSize: '1.25em' }}
                />
              }
              onClick={this.signedLicenseHandler.bind(this, r)}
            >
              签名
            </Button>
          </Space>
        )
      },
    },
  ]

  componentDidMount() {
    // there regist something handle.
    const { silentQueryOrders } = this.props
    silentQueryOrders()
  }

  componentWillUnmount() {
    // there unregist something handle.
  }

  renderHeader() {
    const { queryOrders, history } = this.props
    return (
      // <Row gutter={this.state.gutter}>
      //   <Col xs={this.state.xs}>
      <div className='order-head'>
        <h1>订单记录</h1>
        <Space>
          <Button
            type='text'
            onClick={async () => {
              try {
                await queryOrders()
              } catch (err) {
                errorToast(err.message, 5)
              }
            }}
          >
            刷新订单
          </Button>
          <Button
            type='text'
            onClick={() => {
              history.push('/')
            }}
          >
            返回首页
          </Button>
        </Space>
      </div>

      //   </Col>
      // </Row>
    )
  }

  renderContent() {
    const { orderList = [] } = this.props

    return (
      <Row gutter={this.state.gutter}>
        <Col xs={this.state.xs}>
          <Table
            columns={this.columns}
            dataSource={orderList}
            rowKey={(record) => record.purchaseId}
          />
        </Col>
      </Row>
    )
  }

  render() {
    // const { xxx } = this.props

    return (
      <div className='order-container'>
        <div className='inner-box'>
          {this.renderHeader()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
