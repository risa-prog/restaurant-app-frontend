export const getOrderItems = async (orderId: string) => { 
    try { 
        const res = await fetch(`/api/orders/${orderId}/items`);

        if (!res.ok) {
            const errorData = await res.json().catch(() => { });
            throw new Error(errorData.message || "HTTP エラー");
        }
        const data = await res.json();
        return data.data;
    } catch(error) { 
        console.error("通信に失敗しました", error);
        return [];
    }
    

    
}