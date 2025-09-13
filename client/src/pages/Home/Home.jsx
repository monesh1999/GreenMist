import React from 'react'
import Header from '../../components/Header/header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const Home = () => {
  return (
    <main className="container">
        <Header />
        <ExploreMenu/>
        <ProductDisplay />
    </main>
  )
}

export default Home