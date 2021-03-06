import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useLocalStore, useObserver } from 'mobx-react';
import { Row, Col, Spin } from 'antd';
import { useUpdateEffect, useInViewport } from 'ahooks';
import { find, get } from 'lodash';
//
import { initializeStoreRedux } from 'store-redux';
import { serverRenderClock } from 'store-redux/timer/action';
import { useStoreMobx } from 'store-mobx';
import { getIndex, getIndexEntry, getCoinMdw } from '@/fetchMdw/index';
import CEntry from 'components/Entry';
import CBanner from 'components/Banner';
import CRight from 'components/Right';
import CRCSearch from 'components/Right/components/Search';
import CRCHotkey from 'components/Right/components/Hotkey';
import CRCUser from 'components/Right/components/User';
//
const PageIndex = ({ banner, works, hotkey, user }) => {
  // store redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serverRenderClock());
  }, []);
  //
  const moreRef = useRef(null);
  const inViewPort = useInViewport(moreRef);
  const [top, setTop] = useState(80);
  const [worksMore, setWorksMore] = useState({ ...works });
  const [loadingEntry, setLoadingEntry] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  //
  const fetchApiArticle = async () => {
    const [err, res] = await getIndexEntry(page);
    const listWorks = [...worksMore.datas, ...res.datas];
    setLoadingEntry(false); // loading
    setHasMore(!res.over); // 是否还有
    setWorksMore({ ...res, datas: listWorks });
  };
  // page更新后执行
  useUpdateEffect(() => {
    if (page !== 0) {
      fetchApiArticle();
    }
  }, [page]);
  // 监听
  useEffect(() => {
    if (inViewPort && hasMore) {
      setLoadingEntry(true);
      setPage(page + 1);
      // console.log('page', page);
    }
  }, [inViewPort]);

  return useObserver(() => (
    <>
      <div className='container'>
        <Row>
          <Col xs={24} sm={16} className='mb20'>
            <CBanner toProps={banner} />
            <Spin spinning={loadingEntry}>
              <CEntry toProps={worksMore} />
              <div ref={moreRef}></div>
            </Spin>
          </Col>
          <Col xs={0} sm={8}>
            <CRight>
              {/* {JSON.stringify(initialReduxState)} */}
              <CRCSearch toProps={''} />
              <CRCHotkey toProps={hotkey} />
              <CRCUser toProps={user} />
            </CRight>
          </Col>
        </Row>
      </div>
    </>
  ));
};

export const getServerSideProps = async (ctx) => {
  const { headers } = ctx.req;
  //
  const [err, res] = await getIndex(); //
  const [err1, res1] = await getCoinMdw({ headers }); // 积分
  // console.log('p index', err1, res1);
  let user = [
    { id: 1, label: '本站积分 :', value: '需登录', data: null },
    { id: 2, label: '积分规则 :', value: '', data: null },
    { id: 3, label: '积分排行榜 :', value: '', data: null },
    { id: 4, label: '广告位 :', value: '八毛一个广告', data: null },
  ];
  // 积分
  if (get(res1, 'errorMsg', false)) {
    const solt = find(user, (t) => t.id === 1);
    solt.data = res1;
  }
  console.log('pageindex', err, user);
  if (err) {
    return {
      props: {
        banner: [],
        hotkey: [],
        works: {
          curPage: 1,
          datas: [],
          offset: 0,
          over: false,
          pageCount: 458,
          size: 20,
          total: 9156,
        },
        user,
      },
    };
  }
  return {
    props: {
      banner: res[0],
      works: res[1],
      hotkey: res[2],
      user,
    },
  };
};

export default PageIndex;
