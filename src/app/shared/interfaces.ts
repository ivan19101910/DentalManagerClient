export interface User{
  login: string
  password: string
}

export interface AuthResponse {
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
