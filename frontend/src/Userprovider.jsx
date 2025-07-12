import React, { createContext, useState, useEffect } from 'react';

const usercontext = createContext();

// Utility function to safely parse JSON from localStorage
const safeJSONParse = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return fallback;
  }
};

const Userprovider = ({ children }) => {
  const [enable, setEnable] = useState(() => safeJSONParse('enable', false));
  const [item, setItem] = useState(() => localStorage.getItem('item') || "");
  const [item2, setItem2] = useState(() => safeJSONParse('item2', false));
  const [email, setEmail] = useState(() => localStorage.getItem('email') || "");
  const [attr, setAttr] = useState(() => localStorage.getItem('attr') || "");
  const [myid, setMyid] = useState(() => localStorage.getItem('myid') || "");

  const [img, setImg] = useState(() => 
    safeJSONParse('img', { data: "", contentType: "" })
  );

  const [array, setArray] = useState(() => 
    safeJSONParse('array', [])
  );

  const [itemdetails, setItemdetails] = useState(() => 
    safeJSONParse('itemdetails', {
      itemid: "",
      brand: "",
      color: "",
      date: "",
      description: "",
      location: "",
      name: "",
      question: "",
      serialnumber: "",
      userid: ""
    })
  );

  useEffect(() => {
    localStorage.setItem('enable', JSON.stringify(enable));
  }, [enable]);

  useEffect(() => {
    localStorage.setItem('item', item);
  }, [item]);

  useEffect(() => {
    localStorage.setItem('item2', JSON.stringify(item2));
  }, [item2]);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('attr', attr);
  }, [attr]);

  useEffect(() => {
    localStorage.setItem('myid', myid);
  }, [myid]);

  useEffect(() => {
    localStorage.setItem('img', JSON.stringify(img));
  }, [img]);

  useEffect(() => {
    localStorage.setItem('itemdetails', JSON.stringify(itemdetails));
  }, [itemdetails]);

  useEffect(() => {
    localStorage.setItem('array', JSON.stringify(array));
  }, [array]);

  return (
    <usercontext.Provider
      value={{
        enable, setEnable,
        item, setItem,
        item2, setItem2,
        email, setEmail,
        attr, setAttr,
        itemdetails, setItemdetails,
        myid, setMyid,
        array, setArray,
        img, setImg
      }}
    >
      {children}
    </usercontext.Provider>
  );
};

export default Userprovider;
export { usercontext };
