import React from 'react'
import DocumentSection from './DocumentSection'
import RecentDocument from './RecentDocument'
import Header from '../Header/Header'

function IndexPage() {
  return (
    <>
        <Header />
        <DocumentSection />
        <RecentDocument />
    </>
  )
}

export default IndexPage