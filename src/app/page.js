"use client"

import { getItem } from "@/Utills/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const getToken = getItem("token")
  useEffect(() => {
    if (!getToken) {
      router.push("/authentication/login")
    }
  }, [])
  return (
    <>
      <h1>Daxesh Chauhan</h1>
    </>
  );
}
