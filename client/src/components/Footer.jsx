import React from 'react';
import moment from "moment";

function Footer() {
  return (
    <div className="footer">
      <p className="row">© Copyright {moment().format("YYYY")} | Built by:<a className="ml-1" href="https://github.com/shiftymitch" target="_blank" rel="noopener noreferrer">Mitch Henderson</a></p>
    </div>
  );
}

export default Footer;