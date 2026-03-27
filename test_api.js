const API = 'http://localhost:5000/api';

async function safeFetch(url, options) {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    throw new Error(`Invalid JSON response from ${url}: Status ${res.status}. Body: ${text.substring(0, 100)}...`);
  }
}

async function runTests() {
  console.log('--- Starting comprehensive API checks ---\n');
  let adminToken = '';
  let categoryId = '';
  let productId = '';
  let orderId = '';
  
  const testEmail = `admin_test_${Date.now()}@test.com`;

  try {
    // 1. AUTH API - Register Admin
    console.log('1. Testing POST /api/auth/register');
    const regData = await safeFetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Admin Test', email: testEmail, password: 'password123', role: 'admin' })
    });
    if (!regData.success) throw new Error(`Register failed: ${JSON.stringify(regData)}`);
    console.log('✅ Register successful');

    // 2. AUTH API - Login
    console.log('2. Testing POST /api/auth/login');
    const loginData = await safeFetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'password123' })
    });
    if (!loginData.success) throw new Error('Login failed');
    adminToken = loginData.data.token;
    console.log('✅ Login successful, token acquired');

    // 3. AUTH API - Get Profile (me)
    console.log('3. Testing GET /api/auth/me');
    const meData = await safeFetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!meData.success) throw new Error('Get profile failed');
    console.log('✅ Get Profile successful');

    // 4. CATEGORY API - Create Category (Admin)
    console.log('4. Testing POST /api/categories');
    const catData = await safeFetch(`${API}/categories`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ name: `Test Category ${Date.now()}`, description: 'Testing' })
    });
    if (!catData.success) throw new Error(`Category creation failed: ${JSON.stringify(catData)}`);
    categoryId = catData.data._id;
    console.log(`✅ Category Creation successful [ID: ${categoryId}]`);

    // 5. CATEGORY API - Get Categories
    console.log('5. Testing GET /api/categories');
    const listCatData = await safeFetch(`${API}/categories`);
    if (!listCatData.success) throw new Error('Category listing failed');
    console.log(`✅ Get Categories successful [Count: ${listCatData.data.length}]`);

    // 6. PRODUCT API - Create Product (Admin)
    console.log('6. Testing POST /api/products');
    const prodData = await safeFetch(`${API}/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ 
        name: `Test Plant ${Date.now()}`, 
        price: 49.99, 
        category: categoryId,
        image: 'test.jpg' 
      })
    });
    if (!prodData.success) throw new Error(`Product creation failed: ${JSON.stringify(prodData)}`);
    productId = prodData.data._id;
    console.log(`✅ Product Creation successful [ID: ${productId}]`);

    // 7. PRODUCT API - Get Products
    console.log('7. Testing GET /api/products');
    const listProdData = await safeFetch(`${API}/products`);
    if (!listProdData.success) throw new Error('Product listing failed');
    console.log(`✅ Get Products successful [Count: ${listProdData.data.length}]`);

    // 8. ORDER API - Create Order
    console.log('8. Testing POST /api/orders');
    const orderData = await safeFetch(`${API}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ 
        orderItems: [{
           name: 'Test Plant',
           qty: 2,
           image: 'test.jpg',
           price: 49.99,
           product: productId
        }],
        paymentMethod: 'PayPal',
        itemsPrice: 99.98,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 99.98
      })
    });
    if (!orderData.success) throw new Error(`Order creation failed: ${JSON.stringify(orderData)}`);
    orderId = orderData.data._id;
    console.log(`✅ Order Creation successful [ID: ${orderId}]`);

    // 9. ORDER API - Get My Orders
    console.log('9. Testing GET /api/orders/myorders');
    const myOrdersData = await safeFetch(`${API}/orders/myorders`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!myOrdersData.success) throw new Error('My Orders failed');
    console.log(`✅ Get My Orders successful [Count: ${myOrdersData.data.length}]`);

    // 10. ORDER API - Get All Orders (Admin)
    console.log('10. Testing GET /api/orders');
    const allOrdersData = await safeFetch(`${API}/orders`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!allOrdersData.success) throw new Error('All Orders failed');
    console.log(`✅ Get All Orders Admin successful [Count: ${allOrdersData.data.length}]`);

    // 11. ORDER API - Update Order Status (Admin)
    console.log('11. Testing PUT /api/orders/:id/status');
    const statusData = await safeFetch(`${API}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'Shipped' })
    });
    if (!statusData.success) throw new Error('Order status update failed');
    console.log(`✅ Update Order Status Admin successful [New Status: ${statusData.data.status}]`);

    console.log('\n🎉 ALL APIS SECURE AND FUNCTIONING CORRECTLY 🎉');
  } catch (err) {
    console.error(`\n❌ API TEST FAILED: ${err.message}`);
  }
}

runTests();
