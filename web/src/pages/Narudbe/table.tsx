import React, { FC } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { store } from '../../redux/store';

import fetchHelper from '@utils/apiHelper';

interface Zone {
  id: string;
  zipcode: number;
  zone: string;
  trange: string;
  zoneTitle: string;
}

export interface PropsTV {
  loading?: boolean;
  data?: Array<Zone>;
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

  const columns: ColumnsType<Zone> = [
    {
      key: 'imePrezime',
      title: 'Ime i Prezime',
      dataIndex: 'imePrezime',
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
      key: 'poslovnica',
      title: 'Poslovnica',
      dataIndex: 'poslovnica',
    },
    {
      key: 'narucbaOpis',
      title: 'Opis Narudbe',
      dataIndex: 'narucbaOpis',
    },
    {
      key: 'sifra',
      title: 'Sifra sata',
      dataIndex: 'sifra',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: record => {
        const deleteNarudbu = async () => {
          await fetchHelper(`/api/delNarudbu/${record.id}`, '', {
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
            onConfirm={deleteNarudbu}
            okText="Yes"
            cancelText="No"
          >
            <Button disabled={!admin.isAdmin} type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div className="tableView">
      <Table<Zone>
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
