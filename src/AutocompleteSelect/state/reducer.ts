import { State, initialState } from "./state"
import { Action, Types } from "./actions"

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case Types.RESET_FILTERED_OPTIONS:
      return {
        ...state,
        filteredOptions: state.allOptions
      }
    case Types.ADD_OPTION:
      const list = state.allOptions.filter(
        o => o.value === action.payload.data.value
      )
      return list.length === 0
        ? {
            ...state,
            allOptions: [...state.allOptions, action.payload.data],
            previousOption: state.selectedOption || action.payload.data,
            selectedOption: action.payload.data,
            focusedOption: action.payload.data,
            search: action.payload.data.label
          }
        : state
    case Types.SET_OPTION:
      return {
        ...state,
        previousOption: state.selectedOption,
        selectedOption: action.payload.data,
        search: action.payload.data.label
      }
    case Types.SET_SEARCH:
      const { query, flags } = action.payload
      return {
        ...state,
        search: query,
        filteredOptions: state.allOptions.filter(o =>
          o.value.match(new RegExp(query, flags))
        )
      }
    case Types.SET_FOCUSED_OPTION:
      return {
        ...state,
        focusedOption: action.payload.data
      }
    case Types.TOGGLE_OPTIONS:
      const toggle = action.payload.toggle
      console.log({toggle})
      return {
        ...state,
        toggleOptions: toggle !== undefined ? toggle : !state.toggleOptions
      }

    default:
      return { ...state }
  }
}
