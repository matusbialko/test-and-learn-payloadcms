import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    isPassword?: boolean
  }
> = ({ name, defaultValue, errors, label, register, required, width, isPassword }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input defaultValue={isPassword ? '' : defaultValue} id={name} type={isPassword ? 'password' : 'text'} {...register(name, { required })} />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}