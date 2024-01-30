interface IBlack {
  [key: string]: string | boolean | undefined;
  itemId?: string,
  lastName: string,
  firstName: string,
  middleName: string,
  // status: boolean,
  phoneNumber: string,
  createDate: string,
  edit?: boolean,
}

export default IBlack
