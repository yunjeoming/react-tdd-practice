import React, { useCallback, useContext } from 'react';
import Type from './Type';
import { OrderContext } from '../../contexts/OrderContext';
import { PageProps } from '../../types/common';

const OrderPage = ({ setStep }: PageProps) => {
  const {
    orderDatas: { totals },
  } = useContext(OrderContext);

  const handleClick = useCallback(() => {
    setStep && setStep(1);
  }, [setStep]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-3xl font-medium">Travel Product</h2>
      <div>
        <Type orderType="products" />
      </div>

      <div className="flex [&>*]:flex-1">
        <div>
          <Type orderType="options" />
        </div>
        <div>
          <h2 className="text-xl">
            Total Price: {totals.total}
            <br />
          </h2>
          <button className="bg-blue-500 text-white p-2 rounded-sm" onClick={handleClick}>
            주문 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
