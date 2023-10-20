import React from 'react';

type Props = {
  name: string;
  imagePath: string;
};

const Products = ({ name, imagePath }: Props) => {
  return (
    <div>
      <img alt={`${name} product`} src={`http://localhost:5000/${imagePath}`} />
      <form>
        <label>{name}</label>
        <input type="number" name="quantity" min="0" defaultValue={0} />
      </form>
    </div>
  );
};

export default Products;
