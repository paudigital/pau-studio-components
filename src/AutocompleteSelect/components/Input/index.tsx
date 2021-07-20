import React, { useContext, useEffect } from "react"
import { StyledInput } from "./style"
import {
  addOption,
  setFocusedOption,
  setOption,
  setSearch,
  toggleOptions
} from "../../state/actions"
import { OptionContext } from "../context"
import { Option } from "../../types/option"
import { createOption } from "../../utils/options"
import { blur, focus } from "../../utils/dom"

export type InputProps = {
  isCaseSensitive?: boolean
  placeholder?: string

  onChange: (e: React.ChangeEvent<HTMLInputElement>, option: string) => void
  onClick?: (e: React.MouseEvent<HTMLElement>, option?: string) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>, option?: string) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>,
    query: string
  ) => void
  onAddOption?: (option: Option) => void
}

type Props = InputProps

const Input = ({
  isCaseSensitive = false,
  placeholder = "",
  onChange,
  onClick,
  onFocus,
  onKeyDown,
  onBlur,
  onAddOption
}: Props) => {
  const { state, dispatch } = useContext(OptionContext)
  const [focused, setFocused] = React.useState(state.focusedOption)
  const [selectedOption, setSelectedOption] = React.useState<Option>(
    state.selectedOption || createOption("")
  )
  const [flags, setFlags] = React.useState(isCaseSensitive ? "g" : "gi")

  useEffect(() => {
    setFlags(isCaseSensitive ? "g" : "gi")
  }, [isCaseSensitive])

  useEffect(() => {
    state.selectedOption !== selectedOption &&
      setSelectedOption(state.selectedOption!)

    state.focusedOption !== focused && setFocused(state.focusedOption!)
  }, [state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    input === "" && state.selectedOption
      ? dispatch(setSearch(state.selectedOption.label, flags))
      : clearFocusedOption()
    dispatch(setSearch(input, flags))

    dispatch(toggleOptions(input.length > 0))
    onChange(e, input)
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) =>
    onClick && onClick(e)

  const isValid = (input: string) => {
    return input.length > 0
  }
  const clearFocusedOption = () =>
    state.focusedOption && dispatch(setFocusedOption(null))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    switch (e.key) {
      case "ArrowDown":
        dispatch(toggleOptions(true))
        focus("0")
        break
      case "Enter":
        dispatch(toggleOptions())
        dispatch(setSearch(input, flags))
        const index = state.allOptions.findIndex(fo => fo.label === input)
        if (index === -1) {
          if (!isValid(input)) return
          const newOption = createOption(e.currentTarget.value)
          dispatch(addOption(newOption))
          onAddOption && onAddOption(newOption)
        } else {
          dispatch(setOption(state.allOptions[index]))
        }
        if (!state.toggleOptions) focus("input-box")
        break
      case "Escape":
        dispatch(toggleOptions(false))
        blur("input-box")
        clearFocusedOption()
        const option = state.allOptions.find(o => o.label.includes(input))
        dispatch(setSearch(option ? option.label : "", flags))
        break
      default:
    }
    onKeyDown && onKeyDown(e, input)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    onBlur && onBlur(e)

  const ph = state.focusedOption
    ? focused?.label
    : state.search === "" && placeholder === ""
    ? "example@mail.com"
    : placeholder

  return (
    <StyledInput
      id="input-box"
      value={state.search}
      placeholder={ph}
      areSuggestionVisible={state.toggleOptions}
      autoComplete="off"
      onChange={handleChange}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  )
}

export default Input
