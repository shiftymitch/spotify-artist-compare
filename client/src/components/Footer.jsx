import React from 'react';
import moment from "moment";

function Footer() {
  return (
    <div className="footer">
      <p className="row text-light">© Copyright {moment().format("YYYY")}</p>
    </div>
  );
}

export default Footer;