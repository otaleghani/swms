'use server';

import { cookies } from "next/headers";

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

  const jwt = cookies().get("gennaro")?.value

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

export async function createTransaction(formData: FormData) {
  const rawFormData = {
    quantity: formData.get('quantity'),
  }
  console.log(rawFormData.quantity)
}

export async function RefreshData(data: string) {

  console.log(data)
}
