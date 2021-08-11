import ReactDOM from 'react-dom'

import './main.scss'

import App from './boot/App'
import { message } from 'antd'

message.config({
  top: 120,
  maxCount: 5,
})

ReactDOM.render(<App />, document.getElementById('root'))
