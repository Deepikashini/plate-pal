import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Styles.css';
import { Button, Modal, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';

const RecipePage = () => {
  
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const recipeRef = useRef(null);
  
  useEffect(() => {
    const storedRecipe = localStorage.getItem(`recipe_${id}`);
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));
    } else {
      fetchRecipe();
    }
  }, [id]);

  useEffect(() => {
    if (recipe) {
      localStorage.setItem(`recipe_${id}`, JSON.stringify(recipe));
    }
  }, [id, recipe]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error(`Error fetching recipe with ID ${id}:`, error);
    }
  };

  // Early return if recipe is not loaded yet
  if (!recipe) {
    return <p>Loading...</p>;
  }

  // Extracting ingredients and their measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measurement = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measurement,
      });
    }
  }

  // Open form modal
  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  // Close form modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    setFormData(values);
  };
  

  const handlePurchase = () => {
    if (formData) {
      const { firstName, lastName, email, country, city, address, state, phone, pinCode } = formData;
      if (firstName && lastName && email && country && city && address && state && phone && pinCode)
      navigate('/order-confirmation', { state: {formData, mealName: recipe.strMeal, mealId: recipe.idMeal} });
      return;
    }    
  }

  return (
    <div className='detail-recipe-container'>
        
        <div ref={recipeRef} className='detail-header-container'>
          <img className='detail-recipe-pic' src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className='detail-head-sub-container'>
            <h1 className='detail-dish-name'>{recipe.strMeal}</h1> 
            <p className='detail-ingreds'>{ingredients.length} Ingredients</p>
            <Button className='detail-btn' type="primary" shape="round" size='large' onClick={handleOpenModal}>Checkout</Button>
          </div>
          
        </div> 

        <div className='detail-ingre-container'>
           
          <h2 className='detail-title'>Ingredients: </h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.measurement}
                </li>
              ))}
            </ul>
        </div>
        
        <div className='detail-recipe-instr'>
          <h2 className='title'>Instruction:</h2>
          {recipe.strInstructions.split('.').map((sentence, index) => {
            const trimmedSentence = sentence.trim();
            let cleanedSentence = trimmedSentence;
            
            // Remove step numbers at the beginning of the sentence
            cleanedSentence = cleanedSentence.replace(/^\s*STEP \d+ -\s*/, '');
            
            if (cleanedSentence !== '' && !/^\d+/.test(cleanedSentence)) {
              return (
                <p key={index}>
                  <strong>Step {index + 1}:</strong> {cleanedSentence}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>

        
        <Modal
          title='Shipping Information'
          open={isModalVisible}
          onCancel={handleCloseModal}
          footer={null}
        >
          
          <Form
            name="basic"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{remember: true,}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Invalid entry. Only letters and whitespace are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Invalid entry. Only letters and whitespace are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please enter your Address!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Invalid entry. Only letters and whitespace are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Pin Code"
              name="pinCode"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Invalid entry. Only numbers are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Invalid entry. Only letters and whitespace are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: 'This field is mandatory',
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Invalid entry. Only letters and whitespace are allowed.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your Email!',
                },
                {
                  type: 'email',
                  message: 'Invalid email format. Please enter a valid email address.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
                {
                  pattern: /^\d{10}$/,
                  message: 'Invalid phone number. Please enter a 10-digit phone number.',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
            <div className='btn-box'>
              <Button className='detail-btn' type="primary" htmlType="submit" shape="round" onClick={handlePurchase}>
                Purchase
              </Button>
            </div>           
          </Form.Item>
          </Form>
        </Modal>
    </div>
  );
};

export default RecipePage;

