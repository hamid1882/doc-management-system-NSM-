"use client";

import { ThemeProvider } from "@material-tailwind/react";
import React from "react";
import { RecoilRoot } from "recoil";
import "./globals.css";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <ThemeProvider>{children}</ThemeProvider>
    </RecoilRoot>
  );
}

export default Providers;
