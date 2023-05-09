export interface ClientType {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ProjectType {
  id: string;
  name: string;
  client: ClientType;
  clientId: string;
  description: string;
  status: string;
}
