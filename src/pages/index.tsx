import { Report } from "@/components/screens/Report";
import { fetchFinishedTours } from "@/utils/fetchFinishedTours";
import { Tournament } from "@/utils/types";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const Index: NextPage = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const data = await fetchFinishedTours();
      setTournaments(data);
    };
    fetchTournaments();
  }, []);

  return <Report tournaments={tournaments} />;
};

export default Index;
