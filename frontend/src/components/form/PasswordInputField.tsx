import { HTMLAttributes, useEffect, useState } from 'react'
import { FiEye, FiEyeOff, FiUnlock } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import InputFieldLabel from './InputFieldLabel'
import { ZodSchema } from 'zod'

type PasswordInputFieldProps = {
  inputClasses?: string
  label: string
  onTextChange: (input: string) => void
  placeholder?: string
  isDisabled?: boolean
  validationSchema?: ZodSchema
} & HTMLAttributes<HTMLDivElement>

export default function PasswordInputField(props: PasswordInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const inputTag = `input-password-${props.label}`

  useEffect(() => {
    props.onTextChange(text)

    if (props.isDisabled) {
      setErrorMessage('')
      return
    }

    if (props.validationSchema) {
      const result = props.validationSchema.safeParse(text)
      if (!result.success) {
        setErrorMessage(result.error.errors[0]?.message)
      } else {
        setErrorMessage('')
      }
    }
  }, [text, props.isDisabled])

  return (
    <div className="flex w-full flex-col items-stretch gap-y-1">
      <InputFieldLabel htmlFor={'#' + inputTag} className="ml-5" label={props.label} />

      <div
        className={twMerge(
          'flex items-center w-full bg-white rounded-full ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-600 px-4 py-2.5',
          props.inputClasses
        )}
      >
        <div className="text-slate-500 mr-2">
          <FiUnlock size={18} />
        </div>

        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id={inputTag}
          value={text}
          onChange={event => {
            const val = event.target.value
            setText(val)
            props.onTextChange(val)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={props.placeholder ?? 'Enter password here...'}
          disabled={props.isDisabled}
          className="flex-1 bg-transparent text-sm font-medium text-slate-800 placeholder:text-xs placeholder:text-slate-400 outline-none"
        />

        <button
          type="button"
          className="text-slate-500 ml-2 focus:outline-none"
          onClick={() => setPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {props.validationSchema && !!text && !isFocused && (
        <span className="pl-4 text-xs font-normal italic text-red-600">{errorMessage}</span>
      )}
    </div>
  )
}
