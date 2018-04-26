import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './InfoBox.css';

const infoBox = (props) => {
  return (
    <div>
      <div className='infobox-text'>
        Your Todo list is currently empty...
      </div>
      <div className="infobox-container">
        <RaisedButton
          label="Get started adding your first Todo"
          labelColor={'#ffffff'}
          backgroundColor={'#165ef0'}
          onClick={props.addFirstTodo}
        />
      </div>
    </div>

  );
};

export default infoBox;
