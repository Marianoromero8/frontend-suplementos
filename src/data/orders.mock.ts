export interface OrderDetail {
  product_id: number;
  quantity: number;
}

export interface OrderMock {
  order_id: number;
  user_id: number;
  status: "pending" | "completed" | "cancelled";
  total: number;
  order_date: string;
  details: OrderDetail[];
}

export const mockOrders: OrderMock[] = [
  {
    order_id: 1,
    user_id: 2,
    total: 45999,
    status: "completed",
    order_date: "2024-01-12",
    details: [{ product_id: 1, quantity: 1 }],
  },
  {
    order_id: 2,
    user_id: 3,
    total: 28999,
    status: "completed",
    order_date: "2024-01-28",
    details: [{ product_id: 2, quantity: 1 }],
  },
  {
    order_id: 3,
    user_id: 4,
    total: 18999,
    status: "completed",
    order_date: "2024-02-03",
    details: [{ product_id: 3, quantity: 1 }],
  },
  {
    order_id: 4,
    user_id: 5,
    total: 39999,
    status: "completed",
    order_date: "2024-02-20",
    details: [{ product_id: 1, quantity: 1 }],
  },

  // CANCELLED
  {
    order_id: 5,
    user_id: 6,
    total: 29999,
    status: "cancelled",
    order_date: "2024-03-05",
    details: [{ product_id: 4, quantity: 1 }],
  },

  {
    order_id: 6,
    user_id: 7,
    total: 57999,
    status: "completed",
    order_date: "2024-03-21",
    details: [{ product_id: 5, quantity: 2 }],
  },

  {
    order_id: 7,
    user_id: 8,
    total: 20999,
    status: "completed",
    order_date: "2024-04-10",
    details: [{ product_id: 6, quantity: 1 }],
  },

  // PENDING
  {
    order_id: 8,
    user_id: 9,
    total: 49999,
    status: "pending",
    order_date: "2024-04-22",
    details: [
      { product_id: 1, quantity: 1 },
      { product_id: 8, quantity: 2 },
    ],
  },

  {
    order_id: 9,
    user_id: 10,
    total: 30999,
    status: "completed",
    order_date: "2024-05-02",
    details: [{ product_id: 9, quantity: 1 }],
  },
  {
    order_id: 10,
    user_id: 11,
    total: 18999,
    status: "completed",
    order_date: "2024-05-18",
    details: [{ product_id: 7, quantity: 1 }],
  },

  {
    order_id: 11,
    user_id: 12,
    total: 24999,
    status: "completed",
    order_date: "2024-06-06",
    details: [{ product_id: 2, quantity: 1 }],
  },

  // CANCELLED
  {
    order_id: 12,
    user_id: 13,
    total: 45999,
    status: "cancelled",
    order_date: "2024-06-25",
    details: [{ product_id: 10, quantity: 1 }],
  },

  {
    order_id: 13,
    user_id: 14,
    total: 18999,
    status: "completed",
    order_date: "2024-07-04",
    details: [{ product_id: 12, quantity: 1 }],
  },
  {
    order_id: 14,
    user_id: 15,
    total: 53999,
    status: "completed",
    order_date: "2024-07-26",
    details: [{ product_id: 3, quantity: 2 }],
  },

  {
    order_id: 15,
    user_id: 2,
    total: 45999,
    status: "completed",
    order_date: "2024-08-09",
    details: [{ product_id: 11, quantity: 1 }],
  },

  // PENDING
  {
    order_id: 16,
    user_id: 3,
    total: 64999,
    status: "pending",
    order_date: "2024-08-15",
    details: [
      { product_id: 1, quantity: 1 },
      { product_id: 4, quantity: 1 },
    ],
  },

  {
    order_id: 17,
    user_id: 4,
    total: 48999,
    status: "completed",
    order_date: "2024-09-01",
    details: [
      { product_id: 2, quantity: 1 },
      { product_id: 9, quantity: 1 },
    ],
  },
  {
    order_id: 18,
    user_id: 5,
    total: 29999,
    status: "completed",
    order_date: "2024-09-19",
    details: [{ product_id: 6, quantity: 1 }],
  },

  {
    order_id: 19,
    user_id: 6,
    total: 35999,
    status: "completed",
    order_date: "2024-10-07",
    details: [{ product_id: 3, quantity: 1 }],
  },

  {
    order_id: 20,
    user_id: 7,
    total: 57999,
    status: "completed",
    order_date: "2024-10-28",
    details: [
      { product_id: 12, quantity: 1 },
      { product_id: 5, quantity: 1 },
    ],
  },

  {
    order_id: 21,
    user_id: 8,
    total: 24999,
    status: "completed",
    order_date: "2024-11-05",
    details: [{ product_id: 10, quantity: 1 }],
  },

  // CANCELLED
  {
    order_id: 22,
    user_id: 9,
    total: 29999,
    status: "cancelled",
    order_date: "2024-11-17",
    details: [{ product_id: 7, quantity: 1 }],
  },

  {
    order_id: 23,
    user_id: 10,
    total: 41999,
    status: "completed",
    order_date: "2024-12-02",
    details: [
      { product_id: 3, quantity: 1 },
      { product_id: 8, quantity: 1 },
    ],
  },
  {
    order_id: 24,
    user_id: 11,
    total: 32999,
    status: "completed",
    order_date: "2024-12-11",
    details: [{ product_id: 5, quantity: 1 }],
  },

  {
    order_id: 25,
    user_id: 12,
    total: 19999,
    status: "completed",
    order_date: "2024-03-14",
    details: [{ product_id: 6, quantity: 1 }],
  },
  {
    order_id: 26,
    user_id: 13,
    total: 34999,
    status: "completed",
    order_date: "2024-06-12",
    details: [{ product_id: 4, quantity: 1 }],
  },
  {
    order_id: 27,
    user_id: 14,
    total: 24999,
    status: "completed",
    order_date: "2024-09-25",
    details: [{ product_id: 9, quantity: 1 }],
  },

  // PENDING
  {
    order_id: 28,
    user_id: 15,
    total: 28999,
    status: "pending",
    order_date: "2024-01-09",
    details: [{ product_id: 7, quantity: 1 }],
  },

  {
    order_id: 29,
    user_id: 4,
    total: 39999,
    status: "completed",
    order_date: "2024-11-28",
    details: [{ product_id: 11, quantity: 1 }],
  },
  {
    order_id: 30,
    user_id: 2,
    total: 45999,
    status: "completed",
    order_date: "2024-05-27",
    details: [{ product_id: 1, quantity: 1 }],
  },
];
