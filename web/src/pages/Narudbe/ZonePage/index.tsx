import React, { FC, useState, useEffect } from 'react';
import { Timeline, Row, Col, Typography } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  WarningFilled,
  InfoCircleFilled,
} from '@ant-design/icons';
import klix from '@assets/images/klix.png';
import styles from './index.module.less';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SubPageCmpSet from './subPages/cmp-set';
import SubPageServingScript from './subPages/serving-script';
import SubPageDebug from './subPages/debug';
import SubPageAdUnits from './subPages/ad-units';
import SubPageAdsTxt from './subPages/ads-txt';

const { Title, Text } = Typography;

function useQuery() {
  return new URLSearchParams(useLocation().search).get('step');
}

const defaultComponent = 'cmp-set';
const componentMapping: any = {
  'cmp-set': SubPageCmpSet,
  'serving-script': SubPageServingScript,
  debug: SubPageDebug,
  'ad-units': SubPageAdUnits,
  'ads-txt': SubPageAdsTxt,
};

const ItemPage: FC = () => {
  const { pathname } = useLocation();
  const query = useQuery();

  const [currentComponent, setCurrentComponent] = useState<string>(
    query || defaultComponent
  );

  useEffect(() => {
    if (query) {
      setCurrentComponent(query);
    }
  }, [query]);

  const renderComponent = (name: string) => {
    let Component = componentMapping[name];
    if (!Component) {
      Component = componentMapping[defaultComponent];
    }

    return <Component />;
  };
  return (
    <>
      <Row>
        <Col lg={4} className={styles.timelineSidebar}>
          <div className={styles.timelineTitle}>
            <img alt="Klix" src={klix} />
            <Text>Klix.ba</Text>
          </div>
          <Timeline className={styles.timeline}>
            <Timeline.Item
              dot={<CheckCircleFilled />}
              color="green"
              className={`${currentComponent == 'cmp-set' && 'active'}`}
            >
              <Link to={`${pathname}?step=cmp-set`}>CMP Set</Link>
              <Text>Lorem ipsum dolor sit ame</Text>
            </Timeline.Item>
            <Timeline.Item
              dot={<CloseCircleFilled />}
              color="red"
              className={`${currentComponent == 'ads-txt' && 'active'}`}
            >
              <Link to={`${pathname}?step=ads-txt`}>Ads.txt</Link>
              <Text>Lorem ipsum dolor sit ame</Text>
            </Timeline.Item>
            <Timeline.Item
              dot={<WarningFilled />}
              color="orange"
              className={`${currentComponent == 'serving-script' && 'active'}`}
            >
              <Link to={`${pathname}?step=serving-script`}>Serving Script</Link>
              <Text>Lorem ipsum dolor sit ame</Text>
            </Timeline.Item>
            <Timeline.Item
              dot={<CheckCircleFilled />}
              color="green"
              className={`${currentComponent == 'ad-units' && 'active'}`}
            >
              <Link to={`${pathname}?step=ad-units`}>Ad units</Link>
              <Text>Lorem ipsum dolor sit ame</Text>
            </Timeline.Item>
            <Timeline.Item
              dot={<InfoCircleFilled />}
              color="gray"
              className={`${currentComponent == 'debug' && 'active'}`}
            >
              <Link to={`${pathname}?step=debug`}>Debug</Link>
              <Text>Lorem ipsum dolor sit ame</Text>
            </Timeline.Item>
          </Timeline>
        </Col>
        <Col lg={20}>
          <div className={styles.mainContent}>
            {renderComponent(currentComponent)}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ItemPage;
