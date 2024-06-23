import { cookies } from "next/headers";

const BASE_URL = "https://trial.peakbit.tech/api";

enum Platform {
  WEB = "WEB",
  IOS = "IOS",
  ANDROID = "ANDROID",
}

export interface UuidToken {
  token: string;
  platform: Platform;
  availableUsages: number;
}

export const getArticle = async function (arcticleId: number) {
  try {
    const cookie = cookies().get("uuidToken");

    if (!cookie) {
      throw new Error("Cookie not found");
    }
    const uuidToken = JSON.parse(cookie.value);

    const response = await fetch(`${BASE_URL}/articles/get/${arcticleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-TOKEN": uuidToken.token,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export async function generateToken(): Promise<UuidToken> {
  const response = await fetch(`${BASE_URL}/token/generate/WEB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to generate token");
  }

  return response.json() as Promise<UuidToken>;
}

export async function renewToken(uuidToken: UuidToken) {
  const response = await fetch(`${BASE_URL}/token/renew`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-TOKEN": uuidToken.token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to renew token");
  }
}
