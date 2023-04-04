import type { Response } from "~/pages/api/getMonthlyData";
function ShowInfo({ inverter_power, use_power, ongrid_power }: Response) {
  return (
    <div className='grid w-auto grid-cols-2 items-center  gap-x-10'>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          {" "}
          Solar energy: {inverter_power ? inverter_power.toFixed(2) : 0} kWh
        </span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Self consumption ratio :
          {inverter_power
            ? ((1 - (ongrid_power || 0) / inverter_power) * 100).toFixed(2)
            : 0}{" "}
          %
        </span>
      </div>

      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Monthly Saving :{" "}
          {ongrid_power
            ? (1.5958 * (inverter_power || 0 - ongrid_power)).toFixed(2)
            : 0}{" "}
          MAD
        </span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Avoided Carbone Emission:
          {(
            ((inverter_power || 0 - (ongrid_power || 0)) * 0.712) /
            1000
          ).toFixed(2)}{" "}
          To
        </span>
      </div>

      <div className='flex w-full items-center justify-start gap-x-4'>
        <span> Total Consumption : {(use_power || 0).toFixed(2)} kWh</span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Solar coverage ratio :
          {(
            (((inverter_power || 0) - (ongrid_power || 0)) /
              (use_power || 100)) *
            100
          ).toFixed(2)}{" "}
          %
        </span>
      </div>
    </div>
  );
}
export default ShowInfo;
