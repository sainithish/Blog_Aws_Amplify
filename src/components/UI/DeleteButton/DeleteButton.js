import React from 'react';

import './DeleteButton.css';

const DeleteButton = props => {
  return (
    <button type={props.type} className="dbutton" onClick={props.onClick}>
      {props.children}
      Delete Blog
    </button>
  );
};

export default DeleteButton;
