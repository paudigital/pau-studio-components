import { Option } from "../types/option";
// add config to check validity of option o create
export const createOption = (v: string): Option => ({
  value: v,
  label: v,
  disabled: false
})
