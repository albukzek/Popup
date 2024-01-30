interface IUniversal {
  [key: string]: string | boolean | undefined;
  itemId?: string,
  lastName: string,
  firstName: string,
  middleName: string,
  status: boolean,
  phoneNumber: string,
  createDate: string,
  edit?: boolean,
  comment: string,
  sstu: boolean,
  title: string,
  department: string,
  post: string,
  prefix: string,
  redirect: boolean
}

export default IUniversal
