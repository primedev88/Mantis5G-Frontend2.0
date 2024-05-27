"use client"

import React, { useContext } from 'react'
import Logs from '@/app/ui/dashboard/logs/logs'
import { DataContext } from '@/app/context/DataContext'

const LogsPage = () => {
  const { packetCapture  } = useContext(DataContext);
  return (
    <div><Logs packetCapture={packetCapture} /></div>
  )
}

export default LogsPage