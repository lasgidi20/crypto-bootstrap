import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  })
  useEffect(() => {
    if (currency === "USD") setSymbol("$"); 
    else if (currency === "GBP") setSymbol("£");
  }, [currency]); // run everytime currency changes


  const fetchCoins = async () => {
    setLoading(true);
    try {
    const  data = await axios.get("http://localhost:3000/api/coin-list");
    setCoins(data.data.payload);
      setLoading(false);
    } catch(error) {
      console.log(error)
    }
  };


  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins, loading, fetchCoins, alert, setAlert }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};