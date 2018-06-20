import React from 'react';

const Output = ({ output, handleAddNumber }) => {
  return (
    <div>
      {output}
      {output.length > 0 ? <button onClick={() => handleAddNumber(this.state.label)} >Add</button> : '' }
    </div>
  );
};

export default Output;
