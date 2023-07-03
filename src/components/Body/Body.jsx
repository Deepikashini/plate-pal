import { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setMeals } from '../../utils/mealSlice';
import './Styles.css';
import Shimmer from '../ShimmerUi/Shimmer';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const Body = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const meals = useSelector((store) => store.meals);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log('filteredMeals:', filteredMeals);

  useEffect(() => {
    fetchRandomSeafoodMeals();
  }, []);

  const fetchRandomSeafoodMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
      );
      const data = await response.json();
      console.log('1st API response:', data);
      const randomMealIds = getRandomMealIds(data.meals, 10);
      const randomMeals = await fetchMealsByIds(randomMealIds);
      dispatch(setMeals(randomMeals));
    } catch (error) {
      console.error('Error fetching random seafood meals:', error);
    }
  };

  const getRandomMealIds = (mealArray, count) => {
    const shuffledArray = mealArray.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count).map((meal) => meal.idMeal);
  };

  const fetchMealsByIds = async (mealIds) => {
    const mealPromises = mealIds.map(async (id) => {
      try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('API response:', data); // Log the API response
        return data.meals[0];
      } catch (error) {
        console.error(`Error fetching meal with ID ${id}:`, error);
        return null;
      }
    });
    return Promise.all(mealPromises);
  };

  if (meals.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <Row className="search-container">
        <Input
          className="search-box"
          placeholder="What do you want to recipe?"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          prefix={<SearchOutlined className='search-btn' />}
          style={{ backgroundColor: '#f5ebfc', border: 'none', borderRadius: '15px', height: '50px' }}
        />
      </Row>

      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Row gutter={[24, 24]} justify="center">
            {filteredMeals.map((meal) => (
              <Col xs={24} sm={12} md={8} lg={4} xl={4} key={meal.idMeal}>
                <Link to={{
                  pathname: `/recipe/${meal.idMeal}`,
                  state: {
                    recipe: meal,
                  }
                }}>
                  <Card
                    hoverable
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    cover={
                      <img
                        alt={meal.strMeal}
                        src={meal.strMealThumb}
                        style={{
                          width: '100%',
                        }}
                      />
                    }
                  >
                    <Meta title={meal.strMeal} description={meal.strArea} />
                    <p className="meal-category">{meal.strCategory}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Body;