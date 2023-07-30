import React from 'react';
import ReactLoading from 'react-loading';

import variables from '../styles/colors.scss';


const Loader = (/* { type, color } */) => (
  <>
    {/* {console.log(variables)} */}
    <div style={{display: "flex", justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      minHeight: "80vh",}}>
      <ReactLoading type={"spin"} color={variables.open_blue} height={150} width={150} />
    </div>
  </>
);

export default Loader;