interface IGreen {
  [key: string]: string | boolean | undefined;
  itemId?: string,
  lastName: string,
  firstName: string,
  middleName: string,
  phoneNumber: string,
  createDate: string,
  edit?: boolean,
}

export default IGreen
