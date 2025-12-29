export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface ItemType { 
  quantity: number;
  price_at_order: number;
}

export const getTotalPrice = (items: Array<ItemType>): number => {
  const totalPrice = items.reduce((total, item) => total + item.price_at_order * item.quantity, 0);
  return totalPrice;
 }
