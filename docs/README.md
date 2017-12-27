# Picky ☜

[![Build Status](https://travis-ci.org/Aidurber/react-picky.svg?branch=master)](https://travis-ci.org/Aidurber/react-picky)
[![codecov](https://codecov.io/gh/Aidurber/react-picky/branch/master/graph/badge.svg)](https://codecov.io/gh/Aidurber/react-picky)
[![license](https://img.shields.io/github/license/aidurber/react-picky.svg)]()
[![npm version](https://badge.fury.io/js/react-picky.svg)](https://badge.fury.io/js/react-picky)

Yet another React select list.

## Motivation

When dealing with medium+ length select lists, especially multi-select lists. The common approach is to use tags e.g.

![Tag List](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-tag-list.JPG)

Source: [React-Select by Jed Watson](https://github.com/JedWatson/react-select)

This approach is fine for smaller lists. When you have options for 20, 30, 100+ options that the use can select, it becomes unmanigable.

For example you have a internal staff mailing list. You want to mail all staff in a department (30 employees). You select all. That would be 30 tags taking unneccessary space.

This is a multiselect with checkboxes, a select all option, and a filter. Along a similar vein as [David Stutz's Bootstrap Multiselect](http://davidstutz.github.io/bootstrap-multiselect/). There is a port of that library to react with [Skratchdot's React Bootstrap Multiselect](https://github.com/skratchdot/react-bootstrap-multiselect). However I don't want a dependency on jQuery. If you are already using jQuery that might be an alternative for you.

If you like the tag list like [React-Select](https://github.com/JedWatson/react-select), then that would be a great option for you. It's a really great, well-tested library. Give it a look.

# Peer Dependencies

```
 "prop-types": "^15.6.0",
 "react": "^16.2.0",
 "react-dom": "^16.2.0"
```

# Installation

```
  npm install --save react-picky
  # or
  yarn add react-picky
```

# Screenshots

## Single Select

![Single select](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-single-select.png)

## Multi Select

![Multi select](https://raw.githubusercontent.com/aidurber/react-picky/master/readme-mukti-select.jpg)

# Usage

## Basic example

```javascript
import Picky from 'react-picky';
import 'react-picky/dist/picky.css'; // Include CSS

<Picky
  options={[1, 2, 3, 4, 5]}
  value={[]}
  multiple={true}
  includeSelectAll={true}
  includeFilter={true}
  onChange={values => console.log(values)}
  dropdownHeight={600}
/>;
```

### Sandbox

[![Edit x9mwo7318q](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/x9mwo7318q)

## Props

```javascript
Picky.defaultProps = {
  numberDisplayed: 3,
  options: [],
  filterDebounce: 150,
  dropdownHeight: 300,
  onChange: () => {},
  itemHeight: 35
};
Picky.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  numberDisplayed: PropTypes.number,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  open: PropTypes.bool,
  includeSelectAll: PropTypes.bool,
  includeFilter: PropTypes.bool,
  filterDebounce: PropTypes.number,
  dropdownHeight: PropTypes.number,
  onFiltered: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  render: PropTypes.func,
  itemHeight: PropTypes.number
};
```

### Prop descriptions

* `placeholder` - Default message when no items are selected.
* `value` - The selected value(s), array if multiple is true.
* `numberDisplayed` - Then number of selected options displayed until it turns into '(selected count) selected'.
* `multiple` - Set to true for a multiselect, defaults to false.
* `options` - Array of possible options.
* `onChange` - Called whenever selected value(s) have changed. This is a controlled component. Pass the selected value back into `value`.
* `open` - Can open or close the dropdown manually. Defaults to false.
* `includeSelectAll` - If set to `true` will add a `Select All` checkbox at the top of the list.
* `includeFilter` - If set to `true` will add an input at the top of the dropdown for filtering the results.
* `filterDebounce` - Debounce timeout, used to limit the rate the internal `onFilterChange` gets called. Defaults to 150ms.
* `dropdownHeight` - The height of the dropdown. Defaults to 300px.
* `onFiltered` - Called after a filter has been done with the filtered options.
* `onOpen` - Called after the dropdown has opened.
* `onClose` - Called after the dropdown has closed.
* `valueKey` - If supplying an array of objects as options, this is required. It's used to identify which property on the object is the value.
* `labelKey` - If supplying an array of objects as options, this is required. It's used to identify which property on the object is the label.
* `render` - Used for custom rendering of items in the dropdown. More info below.
* `itemHeight` - Used when dropdown item height is larger than 35px. This is so the virtualised list can calculate correctly.

## Custom rendering

You can render out custom items for the dropdown.

**Example**

```javascript
<Picky
  value={this.state.arrayValue}
  options={oneToOneThousand}
  onChange={this.selectMultipleOption}
  open={false}
  valueKey="id"
  labelKey="name"
  multiple={true}
  includeSelectAll={true}
  includeFilter={true}
  dropdownHeight={600}
  itemHeight={50}
  render={({
    style,
    isSelected,
    item,
    selectValue,
    labelKey,
    valueKey,
    multiple
  }) => {
    return (
      <li
        style={style} // required
        className={isSelected ? 'selected' : ''} // required to indicate is selected
        key={item[valueKey]} // required
        onClick={() => selectValue(item)}
      >
        {' '}
        // required to select item
        <input type="checkbox" checked={isSelected} readOnly />
        <span style={{ fontSize: '30px' }}>{item[labelKey]}</span>
      </li>
    );
  }}
/>
```

The render callback gets called with the following properties:
style, isSelected, item, labelKey, valueKey, selectValue, multiple

* `style` - object - used by react-tiny-virtual-list for rendering out the items. It needs these to calculate the items location and size. This is required.
* `isSelected` - boolean - true if item is selected. Use this for styling accordingly.
* `item` - object | number | string - The item to render.
* `labelKey` - Used to get the label if item is an object
* `valueKey` - Used to get the value if item is an object, good for keys.
* `selectValue` - function(item) - Selects the item on click
* `multiple` - boolean - Indicates if is a multiselect.

**Note**

* If your rendered item affects the height of the item in anyway. Supply `itemHeight` to Picky.
* If you wish to show a radio button or a checkbox, be sure to add `readOnly` prop to the input.

# Internals

The component uses [React Tiny Virtual List](https://github.com/clauderic/react-tiny-virtual-list) for rendering out the items. This is a for a performance gain. You can have 1,000,000 items in the dropdown with no performance drop! It's such a great little library. This is why we have a dropdown height.