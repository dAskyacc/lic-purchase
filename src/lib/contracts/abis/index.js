import TokenABI from './NinjaToken.json'
import LicenseABI from './NinjaChatLicense.json'

import { TOKEN_SOLNAME, LICENSE_SOLNAME } from '../sc-map'

export default {
  [TOKEN_SOLNAME]: TokenABI,
  [LICENSE_SOLNAME]: LicenseABI,
}
