import React, { useState } from 'react'
import Header from '../../components/Header/header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const Home = () => {
  const [category , setCategory] =useState('All');
  return (
    <main className="container">
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <ProductDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home