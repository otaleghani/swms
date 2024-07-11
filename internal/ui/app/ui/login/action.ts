'use server'

export async function Login(formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const body = JSON.stringify(
    {
      email: data.email,
      password: data.password
    }  
  )
  const response = await fetch("http://localhost:8080/api/v1/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",},
    body: body,
  }).then((res) => {
    return res.json();
  });

}
