import Caller from '@/data/Caller'

export interface IMessage {
  id: string,
  type: number,
  senderPhoneNumber:string
  receiverPhoneNumber:string
  received: string,
  text: string,
  fio: string | null,
  address: string | null
}
export interface IGetMessagesRequest
{
  startDate:Date | null,
  endDate:Date | null,
}

export interface IGetMessageRequest
{
  id:string
}

export interface IGetCallersRequest
{
  phoneNumber:string
}
export interface SMSViewModal {
  caller: Caller | null,
  incomingSMS: IMessage,

}
