export interface User {
  id: number;
  name: string;
  birthdate: string;
  sex: string;
  email: string;
  contact: string;
  cpf: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
  athletic: {
    name: string;
  };
}

export interface Event {
  id: number;
  name: string;
  status: boolean;
  date: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface Modality {
  id: number;
  name: string;
  eventId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetails {
  event: {
    id: number;
    name: string;
    status: boolean;
    date: string;
    location: string;
    policy: string;
    description: string;
    bannerEvent: string | null;
    createdAt: string;
    updatedAt: string;
    category: {
      id: string;
      name: string;
      price: string;
      quantity: number;
      startDate: string;
      finishDate: string;
      eventId: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

export interface Sponsors {
  id: number;
  name: string;
  url?: string;
  image: string;
}

export interface InfoCard {
  id: number;
  title: string;
  description: string;
  category: string;
}

export interface Publication {
  id: number;
  title: string;
  genre: string;
  headline: string;
  publicationDate: string;
  author: string;
}

export interface LoginData {
  user: string; // Alterado de "login" para "user"
  password: string;
}

export interface UseTermAreaProps {
  pdfFile: string;
}

export interface Athletic {
  id?: number;
  name: string;
  college_course: {
    [key: string]: string;
  };
  direction: string;
  img_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AthleticsResponse {
  athletics: Athletic[];
}
export interface Coupon {
  id: number;
  amount: number;
  code: string;
  createdAt: string;
  expireDate: string;
  isActive: boolean;
  isUniqueUse: boolean;
  type: string;
  updatedAt: string;
  usageCount: number;
  usageMax: number | null;
  usedByTicketId: number | null;
  usedByUserId: number | null;
}

export interface CouponsResponse {
  coupons: Coupon[];
}

export interface UserTickets {
  id: number;
  status: string;
  updatedAt: string;
  ticket: {
    name: string;
    price: string;
    event: {
      name: string;
      status: boolean;
    };
  };
}
