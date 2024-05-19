import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Helmet>
      <title>스튜디오아이</title>
      <Outlet />
    </Helmet>
  );
}
