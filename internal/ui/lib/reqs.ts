'use server';

export async function getItems() {
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzd21zIiwic3ViIjoic29tZUB0aGluZy5jb20iLCJleHAiOjE3MTk4NTA3MTIsImlhdCI6MTcxOTg0NzExMn0.KMSnXGJMIW8HMeC4sCEgxCMfe1iTvUqaMAh3IxEYyU4'

  const res = await fetch('http://localhost:8080/api/v1/items/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export async function getItemsName() {
  const itemsData = getItems();
  const [items] = await Promise.all([itemsData]);
  const parsedData = [];
  for (let i = 0; i < items.data.length; i++) {
    parsedData.push(items.data[i].name as string)
  }
  return parsedData
}
