"use client"

import React, { useContext } from 'react'
import Configure from '@/app/ui/dashboard/configure/configure'
import { DataContext } from '@/app/context/DataContext'

const ConfigurePage = () => {

  const { ranStatus, coreStatus  } = useContext(DataContext);
  return (
    <div><Configure ranStatus={ranStatus} coreStatus={coreStatus}/></div>
  )
}

export default ConfigurePage