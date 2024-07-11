"use server";
// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

export type State = {
  code?: string | null;
  message?: string | null;
}

export async function registerAction(prevState: number, formData: FormData) {
  return 2
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const body = JSON.stringify({
    email: data.email,
    password: data.password
  })

  const res = await fetch("http://localhost:8080/api/v1/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  })

  const jsonData = await res.json()
  console.log(jsonData)

  if (jsonData != null) {
  }
}

// export async function register(formData: FormData){
// 
//    const data = {
//      email: formData.get('email'),
//      password: formData.get('password'),
//    }
// 
//    const body = JSON.stringify({
//      email: data.email,
//      password: data.password
//    })
// 
//    const registerData = getRegisterResult(body);
//    const [ registerDataParsed ] = await Promise.all([registerData])
// 
//    // console.log(registerDataParsed)
//    return registerDataParsed
// }
// 
// export async function getRegisterResult(data: string) {
//   "use server";
//   const res = await fetch("http://localhost:8080/api/v1/users/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: data,
//   })
//   return res.json()
// }
