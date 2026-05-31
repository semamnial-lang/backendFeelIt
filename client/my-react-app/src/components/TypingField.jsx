import React from 'react';

const TypingField = ({ type = 'text', placeholder = '', value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="typing-field"
      {...props}
    />
  );
};

export default TypingField;