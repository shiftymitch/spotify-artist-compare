import React from 'react';
import Main from "./Main.jsx"

function Compare() {

  return (
    <div>
      <div id="compare-container" className="row ml-5 mr-5">
        <div id="1" className="col">
            <Main artistCount={1}/>
        </div>
        <div id="2" className="col">
            <Main artistCount={2} />
        </div>
        <div id="3" className="col">
            <Main artistCount={3} />
        </div>
      </div>
    </div>
  );
}

export default Compare;