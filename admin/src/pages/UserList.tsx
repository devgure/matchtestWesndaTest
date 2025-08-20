// admin/src/pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'isPremium', headerName: 'Premium', type: 'boolean' },
  { field: 'createdAt', headerName: 'Joined', width: 180 },
];

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/admin/users', { withCredentials: true }).then(res => setUsers(res.data));
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={users} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
}