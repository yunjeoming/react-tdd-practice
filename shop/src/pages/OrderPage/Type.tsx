import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';

type Props = {
  orderType: 'products' | 'options';
};

const Type = ({ orderType }: Props) => {
  const [items, setItems] = useState<{ name: string; imagePath: string }[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: Props['orderType']) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
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
    <div>
      {items.map((item) => (
        <ItemComponents key={item.name} name={item.name} imagePath={item.imagePath} />
      ))}
    </div>
  );
};

export default Type;
