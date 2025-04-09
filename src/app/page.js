"use client"

import { useAuth } from "@/hooks/useAuth";
import { getItem } from "@/Utills/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth() || {}

  console.log("USER", user)

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
