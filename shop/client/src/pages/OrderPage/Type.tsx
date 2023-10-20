import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';
import { OrderType } from '../../types/common';
import { OrderContext } from '../../contexts/OrderContext';
import { Constants } from '../../constants/common';

type Props = {
  orderType: OrderType;
};

const Type = ({ orderType }: Props) => {
  const [items, setItems] = useState<{ name: string; imagePath: string }[]>([]);
  const [error, setError] = useState(false);
  const {
    orderDatas: { totals },
    updateItemCounts,
  } = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: Props['orderType']) => {
    try {
      let response = await axios.get(`http://localhost:5001/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const ItemComponents = orderType === 'products' ? Products : Options;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium">주문 종류</h2>
      <p>개당 가격 : {Constants.pricePerItem[orderType]}</p>
      <p>
        {orderType === 'products' ? '상품' : '옵션'} 총 가격 : {totals[orderType]}
      </p>
      <div className={`flex ${orderType === 'products' ? 'flex-row' : 'flex-col'} gap-2`}>
        {items.map((item) => (
          <ItemComponents
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCounts={updateItemCounts}
          />
        ))}
      </div>
    </div>
  );
};

export default Type;
