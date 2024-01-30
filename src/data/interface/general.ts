interface IGeneral {
  [key: string]: string | boolean | undefined | Date;
  date: Date,
  callTime: Date,
  phone: string,
  number: string,
  operator: boolean,
  aon: string,
  phoneNumber: string,
  mobile: boolean,
  fax: string,
  zip: string,
  region: string,
  rayon: string
}

export default IGeneral
