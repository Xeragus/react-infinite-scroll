import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';

function App() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=5`);
        const data = await response.json();
        setData(pre => [...pre, ...data]);
      } catch (error) {
        console.log(error);
      }
    } 
    fetchData();
  }, [offset])

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + 5);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset])

  return (
    <div className="App">
      <div className='product-list'>
        {
          data && data.map(product => (
            <div className='product-item' key={product.id}>
              <img src={product.images[0]} alt={product.id} />
              <div className='product-info'>
                <h2>{product.title}</h2>
                <p>{product.price}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;
