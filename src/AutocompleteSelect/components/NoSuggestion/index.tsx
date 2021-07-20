import React from 'react'
import { StyledNoSuggestion } from './style'

export type NoSuggestionProps = {
  label: string
}

type Props = NoSuggestionProps

const NoSuggestion = ({label}: Props) => {
  return (
    <StyledNoSuggestion>
      {label}
    </StyledNoSuggestion>
  )
}

export default NoSuggestion
