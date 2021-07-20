import React from 'react'
import { StyledLabel } from './style'

export type LabelProps = {
  name: string
}

type Props = LabelProps

const Label = ({name}: Props) => {
  return (
    <StyledLabel >
      {name}
    </StyledLabel>
  )
}

export default Label
