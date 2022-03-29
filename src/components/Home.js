import React from 'react'
import Filter from './Filter';
import SingleProducts from './SingleProducts';
import './styles.css';
import { CartState } from '../context/Context';


const Home = () => {

  const { 
  state: {products},
  productState: {byStock, byFastDelivery, byRating, sort,searchQuery}, } = CartState();
   
const transformProducts = () => {
  let sortedProducts = products;

  if(sort) {
    sortedProducts = sortedProducts.sort((a,b) =>
    sort === 'lowToHigh'? a.price - b.price : b.price - a.price);
  }

  if (!byStock){
    sortedProducts = sortedProducts.filter((prod) => prod.inStock);
  }

  if (byFastDelivery){
    sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
  }

  if (byRating) {
    sortedProducts = sortedProducts.filter(
      (prod) => prod.ratings >= byRating
    );
  }

 


  return sortedProducts;
};


return (
    <div className='home'>
    <Filter/>
    <div className="productContainer">
        {transformProducts().map((prod) => (
        <SingleProducts prod={prod} key={prod.id}/>
        )
        )}
    </div>
   </div>
  )
}

export default Home
