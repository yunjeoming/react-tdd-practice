import React, { ChangeEvent, useCallback } from 'react';
import { OrderType } from '../../types/common';

type Props = {
  name: string;
  updateItemCounts: (itemName: string, newItemCounts: string, orderType: OrderType) => void;
};

const Options = ({ name, updateItemCounts }: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      updateItemCounts(name, isChecked ? '1' : '0', 'options');
    },
    [name, updateItemCounts]
  );

  return (
    <form>
      <input type="checkbox" id={`${name} option`} onChange={handleChange} />
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
