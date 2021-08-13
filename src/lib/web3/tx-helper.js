export const TX_APPENDING = 'appending'
export const TX_FAILED = 'failed'
export const TX_COMPLETED = 'completed'

export const validateTx = (txHash, txStatus) => {
  return txHash && txStatus === TX_COMPLETED
}

export default {
  TX_APPENDING,
  TX_FAILED,
  TX_COMPLETED,
}
