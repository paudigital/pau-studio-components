import React, { useState, useReducer, useEffect, useRef } from "react"
import { Option } from "../types/option"
import SuggestionContainer from "./SuggestionContainer"
import Label from "./Label"
import Input from "./Input"
import { StyledWrapper, Container } from "./style"
import { OptionContext } from "./context"
import reducer from "../state/reducer"
import { initializeState } from "../state/state"
import {
  resetFilteredOptions,
  setOption,
  toggleOptions
} from "../state/actions"
import { Theme } from "../types/theme"
import { ThemeProvider } from "styled-components"
import { useBlur } from "../hooks/useBlur"

export type Click = {
  type: string
  event: React.MouseEvent
}

export type AutoCompleteProps = {
  label: string
  options: Option[]

  placeholder?: string
  isCaseSensitive?: boolean
  showDisabledOptions?: boolean
  scrollableOptions?: boolean
  maxOptions?: number
  theme?: Theme
  noSuggestionLabel?: string

  onInputKeyDown?: (
    e: React.KeyboardEvent,
    query: string,
    option?: Option
  ) => void
  onListKeyDown?: (e: React.KeyboardEvent, option?: Option) => void
  onChange?: (e: React.ChangeEvent, query: string) => void
  onClick?: (click: Click, option?: Option) => void
  onFocus?: (e: React.FocusEvent) => void
  onBlur?: (e: React.FocusEvent, option: Option | null) => void
  onAddOption?: (options: Option[], latestOption: Option) => void
}

type Props = AutoCompleteProps

const AutoComplete = ({
  label,
  options,
  placeholder = "",
  isCaseSensitive,
  maxOptions = 10,
  scrollableOptions = false,
  showDisabledOptions = false,
  theme = _theme,
  noSuggestionLabel = "No options available",
  onClick,
  onChange,
  onInputKeyDown,
  onListKeyDown,
  onFocus,
  onBlur,
  onAddOption
}: Props) => {
  const [moveFocus, setMoveFocus] = useState(false)
  const initialState = initializeState(options)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [suggestions, setSuggestions] = React.useState(state.allOptions)
  const [addedOptions, setAddedOptions] = React.useState<Option[]>([])
  const ref = useRef(null)
  useBlur(ref)

  useEffect(() => {
    setSuggestions(
      suggestions.filter(o => (showDisabledOptions ? o : !o.disabled))
    )
  }, [state, showDisabledOptions])

  const search = (e: React.ChangeEvent<HTMLInputElement>, query: string) => {
    if (query === "") dispatch(resetFilteredOptions())

    setSuggestions(
      suggestions.filter(s => {
        const flags = isCaseSensitive ? "g" : "gi"
        const regex = new RegExp(query, flags)
        return s.value.match(regex)
      })
    )
    onChange && onChange(e, query)
  }

  const handleListClick = (event: React.MouseEvent, option: Option) => {
    const input = document.querySelector("input#input-box")! as HTMLInputElement
    input.focus()

    setMoveFocus(true)
    dispatch(toggleOptions(false))
    dispatch(setOption(option))

    onClick &&
      onClick(
        {
          type: "list",
          event
        },
        option
      )
  }
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    query: string
  ) => {
    switch (e.key) {
      case "Tab":
      case "ArrowDown":
        setMoveFocus(true)
        dispatch(toggleOptions(true))
        break
      case "ArrowUp":
        setMoveFocus(true)
        dispatch(toggleOptions(false))
        break
      default:
        setMoveFocus(false)
    }
    onInputKeyDown && onInputKeyDown(e, query, state.selectedOption!)
  }

  const focusList = () => {
    const i = suggestions.findIndex(s => s === state.selectedOption)
    if (i < 0) return
    const o = document.getElementById(i.toString())
    o && o.focus()
  }
  const focusInput = () => document.getElementById("input-box")!.focus()

  React.useEffect(() => {
    moveFocus && state.toggleOptions ? focusList() : focusInput()
  }, [moveFocus, state.toggleOptions])

  const handleInputClick = (event: React.MouseEvent) => {
    dispatch(toggleOptions())
    onClick &&
      onClick({
        type: "input",
        event
      })
  }

  const handleFocus = (e: any) => {
    if (state.selectedOption)
      (document.getElementById("input-box")! as HTMLInputElement).value =
        state.selectedOption.value
    onFocus && onFocus(e)
  }

  const handleSuggestionKeyDown = (e: React.KeyboardEvent, o?: Option) =>
    onListKeyDown && onListKeyDown(e, o)

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    onBlur && onBlur(e, state.selectedOption)

  const handleAddOption = (option: Option) =>
    setAddedOptions([...addedOptions, option])

  React.useEffect(() => {
    onAddOption &&
      onAddOption(addedOptions, addedOptions[addedOptions.length - 1])
  }, [addedOptions])

  return (
    <ThemeProvider theme={theme}>
      <OptionContext.Provider value={{ state, dispatch }}>
        <StyledWrapper>
          {label && <Label name={label} />}
          <Container ref={ref}>
            <Input
              isCaseSensitive={isCaseSensitive}
              placeholder={placeholder}
              onChange={search}
              onClick={handleInputClick}
              onFocus={handleFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              onAddOption={handleAddOption}
            />
            <SuggestionContainer
              maxOptions={maxOptions}
              showDisabledOptions={showDisabledOptions}
              scrollableOptions={scrollableOptions}
              noSuggestionLabel={noSuggestionLabel}
              onClick={handleListClick}
              onKeyDown={handleSuggestionKeyDown}
            />
          </Container>
        </StyledWrapper>
      </OptionContext.Provider>{" "}
    </ThemeProvider>
  )
}

export default AutoComplete

const _theme = {
  borderRadius: "4px",
  colors: {
    neutral: {
      white: "#ffffff",
      cream: "#f6f6f6",
      ash: "#ededed",
      silver: "#e2e2e2",
      gainsboro: "#dcdcdc",
      gray: "#aaaaaa",
      darkgray: "#808080",
      black: "#000000"
    },
    background: "#fff",
    input: {
      background: "#fff"
    },
    border: "#000",
    borderBottomOpen: "#424242",
    borderRadius: "0",
    color: "#000",
    focused: {
      background: "#e4eded",
      color: "#d46030"
    },
    selected: {
      background: "#ddd",
      color: "#33aadd"
    },
    disabled: {
      background: "#e4e4e4",
      color: "#808080"
    }
  }
}
