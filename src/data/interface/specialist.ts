interface ISpecialist {
  [key: string]: string | boolean | undefined;
  itemId?: string,
  sstu: boolean,
  lastName: string,
  firstName: string,
  middleName: string,
  department: string,
  post: string,
  prefix: string,
  phoneNumber: string,
  redirect: boolean
}

export default ISpecialist
