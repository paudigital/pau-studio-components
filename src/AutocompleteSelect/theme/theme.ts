export const theme = {
  fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
  borderRadius: "4px",
  colors: {
    neutral: {
      white: "#ffffff",
      cream: "#f6f6f6",
      ash: "#ededed",
      silver: "#e2e2e2",
      gainsboro: "#dcdcdc",
      gray: "#aaaaaa",
      darkgray: "#808080",
      black: "#000000"
    },
    background: "#fff",
    input: {
      background: "#fff"
    },
    border: "#000",
    borderBottomOpen: "#424242",
    borderRadius: "0",
    color: "#000",
    focused: {
      background: "#e4eded",
      color: "#d46030"
    },
    selected: {
      background: "#ddd",
      color: "#33aadd"
    },
    disabled: {
      background: "#e4e4e4",
      color: "#808080"
    }
  }
}

export type Theme = {
  fontFamily?: string,
  background?: string
  input?: {
    background?: string
  }
  border?: string
  borderBottomOpen?: string
  borderRadius?: string
  color?: string
  focused?: {
    background?: string
    color?: string
  }
  selected?: {
    background?: string
    color?: string
  }
  disabled?: {
    background?: string
    color?: string
  }
}

// export const getColorScheme = (currentTheme: THEME): Theme =>
//   currentTheme === THEME.DARK ? theme.colors.dark : theme.colors.standard

// export enum THEME {
//   DARK,
//   LIGHT,
//   NEUTRAL,
//   STANDARD
// }
