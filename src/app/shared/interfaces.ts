import {Time} from "@angular/common";

export interface User{
  login: string
  password: string
}

export interface AuthResponse {
  id: number
  token: string
}

export interface Patient {
  id: number
  firstName: string
  lastName: string
  address: string
  dateOfBirth: Date
  phoneNumber: string
}
export interface Service {
  id: number
  name: string
  price: number
  description: string
  serviceTypeId: number
  serviceTypeName: string
}
export interface ServiceType{
  id: number
  name: string
}

export interface ShowWorker{
  id: number
  firstName: string
  lastName: string
  positionName: string
  officeAddress: string
  city: string
}
export interface WorkerFull{
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
  address: string
  positionName: string
  officeCity: string
  officeAddress: string
}
export interface CreateWorker{
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
  address: string
  positionId: number
  officeId: number
}
export interface EditWorker{
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  password: string
  address: string
  positionId: number
  officeId: number
}
export interface ShowOffice{
  id: number
  address: string
  cityName: string
}
export interface Position{
  id: number
  appointmentPercentage: number
  baseRate: number
  positionName: string
}
export interface City{
  id: number
  name: string
}
export interface ShortAppointment{
  id: number
  appointmentDate: Date
  appointmentTime: Time
  patientName : string
  patientSurname: string
  workerName : string
  workerSurname: string
}
export interface CreateAppointment{
  appointmentDate: Date
  notes: string
  appointmentTime: Time
  realEndTime: Time
  workerId: number
  patientId: number
  statusId: number
  totalSum: number
  appointmentServices: AppointmentServiceCreate[]
}
export interface AppointmentServiceCreate{
  serviceName: string
  servicePrice: number
  serviceId: number
  amount: number
}
