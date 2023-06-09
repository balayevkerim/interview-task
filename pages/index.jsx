import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })

import { useState, useEffect } from 'react';
import { ProductItem } from '@/components/ProductItem'
import Button from '@/components/Button/button.component';
import BrandFilter from '@/components/BrandFilter/brand-filter.component';
import { ProductContainer } from '@/styles/home.styles';
import SortFilter from '@/components/SortFilter/sort.filter.component';
import PriceFilter from '@/components/PriceFilter/price.filter.component';
import RatingFilter from '@/components/RatingFilter/rating.filter.component';
import Spinner from '@/components/Spinner/spinner.component';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('title');
  const [filterBrandValue, setBrandFilterValue] = useState('');
  // const [priceFilterValue, setPriceFilterValue] = useState('');
  const [ratingFilterValue, setRatingFilterValue] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [skip, setSkipCount] =  useState(0) 

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  useEffect(() => {
  console.log('called',selectedMaxPrice,selectedMinPrice)
    let filtered = [...products];
    // Apply brand filter if selected
    if (filterBrandValue !== '') {
      filtered = filtered.filter((product) => product.brand === filterBrandValue);
    }

    // Apply price filter if selected
    /* if (priceFilterValue !== '') {
      const price = parseInt(priceFilterValue);
      filtered = filtered.filter((product) => product.price <= price);
    } */
    if (selectedMinPrice) {
      filtered = filtered.filter(product => {
        // Filter products with price above the selected minimum price
        return product.price >= selectedMinPrice;
      });
    }

    if (selectedMaxPrice && selectedMinPrice) {
      filtered = filtered.filter(product => {
        // Filter products with price below or equal to the selected maximum price
        return product.price <= selectedMaxPrice && product.price >=selectedMinPrice;
      });
    }
    if (selectedMaxPrice) {
      filtered = filtered.filter(product => {
        // Filter products with price above the selected minimum price
        return product.price <= selectedMaxPrice;
      });
    }



    // Apply rating filter if selected
    if (ratingFilterValue !== '') {
      const rating = parseInt(ratingFilterValue);
      filtered = filtered.filter((product) => product.rating <= rating);
    }

    setFilteredProducts(filtered);
  }, [filterBrandValue, selectedMinPrice,selectedMaxPrice, ratingFilterValue])


  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products?skip=${skip}`);
      const data = await response.json();
      let combinedProducts = [...products,...data]
      setProducts(combinedProducts);
      setFilteredProducts(combinedProducts);
      setLoading(false);
      const brandOptions = combinedProducts.map(p => p.brand)
      const noDuplicatedBrands = [...new Set(brandOptions)];
      setBrandOptions(noDuplicatedBrands)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setBrandFilterValue(value)
  };
  const handleRatingFilterChange = (e) => {
    const value = e.target.value;
    setRatingFilterValue(value);
  }
  const handlePriceFilterChange = (e) => {
    const value = e.target.value;
    setPriceFilterValue(value);
  }
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    // Sort the products based on the selected value
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (value) {
        case 'price-asc':
          return a.price - b.price;
          break;
        case 'price-desc':
          return b.price - a.price;
          break;
        case 'rating-asc':
          return a.rating - b.rating;
          break;
        case 'rating-desc':
          return b.rating - a.rating;
          break;
        case 'title':
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        default:
          break;
      }
    });
    setFilteredProducts(sorted);
  };

const resetFilters = () =>{
  setBrandFilterValue('')
  setSelectedMaxPrice('');
  setSelectedMinPrice('');
  setRatingFilterValue('');
  setSortOrder('title')
}
  return (

    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Product List</h1>
      <div className={styles.filterContainer}>
        <BrandFilter filterValue={filterBrandValue} brandOptions={brandOptions} handleFilterChange={handleFilterChange} />
        <PriceFilter 
        selectedMaxPrice={selectedMaxPrice}
         selectedMinPrice={selectedMinPrice}
         setSelectedMaxPrice={setSelectedMaxPrice}
         setSelectedMinPrice={setSelectedMinPrice}
         />
        <RatingFilter ratingFilter={ratingFilterValue} handleRatingFilterChange={handleRatingFilterChange} />
        <SortFilter sortOrder={sortOrder} handleSortChange={handleSortChange} />
        <Button buttonType='inverted' onClick={resetFilters}>Reset Filters</Button>
      </div>
      {loading ? <Spinner /> : (
        <>
          <ProductContainer>
            {filteredProducts.length > 0 ? filteredProducts.map((product) => (
              <ProductItem product={product} key={product.id} />
            )): <div className={styles.emptyResult}>No result for this critearia in current loaded result</div>}
          </ProductContainer>
          <Button onClick={()=>setSkipCount(skip+30)}>Load More</Button>
        </>
      )}
    </div>
  );
}
