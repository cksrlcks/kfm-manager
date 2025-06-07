import "server-only";
import { InquiryResponse } from "../type";

export const getContactList = async ({
  page,
  limit,
  targetSite,
}: {
  page: number;
  limit: number;
  targetSite: string;
}) => {
  const targetAPIUrl =
    targetSite === "kfmblower"
      ? process.env.KFMBLOWER_API_URL
      : process.env.KFMBUSAN_API_URL;

  const response = await fetch(
    `${targetAPIUrl}/get-contact.php?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.KFMBLOWER_API_KEY || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("정보를 가져오지 못했습니다.");
  }

  const data = await response.json();

  return data as InquiryResponse;
};

export const deleteContact = async (id: string, targetSite: string) => {
  const targetAPIUrl =
    targetSite === "kfmblower"
      ? process.env.KFMBLOWER_API_URL
      : process.env.KFMBUSAN_API_URL;

  const response = await fetch(`${targetAPIUrl}/delete-contact.php`, {
    method: "DELETE",
    headers: {
      "X-API-KEY": process.env.KFMBLOWER_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("삭제에 실패했습니다.");
  }
};
