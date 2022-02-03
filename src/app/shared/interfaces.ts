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
