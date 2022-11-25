import React, { type FC, type ComponentProps, useMemo } from 'react'

import Link from '@docusaurus/Link'

import styles from './index.module.css'

const Button: FC<ComponentProps<typeof Link> & ComponentProps<'button'>> = ({ className, ...props }) => {
  const Component = (props.to || props.href) ? Link : 'button'

  return (
    <Component {...props} />
  )
}

export default Button
