import React, { FC } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';

import moment from 'moment';
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
      key: 'ime',
      title: 'Ime',
      dataIndex: 'ime',
    },
    {
      key: 'broj',
      title: 'Broj',
      dataIndex: 'broj',
    },
    {
      key: 'datum',
      title: 'Datum',
      dataIndex: 'datum',
      render: datum => {
        return <p>{moment(datum).format('DD-MM-YYYY')}</p>;
      },
    },
    {
      key: 'kvar',
      title: 'Kvar',
      dataIndex: 'kvar',
    },
    {
      key: 'brojRev',
      title: 'BrojRev',
      dataIndex: 'brojRev',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: record => {
        const deleteRevers = async () => {
          await fetchHelper(`/api/delRevers/${record.id}`, '', {
            method: 'DELETE',
          });
          onChange(1, 10);
          message.success('Revers uspjesno izbrisan !');
        };
        const admin: any = store.getState().auth.isAdmin;
        return (
          <Popconfirm
            title="Are you sure to delete this task?"
            onCancel={cancel}
            onConfirm={deleteRevers}
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={!admin.isAdmin}
              type="primary"
              danger
              //  onClick={deleteRevers}
            >
              Delete
            </Button>
          </Popconfirm>
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
    </div>
  );
};

export default TableView;
