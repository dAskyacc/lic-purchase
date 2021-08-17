import React, { Component } from 'react'

import { Row, Col, Space, Table, Button } from 'antd'
import { compressAddress, compressSignature58 } from '~Lib/utils'
import { successToast, infoToast, errorToast } from '~/ui/ant-toast'

export default class OrderComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      render: (v) => compressSignature58(v),
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
            <Button>复制签名</Button>
            <Button>下载签名二维码</Button>
          </Space>
        ) : (
          <Space>
            <Button onClick={this.signedLicenseHandler.bind(this, r)}>
              制作签名
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
