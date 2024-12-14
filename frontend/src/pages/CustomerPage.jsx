import PageTemplate from "../layout/PageTemplate";
import React from "react";
import CustomerContent from "../components/customer/CustomerContent";


function CustomerPage() {
  return <PageTemplate content={<CustomerContent />} />; 
}

export default CustomerPage
