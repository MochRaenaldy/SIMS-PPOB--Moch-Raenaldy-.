import React from 'react'
import Navbar from './Navbar';
import Dashboard from './Dashboard';

interface Props {
    children: React.ReactNode
    dashboard?: boolean
}
export default function Card({children, dashboard = true}: Props) {
  return (
    <div>
      <Navbar />
      {dashboard && <Dashboard />}
      {children}
    </div>
  );
}
