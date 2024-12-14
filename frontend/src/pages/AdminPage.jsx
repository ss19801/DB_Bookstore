import PageTemplate from "../layout/PageTemplate";
import React from "react";
import AdminContent from "../components/admin/AdminContent";

function AdminPage() {
  return <PageTemplate content={<AdminContent />} />;
}

export default AdminPage;
