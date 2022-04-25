interface DriversLicence {
  number: string;
  licenceTypeName: string;
}

interface Policy {
  uuid: string;
  policyNumber: string;
  status: "NOT_COVERED" | "COVERED" | "COVER_PENDING";
  displayCoverType: string;
}

interface Fleet {
  policies: Policy[];
}

export interface Driver {
  uuid: string;
  lastName: string;
  firstName: string;
  email: string;
  driversLicence: DriversLicence;
  fleet: Fleet;
}
