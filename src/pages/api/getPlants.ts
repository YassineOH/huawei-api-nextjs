import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export interface Root {
  data: Data;
  failCode: number;
  message: string;
  success: boolean;
}

export interface Data {
  list: List[];
  pageCount: number;
  pageNo: number;
  pageSize: number;
  total: number;
}

export interface List {
  capacity: number;
  contactMethod: any;
  contactPerson: any;
  gridConnectionDate: string;
  latitude: string;
  longitude: string;
  plantAddress: string;
  plantCode: string;
  plantName: string;
}

export default async function getPlants(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.body.token as string;
  try {
    const response = await axios.post<Root>(
      "https://eu5.fusionsolar.huawei.com/thirdData/stations",
      {
        pageNo: 1,
      },
      {
        headers: {
          "xsrf-token": token,
        },
      }
    );

    const data = response.data.data;

    res.status(200).json({ ...data });
  } catch (error) {
    console.log(error);
  }
}
