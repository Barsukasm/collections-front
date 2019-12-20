import React from "react";
import propTypes from "prop-types";

import "./button.scss";

const Button = props => {
  const { label, alert, ...otherProps } = props;

  let cName = "button";

  if (alert) cName = cName.concat(" button_alert");

  return (
    <button className={cName} {...otherProps}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: propTypes.string,
  alert: propTypes.bool
};

Button.defaultProps = {
  label: "SUBMIT",
  alert: false
};

export default Button;
