import { twMerge } from 'tailwind-merge'

type InputFieldProps = {
  label: string
  className?: string
  [key: string]: any
}

export default function InputFieldLabel({ label, className = '', ...rest }: InputFieldProps) {
  return (
    <label {...rest} className={twMerge('text-xs font-normal text-slate-500', className)}>
      {label}
    </label>
  )
}
