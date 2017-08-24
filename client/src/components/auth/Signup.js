import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderFiled } from '../common';
import { signupUser } from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign up the user!
    this.props.signupUser({ email, password }, callback => {
      if (callback) {
        this.props.history.push('/feature');
      } else {
        email = password = '';
      }
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
            <Field
              label="Password Confirm:"
              placeholder="Password Confirm"
              type="password"
              name="passwordConfirm"
              component={renderFiled}
            />
            {this.renderAlert()}
            <button type="submit" className="btn btn-primary">
              Sign up!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = formProps => {
  const errors = {};
  const { email, password, passwordConfirm } = formProps;
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    errors.email = 'Please enter an email.';
  }
  if (email && !re.test(email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (!password) {
    errors.password = 'Please enter a password.';
  }
  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if (password && passwordConfirm && password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
};

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

const SignupForm = reduxForm({ form: 'signup', validate })(Signup);

export default connect(mapStateToProps, { signupUser })(SignupForm);
