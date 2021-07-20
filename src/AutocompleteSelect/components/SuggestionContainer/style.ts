import styled from "styled-components"

export const SuggestionsContainer = styled.div<{
  isVisible: boolean;
  scrollable: boolean;
  suggestionAmount: number;
}>`
  display: ${props => props.isVisible ? "flex" : "none"};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  background: ${props => props.theme.background};
  border: 2px solid ${props => props.theme.border};
  border-top-color: ${props => props.isVisible ? props.theme.divider : "transparent"};
  border-top: 0;
  border-bottom-left-radius: ${props => props.theme.borderRadius};
  border-bottom-right-radius: ${props => props.theme.borderRadius};
  max-height: ${props => props.suggestionAmount * 4.05}rem;
  overflow-x: hidden;
  overflow-y: ${props => props.scrollable ? "scroll" : "hidden"};
`
