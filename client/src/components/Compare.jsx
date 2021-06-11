import React from 'react';
import Main from "./Main.jsx"

function Compare() {

  return (
    <div>
      <div id="compare-container" className="row ml-5 mr-5">
        <div id="1" className="col">
            <Main artistCount={1} align={{textAlign: "center"}}/>
        </div>
        <div id="2" className="col">
            <Main artistCount={2} align={{textAlign: "center"}}/>
        </div>
      </div>
    </div>
  );
}

export default Compare;