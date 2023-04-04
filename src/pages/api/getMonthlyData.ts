import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export interface Response {
  use_power: number | null;
  inverter_power: number | null;
  ongrid_power: number | null;
  month: number;
}

export interface Root {
  data: PlantData[];
  failCode: number;
  message: any;
  params: Params;
  success: boolean;
}

export interface PlantData {
  collectTime: number;
  stationCode: string;
  dataItemMap: DataItemMap;
}

export interface DataItemMap {
  radiation_intensity: any;
  installed_capacity: number | null;
  use_power: number | null;
  inverter_power: number | null;
  reduction_total_tree: any;
  power_profit: number | null;
  theory_power: any;
  reduction_total_coal: number | null;
  perpower_ratio: number | null;
  reduction_total_co2: number | null;
  ongrid_power: number | null;
  performance_ratio: any;
}

export interface Params {
  currentTime: number;
  collectTime: number;
  stationCodes: string;
}

export default async function getMonthlyData(
  req: NextApiRequest,
  res: NextApiResponse<Response[]>
) {
  const token = req.body.token as string;
  const plantId = req.body.plantId as string;
  try {
    const response = await axios.post<Root>(
      "https://eu5.fusionsolar.huawei.com/thirdData/getKpiStationMonth",
      {
        stationCodes: plantId,
        collectTime: Date.now(),
      },
      {
        headers: {
          "xsrf-token": token,
        },
      }
    );

    const newData = response.data.data.map((month) => ({
      use_power: month.dataItemMap.use_power,
      inverter_power: month.dataItemMap.inverter_power,
      ongrid_power: month.dataItemMap.ongrid_power,
      month: new Date(month.collectTime).getMonth(),
    }));

    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
  }
}
