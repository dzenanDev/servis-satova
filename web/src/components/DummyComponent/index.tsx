import React from 'react';
import { Typography } from 'antd';

import styles from './styles.module.scss';

const { Title } = Typography;

interface Props {
  title: string;
}

const DummyComponent: React.FC<Props> = ({ title }) => {
  return <Title className={styles.titleColor}>Welcome to {title}</Title>;
};

export default DummyComponent;
