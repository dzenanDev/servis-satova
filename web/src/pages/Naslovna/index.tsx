import { Carousel } from 'antd';
import React from 'react';
import classes from './index.module.css';
import { CONFIG } from '~/config';
import { Fragment } from 'react';
import { Typography, Divider, Button } from 'antd';
import fetchHelper from '@utils/apiHelper';
import Message from '../../components/mail/index';

const DashboardPage = () => {
  const { Title, Paragraph, Text, Link } = Typography;

  const generateCsvReversi = async () => {
    await fetchHelper(`/api/generateCsvRe`);
    window.open(
      `${CONFIG.csvDownloadUrl}/test.csv`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const generateCsvDijelovi = async () => {
    await fetchHelper(`/api/generateCsvDi`);
    window.open(
      `${CONFIG.csvDownloadUrl}/test.csv`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const generateCsvNarucbe = async () => {
    await fetchHelper(`/api/generateCsvNa`);
    window.open(
      `${CONFIG.csvDownloadUrl}/test.csv`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Fragment>
      <Carousel autoplay>
        <div>
          <div className={classes.contentStyle1}></div>
        </div>
        <div>
          <div className={classes.contentStyle2}></div>
        </div>
        <div>
          <div className={classes.contentStyle3}></div>
        </div>
        <div>
          <div className={classes.contentStyle4}></div>
        </div>
      </Carousel>

      <Title>Introduction</Title>

      <Paragraph>
        <Text strong>
          This application is used solely to facilitate the operation of the
          service department. Uses all deficiencies identified during business,
          a common database with approved access from each business unit. The
          administrator reserves the right to delete confidential data from the
          database, as a client you are only able to search or add an order,
          part or watch to the service. We also left the option to print data
          from the database. Also below is a contact form where you can contact
          us with any inquiry.
        </Text>
      </Paragraph>

      <Title level={2}>Purpose of the program</Title>
      <Paragraph>
        The Service application is a business facilitation with the watch
        service department. It meets the following shortcomings noticed during
        business:
      </Paragraph>

      <Paragraph>
        <ul>
          <li>
            <Link href="../Rezervni">-Online overview of all spare parts</Link>
          </li>
          <li>
            <Link href="../Narudbe">
              -Online inspection of watches for service
            </Link>
          </li>
          <li>
            <Link href="/Reversi">-Online order tracking</Link>
          </li>
        </ul>
      </Paragraph>
      <Paragraph>
        We also have the option of adding and editing spare parts, adding and
        deleting watches for service, adding and deleting orders.
      </Paragraph>
      <Title level={2}>Throw out the current tables in exel</Title>
      <Paragraph>
        Using the buttons left below, you can get the current state of the
        database (parts, orders and watches for service) in excel for download
        and print.
      </Paragraph>
      <Button
        type="primary"
        style={{ margin: '15px' }}
        onClick={generateCsvReversi}
      >
        Generate CSV Reversi
      </Button>

      <Button
        type="primary"
        style={{ margin: '15px' }}
        onClick={generateCsvDijelovi}
      >
        Generate CSV Dijelovi
      </Button>

      <Button
        type="primary"
        style={{ margin: '15px' }}
        onClick={generateCsvNarucbe}
      >
        Generate CSV Narudbe
      </Button>

      <Divider />
      <Title>Send us an email</Title>
      <Paragraph>
        You have the option to contact us by email. You are not obliged to enter
        your e-mail address, just fill out the form and write your inquiry. You
        will be contacted as soon as your inquiry is considered.
      </Paragraph>

      <Message />
    </Fragment>
  );
};

export default DashboardPage;
