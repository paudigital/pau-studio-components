import React from "react"
import { Story, Meta } from "@storybook/react"
import AutocompleteSelect, {
  AutoCompleteProps
} from "../AutocompleteSelect/components"

type Option = {
  disabled?: boolean
  label: string
  value: string
}

const AutocompleteTemplate: Story<AutoCompleteProps> = args => (
  <AutocompleteSelect {...args} />
)

export default {
  decorators: [
    (Story: any) => (
      <div style={{ margin: "1rem" }}>
        <Story />
      </div>
    )
  ],
  title: "AutocompleteSelect",
  component: AutocompleteTemplate,
  label: "Autocomplete",
  argTypes: {
    label: { table: { disable: false } },
    onKeyDown: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onClick: { table: { disable: true } },
    onFocus: { table: { disable: true } },
    onBlur: { table: { disable: true } },
    onAddOption: { table: { disable: true } }
  }
} as Meta

export const Autocomplete = AutocompleteSelect.bind({})

Autocomplete.args = {
  label: "The Label",
  placeholder: "Placehoder",
  scrollableOptions: false,
  showDisabledOptions: false,
  options: [
    { label: "Test Item 1", value: "Test Item 1", disabled: false },
    { label: "Test Item 2", value: "Test Item 2", disabled: false },
    { label: "Test Item 3", value: "Test Item 3", disabled: false },
    { label: "Test Item 4", value: "Test Item 4", disabled: false },
    { label: "Test Item 5", value: "Test Item 5", disabled: false },
    { label: "Test Item 6", value: "Test Item 6", disabled: true },
    { label: "Test Item 7", value: "Test Item 7", disabled: false },
    { label: "Item 1", value: "Item 1", disabled: false },
    { label: "Item 2", value: "Item 2", disabled: true },
    { label: "Item 3", value: "Item 3", disabled: false },
    { label: "Item 4", value: "Item 4", disabled: false }
  ],
  isCaseSensitive: false,
  defaultOption: null,
  maxOptions: 10,
  noSuggestionsLabel: "Geen opties",
  onInputKeyDown: (e: React.KeyboardEvent, query: string, option?: Option) => {
    console.log(e, query, option)
  },
  onListKeyDown: (e: React.KeyboardEvent, option?: Option) => {
    console.log(e, option)
  },
  onChange: (c: React.KeyboardEvent, q: string) => {
    console.log(c, q)
  },
  onClick: (c: { type: string; event: React.MouseEvent }, o: any) => {
    console.log(c, o)
  },
  onBlur: (e: React.FocusEvent, option: Option | null) => {
    console.log(e, option)
  },
  onAddOption: (options: Option[], latestOption: Option) => {
    console.log(options, latestOption)
  }
}
