export interface InventoryItem {
    sku: string;
    quantityOnHand: number;
    reorderPoint: number;
    targetQuantity: number;
    orderMultiple: number;
}

export interface RestockOrder {
    sku: string;
    quantityToOrder: number;
}

export function calculateRestockOrders(
    items: InventoryItem[]
): RestockOrder[] {
    return items
        .filter(item => item.quantityOnHand <= item.reorderPoint)
        .map(item => {
            const shortage = item.targetQuantity - item.quantityOnHand;

            const quantityToOrder =
                Math.ceil(shortage / item.orderMultiple) *
                item.orderMultiple;

            return {
                sku: item.sku,
                quantityToOrder
            };
        });
}

export function isValidSku(sku: string): boolean {
    return /^[A-Z]{3}-\d{5}$/.test(sku);
}