interface DataType {
  tableNumber: number;
  items: { menuId: number; quantity: number }[];
}

export const createOrder = async (data: DataType) => {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "注文作成に失敗しました");
  }

  return res.json();
};

export const getOrders = async () => {
  const res = await fetch("/api/orders");

  let json: any = {};
  try {
    json = await res.json();
  } catch { };

  if (!res.ok) {
    console.error("getOrders error", {
      status: res.status,
      body: json,
    });

    throw new Error("通信に失敗しました");
  }
  return json.data ?? [];
};

export const updateOrderStatus = async (orderId: number) => {
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "completed" }),
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch { };
  
  if (!res.ok) { 
    console.error('updateOrderStatus error', {
      status: res.status,
      body: json,
    });
    throw new Error('ステータスの更新に失敗しました');
  }

  return json.data;
};
