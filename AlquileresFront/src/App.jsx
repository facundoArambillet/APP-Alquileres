import React from 'react';
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './views/Navbar';
import Index from './views/Index';
import Registration from './views/Registration';
import PropertyType from './views/property/PropertyTypes';
import UtilityTypes from './views/utility/UtilityTypes';
import Properties from './views/property/Properties';
import Tenants from './views/tenant/Tenants';
import Invoices from './views/invoice/Invoices';
import Utilities from './views/utility/Utilities';
import Expenses from './views/expense/Expenses';
import Footer from './views/Footer';

function App() {
  //current routing
  const location = useLocation();
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/registro" element={<Registration />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/propertyTypes" element={<PropertyType />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/utilities" element={<Utilities />} />
        <Route path="/UtilityTypes" element={<UtilityTypes />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}

    </>
  );
}

export default App
