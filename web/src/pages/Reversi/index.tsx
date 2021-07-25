import React, { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import fetchHelper from '@utils/apiHelper';
import TableView, { PropsTV } from './table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const ItemsPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<PropsTV>();
  const { Search } = Input;
  const loadTableData = async (page?: number, pageSize?: number) => {
    try {
      let res = await fetchHelper(
        `/api/reversi?page=${page}&perPage=${pageSize}`
      );
      setLoading(false);
      setTableData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onTableChange = (page?: number, pageSize?: number) => {
    loadTableData(page, pageSize);
  };

  useEffect(() => {
    loadTableData(1, 10);
  }, []);

  const onSearch = async (value: any) => {
    try {
      let res = await fetchHelper(`/api/searchR/${value}`);
      setLoading(false);
      setTableData(res);
      console.log(tableData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Search
        placeholder="Input revers number for search"
        onSearch={onSearch}
        enterButton
        name="value"
        style={{ marginBottom: '10px' }}
      />
      <TableView
        loading={loading}
        data={tableData?.data}
        pagination={tableData?.pagination}
        onChange={onTableChange}
      />
    </>
  );
};

export default ItemsPage;
