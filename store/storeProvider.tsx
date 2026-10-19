'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { makeStore } from './store';

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const [store] = useState(makeStore);

  useEffect(() => setupListeners(store.dispatch), [store]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
