import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70,height:20 },
  { field: 'farmer', headerName: 'Farmer', width: 70 },
  { field: 'crop', headerName: 'Crop', width: 130 },
  { field: 'veriety', headerName: 'Veriety', width: 130 },
  {
    field: 'day',
    headerName: 'Day',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',

    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {
    id: 1,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 2,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 3,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 4,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 5,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 6,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 7,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 8,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
  {
    id: 9,
    farmer: 'Jhon',
    crop: 'Grapes',
    veriety: 'ABC',
    day: 35,
    status: 'Average',
  },
];

export default function DataTable() {
  return (
    <div style={{height: 300,width: "57%"}}>
        <div>
            <p style={{fontWeight:'bold'}}>Recent Monitoring</p>
        </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
