import React from "react"
import { StyledSuggestion } from "./style"
import { Option } from "../../types/option"
import { OptionContext } from "../context"
import { setFocusedOption } from "../../state/actions"

export type SuggestionProps = {
  option: Option
  isSelected: boolean
  isFocused: boolean
  tabIndex?: 0 | -1
  id: string
  onClick: (e: React.MouseEvent<HTMLOptionElement>, option: Option) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLOptionElement>, option: Option) => void
}

type Props = SuggestionProps

const Suggestion = ({
  option,
  isSelected,
  tabIndex = 0,
  onClick,
  onKeyDown,
  id
}: Props) => {
  const { state, dispatch } = React.useContext(OptionContext)
  const [isFocused, setIsFocused] = React.useState(
    option === state.focusedOption
  )

  const handleClick = (e: React.MouseEvent<HTMLOptionElement>) => {
    onClick(e, option)
    dispatch(setFocusedOption(option))
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLOptionElement>) =>
    onKeyDown(e, option)

  const handleMouseEnter = (e: React.MouseEvent<HTMLOptionElement>) => {
    setIsFocused(true)
    dispatch(setFocusedOption(option))
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLOptionElement>) => {
    setIsFocused(false)
    dispatch(setFocusedOption(option))
  }

  const handleFocus = (e: React.FocusEvent<HTMLOptionElement>) => {
    const isFocus = e.type === "focus"
    setIsFocused(isFocus)
    isFocus && dispatch(setFocusedOption(option))
  }

  return (
    <StyledSuggestion
      id={id}
      disabled={option.disabled}
      isFocused={isFocused}
      isSelected={isSelected}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleFocus}
      tabIndex={tabIndex}
    >
      {option.label}
    </StyledSuggestion>
  )
}

export default Suggestion
