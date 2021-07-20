import styled from "styled-components"

export const StyledSuggestion = styled.option<{
  disabled?: boolean
  isFocused: boolean
  isSelected: boolean
}>`
  position: relative;
  flex: 1;
  list-style-type: none;
  margin: 0;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid transparent;
  color: ${props => {
    if (props.disabled) return props.theme.colors.disabled.color
    if (props.isSelected) return props.theme.colors.selected.color
    if (props.isFocused) return props.theme.colors.focused.color
    if (props.isFocused) return "hsl(180, 20%, 80%)"
  }};
  background: ${props =>
    props.disabled
      ? props.theme.colors.disabled.background
      : props.isFocused
      ? props.theme.colors.focused.background
      : props.theme.colors.background};
  padding: 0.8rem ${props => (props.isSelected ? "2.5rem" : "1rem")};
  font-style: ${props => props.disabled && "italic"};
  font-variant: ${props => props.isSelected && "all-small-caps"};
  font-weight: ${props => props.isSelected && "bold"};
  overflow: revert;
  font-size: 2rem;

  outline: none;
  cursor: ${props => props.disabled && "not-allowed"};
  text-decoration: ${props => props.disabled && "line-through"};
`
