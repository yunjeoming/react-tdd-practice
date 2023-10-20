import React from 'react';

type Props = {
  name: string;
  imagePath: string;
};

const Products = ({ name, imagePath }: Props) => {
  return (
    <div className="flex flex-col gap-2 border p-2">
      <img alt={`${name} product`} src={`http://localhost:5001/${imagePath}`} className="object-contain" />
      <form className="flex items-center gap-2">
        <label>{name}</label>
        <input type="number" name="quantity" min="0" defaultValue={0} className="border rounded-md p-1" />
      </form>
    </div>
  );
};

export default Products;
