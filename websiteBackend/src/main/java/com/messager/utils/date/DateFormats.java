package com.messager.utils.date;

import com.messager.utils.date.formats.PaymentDateFormat;
import com.messager.utils.date.formats.RussianDateFormat;
import org.springframework.stereotype.Component;

import java.text.DateFormat;

@Component
public class DateFormats
{
		private static final RussianDateFormat RussianDateFormat = new RussianDateFormat();

		private static final PaymentDateFormat PaymentDateFormat = new PaymentDateFormat();

		public DateFormat getRussianFormat()
		{
				return RussianDateFormat;
		}

		public DateFormat getPaymentDateFormat()
		{
				return PaymentDateFormat;
		}
}
