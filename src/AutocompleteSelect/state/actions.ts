import { Option } from "../types/option"

export enum Types {
  RESET_FILTERED_OPTIONS = "Reset options",
  ADD_OPTION = "Add a new option",
  SET_OPTION = "Set option",
  SET_FOCUSED_OPTION = "Set the focused option",
  SET_SEARCH = "Set the search query",
  TOGGLE_OPTIONS = "Toggle the options"
}

export type Action =
  | ResetOptionsAction
  | AddOptionAction
  | SetOptionAction
  | SetFocusedOptionAction
  | SetSearchAction
  | ToggleOptionsAction

export type ResetOptionsAction = {
  type: Types.RESET_FILTERED_OPTIONS
}
export type AddOptionAction = {
  payload: { data: Option }
  type: Types.ADD_OPTION
}
export type SetOptionAction = {
  payload: { data: Option }
  type: Types.SET_OPTION
}
export type SetFocusedOptionAction = {
  payload: { data: Option | null }
  type: Types.SET_FOCUSED_OPTION
}
export type SetSearchAction = {
  payload: { query: string, flags: string }
  type: Types.SET_SEARCH
}
export type ToggleOptionsAction = {
  payload: { toggle?: boolean }
  type: Types.TOGGLE_OPTIONS
}

export function resetFilteredOptions(): Action {
  return {
    type: Types.RESET_FILTERED_OPTIONS
  }
}
export function addOption(data: Option): Action {
  return {
    payload: { data },
    type: Types.ADD_OPTION
  }
}
export function setOption(data: Option): Action {
  return {
    payload: { data },
    type: Types.SET_OPTION
  }
}
export function setFocusedOption(data: Option | null): Action {
  return {
    payload: { data },
    type: Types.SET_FOCUSED_OPTION
  }
}
export function setSearch(query: string, flags: string): Action {
  return {
    payload: { query, flags },
    type: Types.SET_SEARCH
  }
}
export function toggleOptions(toggle?: boolean): Action {
  return {
    payload: { toggle },
    type: Types.TOGGLE_OPTIONS
  }
}
