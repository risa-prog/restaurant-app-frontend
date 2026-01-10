export const getOrderItems = async (orderId: string) => {
  const res = await fetch(`/api/orders/${orderId}/items`);

  let json: any = {};
  try {
    json = await res.json();
  } catch {
    throw new Error("注文情報の取得に失敗しました");
  }

  if (!res.ok) {
    throw new Error("注文情報の取得に失敗しました");
  }

  return json.data;
};
