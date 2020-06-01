import React from 'react';
import './styles.css';

const loadingImg = process.env.PUBLIC_URL + '/images/logo.svg';

export function Loading() {

  return (
    <section className='loading'>
      <img
        className='loading-image'
        src={loadingImg}
        alt='loading'
      />
    </section>
  );
}
