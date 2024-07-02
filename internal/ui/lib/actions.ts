'use server';

export async function createItem(formData: FormData) {
  const rawFormData = {
    option: formData.get('select'),
  }
  console.log("IM HERE");
  console.log(rawFormData);
}

export async function createCategory(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
  }

  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzd21zIiwic3ViIjoic29tZUB0aGluZy5jb20iLCJleHAiOjE3MTk5MTY5NTYsImlhdCI6MTcxOTkxMzM1Nn0.KrO2a-7M1KFEKnj5c-r2ruvu46IIJNFsHO8HsfPpFK0'

  const res = await fetch('http://localhost:8080/api/v1/items/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: rawFormData.name}),
  });

  return rawFormData.name as string;
}
