import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import type { List } from "~/pages/api/getPlants";
import type { PlantData } from "~/pages/api/getMonthlyData";
import ShowInfo from "./ShowInfo";

interface IProps extends List {
  token: string;
}

const getMonthlyData = ({
  token,
  plantId,
  month,
}: {
  token: string;
  plantId: string;
  month: number;
}) =>
  axios.post<PlantData>("/api/getMonthlyData", {
    token,
    month,
    plantId,
  });

function Plant({
  capacity,
  plantAddress,
  plantName,
  plantCode,
  token,
}: IProps) {
  const [month, setMonth] = useState<null | number>(null);
  const {
    mutate: loadMonthlyData,
    data,
    isSuccess,
  } = useMutation(getMonthlyData, {
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {},
  });

  const handleChange = (e: FormEvent) => {
    setMonth(+(e.target as HTMLSelectElement).value);
  };

  return (
    <section className='flex w-full flex-col items-center justify-center gap-y-6 rounded-md bg-teal-200 p-4'>
      <div className='flex w-full  items-center justify-around'>
        <div>
          <h2 className='text-xl italic text-teal-900'>
            {plantName} / {capacity}kWc
          </h2>
          <span>{plantAddress}</span>
        </div>
        <div className='item-center flex justify-center gap-x-6'>
          <button
            type='button'
            className='cursor-pointer rounded-md border border-teal-900 bg-teal-900 px-4 py-2 text-white disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-500'
            disabled={month === null ? true : false}
            onClick={() =>
              loadMonthlyData({
                token,
                plantId: plantCode,
                month: month || 0,
              })
            }
          >
            more
          </button>
          <select
            name='month'
            id='month'
            onChange={handleChange}
            className='px-4 py-2'
            defaultValue={""}
          >
            <option disabled={true} value=''>
              --Select month--
            </option>
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>Mars</option>
          </select>
        </div>
      </div>

      {isSuccess && <ShowInfo {...data.data} />}
    </section>
  );
}
export default Plant;
