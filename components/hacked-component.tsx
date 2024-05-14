"use client";

import { fetchFromAPI } from "@/app/extras/action";

export default function HackedComponent({ data }: any) {
  fetchFromAPI();
  return <h1>hacked</h1>;
}
