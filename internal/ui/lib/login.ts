'use server';

export async function Login(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  console.log(rawFormData)
  //
  // HERE IS ALL NULL: WTF
  // HERE WE NEED TO DO A LITTLE OF CLEANUP!
  // Like is email string? is password string? 
  // delete escape chars etc.

  // 1. we want to do a req, and we want to get back
  //    access token and refresh token
  const content = await fetch('http://localhost:8080/api/v1/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: rawFormData.email, password: rawFormData.password}),
  }).then((res) => {
    return res.json();
  });

  console.log(content)
  // here I have to save the content of access and refresh token
  // I also have to create a function to refresh the access token
}

export async function Register(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const res = await fetch('http://localhost:8080/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: rawFormData.email, password: rawFormData.password}),
  });
  console.log(res)
}
