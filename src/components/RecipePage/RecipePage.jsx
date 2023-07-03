import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Styles.css';
import { Button, Modal, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';

const RecipePage = () => {
  const [size] = useState('large');
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
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

  const onFinish = (values) => {
    console.log('Success:', values);
  };
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
  
  const handlePurchase = () => {
    alert('Done');    
  }

  return (
    <div className='recipe-container'>
      <div className='recipe-img'>
        <img className='recipe-pic' src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div> 
      <div>
        <h1>{recipe.strMeal}</h1>  
        <h2>Ingredients: </h2>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.ingredient} - {item.measurement}
            </li>
          ))}
        </ul>
      </div>
      
      <div className='recipe-instr'>
        <h2>Instruction: </h2>
        {recipe.strInstructions.split('.').map((sentence, index) => {
          const trimmedSentence = sentence.trim();
          if (trimmedSentence !== '' && !/^\d+/.test(trimmedSentence)) {
            return (
              <p key={index}>
                <strong>Step {index + 1}:</strong> {trimmedSentence}
              </p>
            );
          } else {
            return null;
          }
        })}
      </div>
      <Button className='btn' type="primary" shape="round" size={size} onClick={handleOpenModal}>Checkout</Button>
      <Modal
        title='Form'
        visible={isModalVisible}
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
                message: 'Please input your First Name!',
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
                message: 'Please input your Last Name!',
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
                message: 'Please enter your Country!',
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
                message: 'Please enter your city!',
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
            label="State"
            name="state"
            rules={[
              {
                required: true,
                message: 'Please enter your State!',
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
             
            <Button type="primary" htmlType="submit" onClick={handlePurchase}>
              Purchase
            </Button>
           
          
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RecipePage;

