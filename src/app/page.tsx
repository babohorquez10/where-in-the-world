"use client";

import { Provider } from "react-redux";
import CountriesList from "./components/CountriesList/CountriesList";
import { store } from "@/utils/store";

export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <CountriesList />
      </main>
    </Provider>
  );
}
