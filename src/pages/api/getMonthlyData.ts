import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
  installed_capacity: number;
  use_power: number;
  inverter_power: number;
  reduction_total_tree: any;
  power_profit: number;
  theory_power: any;
  reduction_total_coal: number;
  perpower_ratio: number;
  reduction_total_co2: number;
  ongrid_power: number;
  performance_ratio: any;
}

export interface Params {
  currentTime: number;
  collectTime: number;
  stationCodes: string;
}

export default async function getMonthlyData(
  req: NextApiRequest,
  res: NextApiResponse<PlantData>
) {
  const token = req.body.token as string;
  const plantId = req.body.plantId as string;
  const month = req.body.month as number;
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

    const monthlyData = response.data.data;

    const monthData =
      monthlyData.find(
        (data) => new Date(data.collectTime).getMonth() === month
      ) || monthlyData[0];

    res.status(200).json({ ...monthData });
  } catch (error) {
    console.log(error);
  }
}
