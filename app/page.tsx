"use client"

import { useEffect } from "react";
import Header from "./component/Header";
import Signature from "./component/Signature";

export default function Home() {

  useEffect(() => {
    sessionStorage.setItem("isLoading", "false");
  }, []);

  return (
    <main>
      <Header/>
      <Signature/>
    </main>
  );
}
