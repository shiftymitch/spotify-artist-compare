import React from 'react';
import Main from "./Main.jsx"

function Compare() {
  return (
      <div className="row ml-5 mr-5">
        <div className="col">
            <Main artistCount={1}/>
        </div>
        <div className="col">
            <Main artistCount={2} />
        </div>
      </div>
  );
}

export default Compare;