import { FormEvent, useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";

import { getMonthlyData } from "~/services/axios";

import type { List } from "~/pages/api/getPlants";
import ShowInfo from "./ShowInfo";

interface IProps extends List {
  token: string;
}

function Plant({
  capacity,
  plantAddress,
  plantName,
  plantCode,
  token,
}: IProps) {
  const [month, setMonth] = useState<null | number>(null);
  const [showLess, setShowLess] = useState(false);
  const {
    mutate: loadMonthlyData,
    data,
    isLoading,
  } = useMutation(getMonthlyData, {
    onError(error) {
      console.log(error);
    },
    onSuccess(data) {
      console.log(data);
    },
  });

  const selectedMonth = useMemo(() => {
    if (data) {
      return data.data.find((d) => d.month === month);
    }
    null;
  }, [data, month]);

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
            onClick={() => {
              loadMonthlyData({
                token,
                plantId: plantCode,
              });
              setShowLess(false);
            }}
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
            <option value='3'>April</option>
          </select>
        </div>
      </div>

      {selectedMonth && !showLess && (
        <>
          <ShowInfo {...selectedMonth} />
          <button onClick={() => setShowLess(true)} className='text-teal-800'>
            {" "}
            show less
          </button>
        </>
      )}
    </section>
  );
}
export default Plant;
