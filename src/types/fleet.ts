export interface Country {
  displayName: string;
}

export interface Manager {
  name: string;
}

export interface Fleet {
  uuid: string;
  name: string;
  activeVehicleCount: number;
  activePolicyCount: number;
  country: Country;
  manager: Manager;
}
