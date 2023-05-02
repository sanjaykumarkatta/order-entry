import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders } from '../slices/orderSlice';

const useOrderEntry = () => {
  const [orderCount, setOrderCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [action, setAction] = useState('Buy');
  const [symbol, setSymbol] = useState(null);
  const [filteredSymbols, setFilteredSymbols] = useState<any>(null);
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stopPrice, setStopPrice] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [orderType, setOrderType] = useState('Market');
  const [TIFType, setTIFType] = useState('DAY');

  const actionValues = ['Buy', 'Sell'];
  const symbolSuggestions = ['AAPL', 'MSFT', 'GOOGL', 'VZ', 'MMM', 'NFLX', 'FB', 'TWTR', 'AMZN', 'EBAY'];
  const TIFTypeValues = ['GTC', 'DAY', 'FOK', 'IOC'];
  const orderTypeValues = ['Market', 'Limit'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderType === 'Market' && symbol !== '' && symbol && symbolSuggestions.includes(symbol) && qty > 0) {
      setSubmitEnabled(true);
    } else if (orderType === 'Limit' && symbol !== '' && symbol && symbolSuggestions.includes(symbol) && qty > 0 && price > 0 && stopPrice > 0) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [orderType, symbol, qty, price, stopPrice]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setOrderCount((prevCount) => prevCount + 1);

    if (orderCount % 2 === 10) {
      alert('Order time has elapsed');
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const formData = {
          action,
          symbol,
          qty,
          price,
          stopPrice,
          orderType,
          TIFType,
          comment,
        };

        dispatch(setOrders(formData));
      }, 2000);
    }
  };

  const searchSymbol = (event: any) => {
    setTimeout(() => {
      let _filteredSymbols;
      if (!event.query.trim().length) {
        _filteredSymbols = [...symbolSuggestions];
      } else {
        _filteredSymbols = symbolSuggestions.filter((item) => {
          return item.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredSymbols(_filteredSymbols);
    }, 150);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
};

  return {
    isLoading,
    submitEnabled,
    actionValues,
    action,
    setAction,
    symbolSuggestions,
    symbol,
    setSymbol,
    filteredSymbols,
    searchSymbol,
    qty,
    setQty,
    price,
    setPrice,
    stopPrice,
    setStopPrice,
    comment,
    setComment,
    orderTypeValues,
    orderType,
    setOrderType,
    TIFTypeValues,
    TIFType,
    setTIFType,
    handleSubmit,
    handleKeyPress
  };
};

export default useOrderEntry;