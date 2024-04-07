import { string } from 'prop-types';

export interface Request {
  id: number;
  category: string;
  clientName: string;
  organization: string;
  contract: string;
  email: string;
  position: string;
  description: string;
  fileUrlList: string[];
}
