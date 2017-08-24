import React from 'react';

const renderFiled = field => {
  const { label, type, placeholder, input, meta: { touched, error } } = field;
  const formGroup = `form-group ${touched && error ? 'has-danger' : ''} ${!error
    ? 'has-success'
    : ''}`;
  return (
    <div className={formGroup}>
      <label className="form-control-label">
        {label}
      </label>
      <input
        className="form-control form-control-danger"
        type={type}
        placeholder={placeholder}
        {...input}
      />
      <span className="form-control-feedback">
        {touched ? error : ''}
      </span>
    </div>
  );
};

export { renderFiled };
