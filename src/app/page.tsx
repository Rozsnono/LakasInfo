"use client";
import Image from "next/image";
import Loading from "./loading";
import DashBoard from "@/components/Dashboard";
import { UserContext } from "@/providers/user.provider";
import { useContext, useEffect, useState } from "react";
import Login from "@/components/Login";

export default function Home() {

  return (
    <DashBoard />
  );
}
