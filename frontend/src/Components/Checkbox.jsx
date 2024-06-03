import React from 'react'
import "../App.css"

const Checkbox = ({ title, state, onChange }) => {
  return (
    <div className='checkbox-field'>
      <input type="checkbox" onChange={onChange} checked={state} />
      <label>{title}</label>
    </div>
  );
};

export default Checkbox