// import { mockData } from "../config"
import { Option } from "../types/option"

export type State = {
  allOptions: Option[]
  filteredOptions: Option[]
  selectedOption: Option | null
  previousOption: Option | null
  focusedOption: Option | null
  search: string
  toggleOptions: boolean
}

export const initialState: State = {
  allOptions: [],
  filteredOptions: [],
  selectedOption: null,
  previousOption: null,
  focusedOption: null,
  search: "",
  toggleOptions: false
}

export const initializeState = (options: Option[]) => ({
  allOptions: options,
  filteredOptions: options,
  selectedOption: null,
  previousOption: null,
  focusedOption: null,
  search: "",
  toggleOptions: false
})
