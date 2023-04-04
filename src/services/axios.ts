import axios from "axios";
import type { Data as PlantsResponse } from "~/pages/api/getPlants";
import type { Response } from "~/pages/api/getMonthlyData";

type TokenResponse = {
  token: string;
};

// login
export const login = () => axios.get<TokenResponse>("/api/login");

// get all plants Id
export const getPlants = (token: string) =>
  axios.post<PlantsResponse>("/api/getPlants", {
    token,
  });

// get Monthly data
export const getMonthlyData = ({
  token,
  plantId,
}: {
  token: string;
  plantId: string;
}) =>
  axios.post<Response[]>("/api/getMonthlyData", {
    token,
    plantId,
  });
