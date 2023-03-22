# HUAWEI API

the base url

```sh
BASE_URL : https://eu5.fusionsolar.huawei.com/thirdData
```

## Login interface

```sh
Endpoints: /login
Method: POST
```

Axios

```js
const response = await axios.post(
  "https://eu5.fusionsolar.huawei.com/thirdData/login",
  {
    userName: USER_NAME,
    systemCode: PASSWORD,
  }
);
const token = response.headers["xsrf-token"];
```

Response Shape:

```ts
interface Response {
  success: boolean;
  data: null;
  failCode: number;
  params: null;
  message: null;
}
```

## Get all plants Ids (plant code)

```sh
Endpoints: /stations
Method: POST
```

Axios:

```ts
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
```

Response Shape:

```ts
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
```

## Get Monthly data

```sh
Endpoints: /getKpiStationMonth
Method: POST
```

Axios:

```ts
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

const monthData = monthlyData.find(
  (data) => new Date(data.collectTime).getMonth() === month
);
```

Response Shape:

```ts
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
```
