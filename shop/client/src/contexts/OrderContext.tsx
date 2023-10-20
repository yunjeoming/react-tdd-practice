import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { OrderType } from '../types/common';
import { Constants } from '../constants/common';

type Props = {
  children: ReactNode;
};

type OrderCountsType = {
  products: Map<string, number>;
  options: Map<string, number>;
};

const initOrderCounts = {
  products: new Map<string, number>(),
  options: new Map<string, number>(),
};

const initTotals = {
  products: 0,
  options: 0,
  total: 0,
};

export type OrderContextType = {
  orderDatas: OrderCountsType & {
    totals: typeof initTotals;
  };
  updateItemCounts: (...props: any) => void;
  resetOrderDatas: () => void;
};

export const OrderContext = createContext<OrderContextType>({
  orderDatas: { ...initOrderCounts, totals: initTotals },
  updateItemCounts: (...props: any) => {},
  resetOrderDatas: () => {},
});

function calculateSubtotal(orderType: OrderType, orderCounts: OrderCountsType) {
  let optionCount = 0;
  for (let count of orderCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * Constants.pricePerItem[orderType];
}

const OrderContextProvider = ({ children }: Props) => {
  const [orderCounts, setOrderCounts] = useState<OrderCountsType>(initOrderCounts);
  const [totals, setTotals] = useState(initTotals);

  useEffect(() => {
    const productsTotal = calculateSubtotal('products', orderCounts);
    const optionsTotal = calculateSubtotal('options', orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateItemCounts = (itemName: string, newItemCounts: string, orderType: OrderType) => {
      const newOrderCounts = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCounts));
      setOrderCounts(newOrderCounts);
    };

    const resetOrderDatas = () => {
      setOrderCounts({
        products: new Map<string, number>(),
        options: new Map<string, number>(),
      });
      setTotals({
        products: 0,
        options: 0,
        total: 0,
      });
    };

    return {
      orderDatas: {
        ...orderCounts,
        totals,
      },
      updateItemCounts,
      resetOrderDatas,
    };
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export default OrderContextProvider;
