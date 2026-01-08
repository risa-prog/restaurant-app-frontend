export const getOrderItems = async (orderId: string) => {
  try {
    const res = await fetch(`/api/orders/${orderId}/items`);

    if (!res.ok) {
      throw new Error();
    }

    const json = await res.json();
    return json.data;
  } catch {
    throw new Error("注文情報の取得に失敗しました");
  }
};
