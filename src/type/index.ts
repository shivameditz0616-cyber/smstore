export interface Product {
  id?: string;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  previewUrl: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  accessLink: string; // Hidden from public in UI
  status: "active" | "hidden";
  featured: boolean;
  createdAt: number;
}

export interface Order {
  orderId: string;
  userName: string;
  email: string;
  phone: string;
  productId: string;
  productTitle: string;
  amount: number;
  paymentStatus: "pending" | "paid" | "failed";
  paymentId?: string;
  uropayReference?: string;
  accessUnlocked: boolean;
  createdAt: number;
}
