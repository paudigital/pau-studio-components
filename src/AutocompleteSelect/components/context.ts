import React from "react"
import { Action } from "../state/actions"
import { initialState, State } from "../state/state"

export const OptionContext = React.createContext<{
  state: State,
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => undefined
})
