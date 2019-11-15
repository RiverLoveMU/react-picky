import * as React from 'react';
import { isDataObject } from './lib/utils';
import { OptionType, ComplexOptionType } from './types';

type OptionProps = {
  isSelected: boolean;
  valueKey?: string;
  labelKey?: string;
  id: string;
  item: OptionType;
  style?: React.CSSProperties;
  selectValue(option: OptionType): void;
  multiple: boolean;
  tabIndex: number | undefined;
  disabled: boolean;
};
const Option: React.FC<OptionProps> = React.memo(
  ({
    id,
    item,
    isSelected,
    labelKey,
    valueKey,
    selectValue,
    style,
    multiple,
    tabIndex,
    disabled,
  }) => {
    const cssClass = isSelected ? 'option selected' : 'option';
    const body = isDataObject(item, labelKey, valueKey)
      ? (item as ComplexOptionType)[labelKey!]
      : item;
    const inputType = multiple ? 'checkbox' : 'radio';
    const select = () => !disabled && selectValue(item);

    return (
      <div
        tabIndex={tabIndex}
        id={id}
        role="option"
        style={style}
        data-testid="option"
        data-selected={isSelected ? 'selected' : ''}
        aria-selected={isSelected}
        className={cssClass}
        onClick={select}
        onKeyPress={e => {
          e.preventDefault();
          if (!disabled) {
            selectValue(item);
          }
        }}
      >
        <input
          type={inputType}
          readOnly
          tabIndex={-1}
          disabled={disabled}
          checked={isSelected}
          aria-label={body}
          data-testid={'option-checkbox'}
        />
        {body}
      </div>
    );
  },
  areEqual
);

Option.displayName = 'Picky(Option)';

function areEqual(prevProps: OptionProps, nextProps: OptionProps) {
  return (
    prevProps.multiple === nextProps.multiple &&
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.id === nextProps.id &&
    prevProps.item === nextProps.item &&
    prevProps.tabIndex === nextProps.tabIndex &&
    prevProps.disabled === nextProps.disabled
  );
}
export { Option };
