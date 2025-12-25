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
