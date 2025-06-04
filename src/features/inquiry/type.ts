export type Inquiry = {
  id: string;
  name: string;
  contact: string;
  email: string;
  regdate: string;
  category: string;
  done: boolean;
  content?: string;
};

export type InquiryResponse = {
  total: number;
  items: Inquiry[];
};
