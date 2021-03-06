import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
//
import styles from './index.module.scss';
//
interface Props {
  toProps: any;
}
const ComHeader = ({ toProps }: Props) => {
  return (
    <>
      <Card className='card-p0'>
        {toProps.datas &&
          toProps.datas.map((t, i) => (
            <div key={t.id} className={styles['entry-item']}>
              <div className={styles['timeline-info']}>
                <div className={styles['meta-row']}>
                  <div className={styles['meta-list']}>
                    <div className={styles['item']}>姓名:{i}</div>
                    <div className={styles['item']}>时间</div>
                    <div className={styles['item']}>分类</div>
                  </div>
                </div>
                <div className={styles['title-row']}>
                  <a href={t.link} target='_blank' rel='noopener noreferrer' className={styles['title']}>
                    {t.title.indexOf('<em') === -1 ? <span>{t.title}</span> : <div dangerouslySetInnerHTML={{ __html: t.title }}></div>}
                  </a>
                </div>
                <div className={styles['action-row']}>
                  <ul className={styles['action-list']}>
                    <div className={styles['item']}>点赞</div>
                    <div className={styles['item']}>评论</div>
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </Card>
    </>
  );
};
export default ComHeader;
