import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './loginForm.scss';

import { UserService, TokenService } from 'src/services';

import useFormState from 'src/hooks/useFormState';

import { Button } from 'src/components/utils';

const LoginForm = ({ loginSuccess }) => {
  const [activeSubmit, setActiveSubmit] = useState(false);

  const { formFields, setFormFields, changeHandler } = useFormState({
    user_name: '',
    password: '',
    submitType: '',
    invalidCreds: false
  });

  useLayoutEffect(() => {
    const validForm = () => {
      const { user_name, password } = formFields;
      const name = user_name.length >= 3 && user_name.length <= 50;
      const pass = password.length >= 3 && password.length <= 150;

      if (name && pass) setActiveSubmit(true);
      else setActiveSubmit(false);
    };

    validForm();
  }, [formFields]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (formFields.submitType === 'Login') {
        data = await UserService.userLogin(formFields);
      } else {
        data = await UserService.userRegistration(formFields);
      }

      if (!data) {
        setFormFields({ ...formFields, invalidCreds: true });
        return;
      }

      const { authToken, user_name } = data;

      TokenService.saveAuthToken(authToken);
      loginSuccess(user_name);
    } catch (error) {
      setFormFields({ ...formFields, invalidCreds: true });
    }
  };

  const submitButtons = ['Login', 'Register'].map((subType) => (
    <Button
      key={subType}
      type="submit"
      value={subType}
      onClick={changeHandler('submitType')}
      disabled={!activeSubmit}
    >
      {subType}
    </Button>
  ));

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <label className="form-label" htmlFor="user_name">
        Username:
        <input
          type="text"
          id="user_name"
          placeholder="Username"
          value={formFields.user_name}
          onChange={changeHandler('user_name')}
        />
      </label>
      <label className="form-label" htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formFields.password}
          onChange={changeHandler('password')}
        />
      </label>
      <p>{formFields.invalidCreds && 'Invalid Login'}</p>
      {submitButtons}
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};
