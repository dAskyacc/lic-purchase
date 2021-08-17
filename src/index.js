import ReactDOM from 'react-dom'

import './main.scss'

import App from './boot/App'
import { message } from 'antd'

import { AppBase } from './lib/env'
import Web3 from 'web3'
import bs58 from 'bs58'
window.bs58 = bs58
window.Web3Utils = Web3.utils
window.AppBase = AppBase

message.config({
  top: 120,
  maxCount: 5,
})

ReactDOM.render(<App />, document.getElementById('root'))
