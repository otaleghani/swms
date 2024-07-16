import { cookies } from "next/headers"

export async function GET(request: Request) {
  const refresh = cookies().get("refresh_token")?.value
  const body = JSON.stringify({refreshToken: refresh});
  const resRefresh = await fetch('http://localhost:8080/api/v1/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const resRefreshBody = await resRefresh.json()
  
  cookies().set({
    name: "gennaro",
    value: "ANVEDI",
    path: "/",
    httpOnly: true,
    sameSite: true,
  })

  return new Response('Hello, Next.js!', {
    status: 200,
  })
}
