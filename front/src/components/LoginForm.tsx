import * as React from 'react';
import { useForm } from 'react-hook-form';

export function LoginForm(props: any) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="LoginForm">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          username:
          <input name="username"
                 type="text"
                 ref={register({ required: true })}
          />
        </label>
        {errors.username && <span>↑ Username required.</span>}
        <label>
          password:
          <input name="password"
                 type="password"
                 ref={register({ required: true })}
          />
        </label>
        {errors.password && <span>↑ Password required.</span>}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

  /* return (
   *   <div className="LoginForm">
   *     <h1>Log In</h1>
   *     <form onSubmit={handleSubmit}>
   *       <label>
   *         username:
   *         <input type="text"
   *                value={state.username}
   *                onChange={handleChange} />
   *       </label>
   *       <label>
   *         password:
   *         <input type="password"
   *                value={state.password}
   *                onChange={handleChange} />
   *       </label>
   *       <input type="submit" value="Submit" />
   *     </form>
   *   </div> */
