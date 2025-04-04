import React, { useId } from 'react'

const Input = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    ref,
    name,
    className="",
    ...props
}) => {
    const id = useId()
  return (
    <div className='flex gap-2'>
        {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref}
            id={id}
            name={name}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 ${className}`}
            {...props}
        />
    </div>
  )
}

export default Input