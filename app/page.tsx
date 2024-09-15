"use client"

import { use, useEffect } from "react";
import Header from "./component/Header";
import Signature from "./component/Signature";

export default function Home() {

  useEffect(() => {
    sessionStorage.setItem("isLoading", "true");
  },[]);

  return (
    <main>
      <Header/>
      <Signature/>
    </main>
  );
}
