import React from 'react';
import Type from './Type';

const OrderPage = () => {
  return (
    <div>
      <h2>Travel Product</h2>
      <div>
        <Type orderType="products" />
      </div>

      <div className="flex [&>*]:flex-1">
        <div>
          <Type orderType="options" />
        </div>
        <div>
          <h2>
            Total Price: <br />
          </h2>
          <button>주문</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
