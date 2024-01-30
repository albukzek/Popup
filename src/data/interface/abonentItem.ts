interface IAbonentItem {
  [key: string]: string | boolean | undefined;
  phoneNumber: string,
  firstName: string,
  middleName: string,
  lastName: string,
  createDate: string,
  status: boolean,
  edit?: boolean
}

export default IAbonentItem

