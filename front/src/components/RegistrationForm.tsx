import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as http from '../http';
import { useDispatch } from 'react-redux';
import { flashMessage } from '../actions';

export function RegistrationForm(props: any) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    const { name, password, email } = data;
    http.createUser({
      name,
      password,
      email,
    }).then(response => {
      if (response.status === 201) {
        dispatch(flashMessage(`${name} registered`));
      } else {
        dispatch(flashMessage(`error: ${response.status}` +
                              'username already taken'))
      }
    });
  }

  return (
    <div className="RegistrationForm">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input name="name"
                 type="text"
                 ref={register({ required: true })}
          />
        </label>
        {errors.username && <span>↑ Username required.</span>}
        <label>
          Password:
          <input name="password"
                 type="password"
                 ref={register({ required: true })}
          />
        </label>
        {errors.password && <span>↑ Password required.</span>}
        <label>
          Email:
          <input name="email"
                 type="email"
                 ref={register()}
          />
        </label>
        <input type="submit" className="submit-button" value="Submit" />
      </form>
    </div>
  )
}
