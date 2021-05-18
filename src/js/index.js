import '@babel/polyfill';
import './cvvInput';
import './validation';

import { isInfoPage } from './common/utils';

if (!isInfoPage) {
  require('./cardNumber');
}
