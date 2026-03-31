async function test() {
  console.log('Logging in...');
  const loginRes = await fetch('https://api.uddyan.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'uddyanadmin@gmail.com', password: 'Uddyan@2026' })
  });
  
  const loginData = await loginRes.json();
  if (!loginData.success) {
    console.log('Login failed', loginData);
    return;
  }
  
  // Extract cookie
  const cookieHeader = loginRes.headers.get('set-cookie');
  const cookie = cookieHeader ? cookieHeader.split(';')[0] : '';
  console.log('Got cookie:', cookie);
  
  console.log('Testing GET /api/cart...');
  const getRes = await fetch('https://api.uddyan.com/api/cart', {
    headers: { 'Cookie': cookie || '' }
  });
  console.log('GET status:', getRes.status, await getRes.text());
  
  console.log('Testing PUT /api/cart...');
  const putRes = await fetch('https://api.uddyan.com/api/cart', {
    method: 'PUT',
    headers: { 
      'Cookie': cookie || '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: [] })
  });
  console.log('PUT status:', putRes.status, await putRes.text());
}

test();
