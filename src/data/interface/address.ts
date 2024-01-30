type AddressLevel = 'Region' | 'Autonomy' | 'Area' | 'City' | 'Star' | 'Place' | 'Street' | 'PlanningStructure'

export interface SearchAddressRequest
{
  parentId: string | null,
  name: string,
  activeOnly: boolean | null
}
export interface GetFullAddressRequest
{
  baseAddressId: string,
  building: string,
  room: string
}

export interface AddressElement
{
  id: string,
  parentId: string,
  name: string,
  level: AddressLevel
}

export interface SearchAddressResponce
{
  addressItems: { [key: string]: AddressElement[] }
}

export interface GetFullAddressTreeResponce
{
  addressItems: { [key: string]: AddressElement[] }
  selectedAddressItems: { [key: string]: AddressElement}
}

export interface FiasAddress
{
  baseAddressID: string
  building: string
  room: string
}

export interface Selector
{
  key: string,
  label: string,
  placeholder: string,
  accusativeName: string
}
