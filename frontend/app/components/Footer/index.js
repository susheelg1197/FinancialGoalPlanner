import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <section className="footer">
      <hr className="footer-seperator" />
      <section className="footer-info">
        
        <section className="footer-info-center">
          <section className="footer-info__terms">
            Terms and Conditions
            <br />
            Copyright
          </section>
        </section>
      </section>
      <hr className="footer-seperator" />
    </section>
  );
}

export default Footer;
