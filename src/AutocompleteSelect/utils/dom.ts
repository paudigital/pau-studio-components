export const focus = (id: string) => getElement(id)?.focus()
export const blur = (id: string) => getElement(id)?.blur()
export const getElement = (id: string) => document.getElementById(id)
