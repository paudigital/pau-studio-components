import styled from "styled-components"

export const StyledInput = styled.input<{ areSuggestionVisible: boolean }>`
outline: none;
position: relative;
font-size: 2rem;
padding: .5rem 1rem;
border: 2px solid ${props => props.theme.border};
border-bottom-color: ${props => props.areSuggestionVisible && props.theme.borderBottomOpen};
border-radius: ${props => props.theme.borderRadius};
border-bottom-left-radius: ${props => props.areSuggestionVisible && 0 };
border-bottom-right-radius: ${props => props.areSuggestionVisible && 0 };

&:hover, &:focus{
  border-color: ${props => props.theme.border};
}
`
