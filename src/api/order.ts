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

  let json: any = {};
  try {
    json = await res.json();
  } catch {
    throw new Error("注文データの作成に失敗しました");
  }

  if (!res.ok) {
    throw new Error("注文作成に失敗しました");
  }

  return json;
};

export const getOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch { 
    throw new Error("注文データの取得に失敗しました");
  };

  if (!res.ok) {
    throw new Error("注文データの取得に失敗しました");
  }
  return json.data;
};

export const updateOrderStatus = async (orderId: number) => {
  const token = localStorage.getItem("token");
  
  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "completed" }),
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch { 
    throw new Error("ステータスの更新に失敗しました");
  };
  
  if (!res.ok) { 
    throw new Error('ステータスの更新に失敗しました');
  }

  return json.data;
};
