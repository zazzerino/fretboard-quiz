import * as React from 'react';
import { useForm } from 'react-hook-form';

export function RegistrationForm(props: any) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    /* const { username, password } = data;
     * dispatch(loginAsync({ username, password }));
     * history.push('/'); */
  }

  return (
    <div className="RegistrationForm">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input name="username"
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
        <input type="submit" className="submit-button" value="Submit" />
      </form>

    </div>
  )
}
