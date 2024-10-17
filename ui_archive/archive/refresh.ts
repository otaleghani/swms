"use server";

import { cookies } from "next/headers";

export async function RefreshToken() {
  const refresh = cookies().get("refresh_token")?.value
  const body = JSON.stringify({refreshToken: refresh});
  const resRefresh = await fetch('http://localhost:8080/api/v1/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  // const resRefreshBody = await resRefresh.json()

    // const cookies = setCookie(createContext(), "gennaro", resRefreshBody.data.accessToken)
    // cookies().delete("gennaro")
    // cookies().set({
    //   name: "gennaro",
    //   value: resRefreshBody.data.accessToken,
    //   path: "/",
    //   httpOnly: true,
    //   sameSite: true,
    // })
    //
}
