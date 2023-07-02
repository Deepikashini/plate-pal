import { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setMeals } from '../../utils/mealSlice';
import './Styles.css';
import Shimmer from '../ShimmerUi/Shimmer';
const { Meta } = Card;

const Body = () => {
  const dispatch = useDispatch();
  const meals = useSelector((store) => store.meals);

  useEffect(() => {
    const fetchRandomSeafoodMeals = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
        );
        const data = await response.json();
        const randomMealIds = getRandomMealIds(data.meals, 10);
        const randomMeals = await fetchMealsByIds(randomMealIds);
        dispatch(setMeals(randomMeals));
      } catch (error) {
        console.error('Error fetching random seafood meals:', error);
      }
    };

    fetchRandomSeafoodMeals();
  }, [dispatch]);

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
        console.log('API response: ', data);
        return data.meals[0];
      } catch (error) {
        console.error(`Error fetching meal with ID ${id}:`, error);
        return null;
      }
    });
    return Promise.all(mealPromises);
  };

  return (
    <div>
      {/* <Shimmer /> */}

      <Row className="search-container">
        <Input
          className="search-box"
          placeholder="What do you want to recipe?"
          prefix={<SearchOutlined style={{ color: '#bb34fa', fontSize: '20px', paddingLeft: '10px' }} />}
          style={{ backgroundColor: '#f5ebfc', border: 'none', borderRadius: '15px', height: '50px' }}
        />
      </Row>

      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Row gutter={[24, 24]} justify="center">
            {meals.map((meal) => (
              <Col xs={24} sm={12} md={8} lg={4} xl={4} key={meal.idMeal}>
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
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Body;



// import { useState, useEffect } from 'react';
// import { SearchOutlined } from '@ant-design/icons';
// import { Input, Card, Row, Col } from 'antd';
// import './Styles.css';
// const { Meta } = Card;

// const Body = () => {
 
//   const [meals, setMeals] = useState([]);
    
//   useEffect(() => {
//     const fetchRandomSeafoodMeals = async () => {
//       try {
//         const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
//         const data = await response.json();
//         const randomMealIds = getRandomMealIds(data.meals, 10);
//         const randomMeals = await fetchMealsByIds(randomMealIds);
//         setMeals(randomMeals);
//       } catch (error) {
//         console.error('Error fetching random seafood meals:', error);
//       }
//     };

//     fetchRandomSeafoodMeals();
//   }, []);

//   const getRandomMealIds = (mealArray, count) => {
//     const shuffledArray = mealArray.sort(() => Math.random() - 0.5);
//     return shuffledArray.slice(0, count).map((meal) => meal.idMeal);
//   };

//   const fetchMealsByIds = async (mealIds) => {
//     const mealPromises = mealIds.map(async (id) => {
//       try {
//         const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        
  
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log('API response: ', data);
//         return data.meals[0];
//       } catch (error) {
//         console.error(`Error fetching meal with ID ${id}:`, error);
//         return null;
//       }
//     });
//     return Promise.all(mealPromises);
//   };
//   return (
    
//     <div>
//       <Row justify="center" className="search-container">
//         <Input
//           className="search-box"
//           placeholder="What do you want to recipe?"
//           prefix={<SearchOutlined style={{ color: '#bb34fa', fontSize: '20px', paddingLeft: '10px'}} />}
//           style={{ backgroundColor: '#f5ebfc', border: 'none', borderRadius: '15px', height: '50px' }}
//         />
//       </Row>
      
//       <Row justify="center">
//         <Col xs={24} sm={24} md={24} lg={20} xl={20}>
//           <Row gutter={[24, 24]} justify="center"> 
//           {meals.map((meal) => (
//             <Col xs={24} sm={12} md={8} lg={4} xl={4} key={meal.idMeal}>
//               <Card
//                   hoverable
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}
//                   cover={
//                     <img
//                       alt={meal.strMeal}
//                       src={meal.strMealThumb}
//                       style={{
//                         width: '100%',
//                       }}
//                     />
//                   }
//                 >
//                   <Meta
//                     title={meal.strMeal}
//                     description={meal.strArea}
//                   />
//                   <p className='meal-category'>{meal.strCategory}</p>      
//                 </Card>
//             </Col>
//           ))}
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// export default Body;


