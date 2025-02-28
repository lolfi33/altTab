export class OrderErrorItem {
  mealId: string;
  name: string;
  requestedQuantity: number;
  availableQuantity: number;
}

export class OrderResponseDto {
  success: boolean;
  orderId?: string;
  errorItems?: OrderErrorItem[];
  message?: string;
}
