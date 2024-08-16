import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import HomePage from "@/components/Home/HomePage";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const googleUser = localStorage.getItem("googleUser");
    const googleToken = localStorage.getItem("googleToken");

    if (googleUser && googleToken) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
