import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodcategory, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFoodItems(data[0]);
      setFoodCat(data[1]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: '9' }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Search in here..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://purepng.com/public/uploads/large/purepng.com-sandwichfood-slice-salad-tasty-bread-vegetable-health-delicious-breakfast-sandwich-9415246181796gyc0.png" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://havifood.com/wp-content/uploads/2020/01/Bakery-Products.jpg" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://freepngimg.com/thumb/food/9-2-food-png-file.png" className="d-block w-100" style={{ filter: 'brightness(30%)' }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {loading && <div>Loading Categories...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && foodcategory.length > 0 ? (
          foodcategory.map((data) => (
            <div className="row mb-3" key={data.id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr
                id="hr-success"
                style={{
                  height: '4px',
                  backgroundImage: '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
                }}
              />
              {foodItems.length > 0 ? foodItems
                .filter(
                  (items) =>
                    items.CategoryName === data.CategoryName &&
                    (items.name?.toLowerCase().includes(search.toLowerCase()) || "")
                )
                .map((filterItems) => (
                  <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                    <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                  </div>
                ))
                : <div>No Data Available</div>}

            </div>
          ))
        ) : (
          <div>No Categories Found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}