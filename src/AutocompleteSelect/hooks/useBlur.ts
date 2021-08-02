import { useContext, useEffect } from "react"
import { OptionContext } from "../components/context"
import { toggleOptions } from "../state/actions"

export const useBlur = (ref: any) => {
  const { dispatch } = useContext(OptionContext)

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log("testeresedqs")
      dispatch(toggleOptions(false))
    }
  }

  return handleClickOutside
}
