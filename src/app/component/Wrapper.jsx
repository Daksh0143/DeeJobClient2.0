"use client";
import React from "react";
import Navbar from "./Navbar";
import { Grid } from "@mui/material";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }) => {
  const pathName = usePathname();

  console.log("Path name", pathName);

  const excludedPaths = ["/authentication"];

  const isExcluded = excludedPaths.some((path) => pathName.startsWith(path));

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <Grid container height={"100vh"} width="100vw" >
        <Navbar />
        <Grid size={{ xs: 12 }} sx={{ height: "100%" }}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Wrapper;
