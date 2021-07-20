import React, { useContext, useEffect } from "react"
import { setFocusedOption, setOption, toggleOptions } from "../../state/actions"
import { OptionContext } from "../context"
import { Option } from "../../types/option"
import NoSuggestion from "../NoSuggestion"
import Suggestion from "../Suggestion"
import { SuggestionsContainer } from "./style"
import { focus } from "../../utils/dom"

export type SuggestionContainerProps = {
  maxOptions: number
  scrollableOptions: boolean
  showDisabledOptions: boolean

  noSuggestionLabel: string

  onClick: (e: React.MouseEvent, option: Option) => void
  onKeyDown: (e: React.KeyboardEvent, option?: Option) => void
}

type Props = SuggestionContainerProps

const SuggestionContainer = ({
  maxOptions,
  scrollableOptions,
  showDisabledOptions,
  noSuggestionLabel,
  onClick,
  onKeyDown
}: Props) => {
  const disabledFilter = (o: Option) =>
    showDisabledOptions ? o : !o.disabled && o
  const { state, dispatch } = useContext(OptionContext)
  const _options = state.filteredOptions.filter(disabledFilter)
  const [options, setOptions] = React.useState(_options)

  useEffect(() => {
    setOptions(state.filteredOptions.filter(disabledFilter))
  }, [state])

  useEffect(() => {
    setOptions(state.filteredOptions.filter(disabledFilter))
  }, [showDisabledOptions])

  const handleClick = (e: React.MouseEvent, o: Option) => {
    o.disabled ? console.error("Option is disabled") : dispatch(setOption(o))
    onClick(e, o)
  }

  const focusOption = (filtered: Option[], id: number, o: Option) => {
    focus(`${id}`)
    setFocusedOption(filtered.find(fo => fo === o) || null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, o: Option) => {
    const filtered = state.filteredOptions
    const numberOfOptions = scrollableOptions
      ? filtered.length - 1
      : filtered.length > maxOptions
      ? maxOptions
      : filtered.length

    const i = +e.currentTarget.id
    let id = 0
    switch (e.key) {
      case "Enter":
        handleEnterKey(e, o)
        break
      case "Escape":
        focus("input-box")
        dispatch(toggleOptions(false))
        break
      case "ArrowDown":
        const _i = i + 1
        id = _i < numberOfOptions ? _i : 0
        focusOption(filtered, id, o)
        break
      case "ArrowUp":
        id = (i > 0 ? i : numberOfOptions - 1) - 1
        focusOption(filtered, id, o)
        break
      default:
        focus("input-box")
        break
    }
    onKeyDown(e, o)
  }

  const handleEnterKey = (e: React.KeyboardEvent, option: Option) => {
    dispatch(setOption(option))
    dispatch(toggleOptions(false))

    if (state.toggleOptions) focus("input-box")
    onKeyDown && onKeyDown(e, option)
  }

  const suggestions_sliced = options
    ? options.slice(0, scrollableOptions ? options.length : maxOptions)
    : []

  const focusedEl = (o: Option) => o === state.focusedOption

  const buildSuggestions = () =>
    suggestions_sliced.map((o, i) => (
      <Suggestion
        key={i}
        id={i.toString()}
        option={o}
        isFocused={focusedEl(o)}
        isSelected={o === state.selectedOption}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
    ))

  return (
    <SuggestionsContainer
      suggestionAmount={maxOptions}
      isVisible={state.toggleOptions}
      scrollable={scrollableOptions}
    >
      {options.length > 0 ? buildSuggestions() : <NoSuggestion label={noSuggestionLabel} />}
    </SuggestionsContainer>
  )
}

export default SuggestionContainer
