import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderFiled } from '../common';
import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password }, () => {
      this.props.history.push('/feature');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field
              label="Email:"
              placeholder="Email"
              type="email"
              name="email"
              component={renderFiled}
            />
            <Field
              label="Password:"
              placeholder="Password"
              type="password"
              name="password"
              component={renderFiled}
            />
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = formProps => {
  const errors = {};
  const { email, password } = formProps;
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    errors.email = 'Please enter your email.';
  }
  if (email && !re.test(email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (!password) {
    errors.password = 'Please enter your password';
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

const SigninForm = reduxForm({ form: 'signin', validate })(Signin);

export default connect(mapStateToProps, { signinUser })(SigninForm);
