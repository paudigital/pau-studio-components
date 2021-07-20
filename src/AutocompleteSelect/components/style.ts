import styled from "styled-components"

export const StyledWrapper = styled.div`
  display: flex;
  font-family: ${props =>
    props.theme.font ||
    "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"};
  flex-direction: column;
  max-width: 100%;
  background: ${props => props.theme.background};
  padding: 0 5rem;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  position: relative;
`
