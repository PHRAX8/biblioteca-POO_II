import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import AppRoutes from './routes';
const backendUrl = process.env.REACT_APP_BACK_END_URI;

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    try {
      const response = await Axios.get(backendUrl+"/api");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
