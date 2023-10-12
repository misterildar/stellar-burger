import { useState } from 'react';
import { ChangeEvent } from 'react';
import { TUser } from '../utils/types';

export function useForm(inputValues: TUser) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
