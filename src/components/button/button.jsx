import React from 'react';
import propTypes from 'prop-types';

import './button.scss';

const Button = (props) => {
  const {label, ...otherProps} = props;

  return(
    <button className='button' {...otherProps}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: propTypes.string
};

Button.defaultProps = {
  label: 'SUBMIT'
};

export default Button;