import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PageProps } from '../../types/common';
import axios from 'axios';
import { OrderContext, OrderContextType } from '../../contexts/OrderContext';
import ErrorBanner from '../../components/ErrorBanner';

const CompletePage = ({ setStep }: PageProps) => {
  const { orderDatas, resetOrderDatas } = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState<{ orderNumber: number; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const orderCompleted = useCallback(async (orderDatas: OrderContextType['orderDatas']) => {
    try {
      let response = await axios.post('http://localhost:5001/order', orderDatas);
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, []);

  useEffect(() => {
    console.log('rendering!');
    orderCompleted(orderDatas);
    //eslint-disable-next-line
  }, []);

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  const handleClick = useCallback(() => {
    resetOrderDatas();
    setStep && setStep(0);
  }, [setStep, resetOrderDatas]);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  return (
    <div>
      <h2 className="text-3xl font-medium">주문이 성공했습니다.</h2>
      <section>
        <h3 className="text-xl">이전 주문 내역</h3>
        <table>
          <thead>
            <tr>
              <th>order number</th>
              <th>order price</th>
            </tr>
          </thead>
          <tbody>{orderTable}</tbody>
        </table>
      </section>
      <button onClick={handleClick} className="bg-blue-500 text-white p-2 rounded-sm">
        첫 페이지로
      </button>
    </div>
  );
};

export default CompletePage;
