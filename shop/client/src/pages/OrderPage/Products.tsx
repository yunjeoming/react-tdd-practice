import React, { ChangeEvent, useCallback } from 'react';
import { OrderType } from '../../types/common';

type Props = {
  name: string;
  imagePath: string;
  updateItemCounts: (itemName: string, newItemCounts: string, orderType: OrderType) => void;
};

const Products = ({ name, imagePath, updateItemCounts }: Props) => {
  const handleChange = useCallback(
    (event: ChangeEvent) => {
      const currentValue = (event?.target as HTMLInputElement).value;
      updateItemCounts(name, currentValue, 'products');
    },
    [name, updateItemCounts]
  );

  return (
    <div className="flex flex-col gap-2 border p-2">
      <img alt={`${name} product`} src={`http://localhost:5001${imagePath}`} className="object-contain" />
      <form className="flex items-center gap-2">
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type="number"
          name="quantity"
          min="0"
          defaultValue={0}
          onChange={handleChange}
          className="border rounded-md p-1"
        />
      </form>
    </div>
  );
};

export default Products;
