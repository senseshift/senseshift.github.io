import React, { type FC, type ComponentProps, useMemo } from 'react'
import clsx from 'clsx'

import Link from '@docusaurus/Link'

import styles from './index.module.css'

const Button: FC<ComponentProps<typeof Link> & ComponentProps<'button'>> = ({ className, ...props }) => {
  const Component = (props.to || props.href) ? Link : 'button'

  return (
    <Component
      className={
        clsx(
          `
            tw-appearance-none tw-bg-white
            tw-rounded-md tw-border tw-border-solid tw-border-[#6b7280;]
            tw-py-2 tw-px-3
            tw-text-base tw-leading-normal
            tw-shadow-sm
            focus:tw-outline-none focus:tw-border-indigo-300 focus:tw-ring focus:tw-ring-indigo-200 focus:tw-ring-opacity-50
          `,
          className
        )
      }
      {...props}
    />
  )
}

export default Button
