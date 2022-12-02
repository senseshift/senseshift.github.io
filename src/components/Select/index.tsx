import React, { type FC, type ComponentProps } from 'react'
import clsx from 'clsx'

const Select: FC<ComponentProps<'select'>> = ({ className, ...props }) => (
  <select
    className={
      clsx(
        `
          tw-rounded-md border-gray-300
          tw-shadow-sm
          focus:tw-border-indigo-300 focus:tw-ring focus:tw-ring-indigo-200 focus:tw-ring-opacity-50
        `,
        className
      )
    }
    {...props}
  />
)

export default Select
