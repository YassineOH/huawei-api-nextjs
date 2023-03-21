import type { PlantData } from "~/pages/api/getMonthlyData";
function ShowInfo({
  dataItemMap: { inverter_power, use_power, ongrid_power },
}: PlantData) {
  return (
    <div className='grid w-auto grid-cols-2 items-center  gap-x-10'>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span> Solar energy: {inverter_power.toFixed(2)} kWh</span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Self consumption ratio :
          {((1 - ongrid_power / inverter_power) * 100).toFixed(2)} %
        </span>
      </div>

      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Monthly Saving :{" "}
          {(1.5958 * (inverter_power - ongrid_power)).toFixed(2)} MAD
        </span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Avoided Carbone Emission:
          {(((inverter_power - ongrid_power) * 0.712) / 1000).toFixed(2)} To
        </span>
      </div>

      <div className='flex w-full items-center justify-start gap-x-4'>
        <span> Total Consumption : {use_power.toFixed(2)} kWh</span>
      </div>
      <div className='flex w-full items-center justify-start gap-x-4'>
        <span>
          Solar coverage ratio :
          {(((inverter_power - ongrid_power) / use_power) * 100).toFixed(2)} %
        </span>
      </div>
    </div>
  );
}
export default ShowInfo;
