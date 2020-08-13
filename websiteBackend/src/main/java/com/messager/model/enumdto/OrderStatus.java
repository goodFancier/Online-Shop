package com.messager.model.enumdto;

public enum OrderStatus
{
		awaitingPayment("Ожидает оплаты"),
		NEW("Новый"),
		inProgress("В обработке"),
		paid("Оплачен"),
		canceled("Отменен"),
		courierSearch("Поиск курьера"),
		courierFound("Курьер найден"),
		deliveryInProgress("Выполняется доставка"),
		awaitingConfirmation("Ожидает подтверждения"),
		delivered("Доставлен");

		OrderStatus(String title)
		{
				this.title = title;
		}

		private String title;

		public String getTitle()
		{
				return title;
		}

		@Override
		public String toString()
		{
				return getTitle();
		}
}
