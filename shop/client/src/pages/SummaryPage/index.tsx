import React, { MouseEvent, useCallback, useContext, useState } from 'react';
import { OrderContext } from '../../contexts/OrderContext';
import { PageProps } from '../../types/common';

const SummaryPage = ({ setStep }: PageProps) => {
  const { orderDatas } = useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  const handleSubmit = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      setStep && setStep(2);
    },
    [setStep]
  );

  return (
    <div className="flex flex-col justify-end items-center pt-20">
      <div className="flex flex-col gap-4 border rounded-sm p-10">
        <h1 className="text-3xl font-medium">주문 확인</h1>
        <section>
          <h2 className="text-xl font-medium">여행 상품 : {orderDatas.totals.products}</h2>
          {Array.from(orderDatas.products).map(([key, value]) => (
            <li key={key}>
              {value} {key}
            </li>
          ))}
        </section>
        {orderDatas.options.size > 0 && (
          <section>
            <h2 className="text-xl font-medium">옵션 상품 : {orderDatas.totals.options}</h2>
            {Array.from(orderDatas.options.keys()).map((key) => (
              <li key={key}>{key}</li>
            ))}
          </section>
        )}
        <form className="flex flex-col items-start gap-2">
          <div>
            <input
              type="checkbox"
              id="confirm-checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="confirm-checkbox">주문내역을 확인하셨나요?</label>
          </div>
          <button
            type="submit"
            disabled={!checked}
            className={`p-2 rounded-sm border ${checked ? 'bg-blue-500 text-white' : 'bg-gray-300 opacity-50'}`}
            onClick={handleSubmit}
          >
            주문 확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SummaryPage;
