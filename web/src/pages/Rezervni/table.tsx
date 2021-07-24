// import * as React from "react";
import React, { FC } from 'react';
import { Table, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { store } from '../../redux/store';

import fetchHelper from '@utils/apiHelper';

interface User {
  id: string;
  title: string;
  category: string;
  layer: string;
}

export interface PropsTV {
  loading?: boolean;
  data?: Array<User>;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
  };
  onChange: (page?: number, pageSize?: number) => void;
}

const TableView: FC<PropsTV> = ({
  loading,
  data,
  pagination,
  onChange,
}: PropsTV) => {
  function cancel(e: any) {
    console.log(e);
    message.error('Click on No');
  }
  const columns: ColumnsType<User> = [
    {
      key: 'brend',
      title: 'Brend',
      dataIndex: 'brend',
    },
    {
      key: 'sifra',
      title: 'Sifra',
      dataIndex: 'sifra',
    },
    {
      key: 'artikal',
      title: 'Artikal',
      dataIndex: 'artikal',
    },
    {
      key: 'opis',
      title: 'Opis',
      dataIndex: 'opis',
    },
    {
      key: 'cijena',
      title: 'Cijena',
      dataIndex: 'cijena',
    },
    {
      key: 'komada',
      title: 'Komada',
      dataIndex: 'komada',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: record => {
        const deleteItem = async () => {
          await fetchHelper(`/api/delDio/${record.id}`, '', {
            method: 'DELETE',
          });
          onChange(1, 10);
          message.success('Revers uspjesno izbrisan !');
        };
        const admin: any = store.getState().auth.isAdmin;
        return (
          <div>
            <Link to={`${record.id}`}>
              <Button type="primary" disabled={!admin.isAdmin}>
                Edit
              </Button>
            </Link>
            <Popconfirm
              title="Are you sure to delete this task?"
              onCancel={cancel}
              onConfirm={deleteItem}
              okText="Yes"
              cancelText="No"
            >
              <Button disabled={!admin.isAdmin} type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="tableView">
      <Table<User>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          ...pagination,
          onChange: onChange,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: true,
          defaultPageSize: 5,
          position: ['bottomCenter'],
        }}
      />
      {/* <Table<User> dataSource={data}>
        <Table.Column<User> key="title" title="Title" dataIndex="title" />
        <Table.Column<User> key="category" title="category" dataIndex="category" />
        <Table.Column<User> key="layer" title="layer" dataIndex="layer" />
      </Table> */}
    </div>
  );
};

export default TableView;
