import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  token: string;
};

export default async function loginToCloud(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.post(
    "https://eu5.fusionsolar.huawei.com/thirdData/login",
    {
      userName: "test_api_2",
      systemCode: "Eone1234",
    }
  );

  const token = response.headers["xsrf-token"];

  res.status(200).json({ token });
}
