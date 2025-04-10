"use client"

import { useAuth } from "@/hooks/useAuth";
import { getItem } from "@/Utills/localStorage";
import { Grid } from "@mui/material";
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
    <Grid container bgcolor={"red"}>
      <h1>Daxesh Chauhan</h1>
    </Grid>
  );
}
