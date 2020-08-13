package com.messager.service.order.payment;

import com.google.gson.Gson;
import com.messager.payload.good.GoodListResponse;
import com.messager.payload.order.OrderResponse;
import com.messager.payload.payment.CKassaRequestProperties;
import com.messager.payload.payment.PaymentResponse;
import com.messager.payload.payment.PaymentStatusResponse;
import com.messager.utils.date.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PaymentService
{
		@Autowired
		private CKassaApi cKassaApi;

		@Value("${ckassa.shopToken}")
		private String shopToken;

		@Value("${ckassa.secKey}")
		private String secKey;

		@Value("${ckassa.servCode}")
		private String servCode;

		@Autowired
		DateUtils dateUtils;

		public String registerUser() throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setLogin("79999999999");
				paymentResponse.setEmail("adasd@gmail.com");
				paymentResponse.setName("user");
				paymentResponse.setSurName("user");
				paymentResponse.setMiddleName("user");
				paymentResponse.setShopToken(shopToken);
				String requestBody = paymentResponse.getLogin() + '&'
					+ paymentResponse.getEmail() + '&'
					+ paymentResponse.getName() + '&'
					+ paymentResponse.getSurName() + '&'
					+ paymentResponse.getMiddleName() + '&'
					+ paymentResponse.getShopToken() + '&'
					+ secKey;
				paymentResponse.setSign(MD5(MD5(requestBody).toUpperCase()).toUpperCase());
				return cKassaApi.call("user/registration", new Gson().toJson(paymentResponse));
		}

		public String getUserStatus() throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setLogin("79999999999");
				paymentResponse.setShopToken(shopToken);
				String requestBody = paymentResponse.getLogin() + '&'
					+ paymentResponse.getShopToken() + '&'
					+ secKey;
				paymentResponse.setSign(MD5(MD5(requestBody).toUpperCase()).toUpperCase());
				return cKassaApi.call("user/status", new Gson().toJson(paymentResponse));
		}

		public String registerCard() throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setUserToken("450c2adc-e19f-4194-b081-a028bc381b64");
				paymentResponse.setShopToken(shopToken);
				String requestBody =
					paymentResponse.getUserToken() + '&'
						+ paymentResponse.getShopToken() + '&'
						+ secKey;
				paymentResponse.setSign(MD5(MD5(requestBody).toUpperCase()).toUpperCase());
				return cKassaApi.call("card/registration", new Gson().toJson(paymentResponse));
		}

		public String getCardList() throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setUserToken("450c2adc-e19f-4194-b081-a028bc381b64");
				paymentResponse.setShopToken(shopToken);
				String requestBody =
					paymentResponse.getUserToken() + '&'
						+ paymentResponse.getShopToken() + '&'
						+ secKey;
				paymentResponse.setSign(MD5(MD5(requestBody).toUpperCase()).toUpperCase());
				return cKassaApi.call("get/cards", new Gson().toJson(paymentResponse));
		}

		public String makePayment() throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setServiceCode(servCode);
				paymentResponse.setUserToken("450c2adc-e19f-4194-b081-a028bc381b64");
				paymentResponse.setAmount(10000);
				paymentResponse.setComission("0");
				List<CKassaRequestProperties> requestProperties = new ArrayList<>();
				requestProperties.add(new CKassaRequestProperties("НОМЕР_ЗАКАЗА", "120"));
				requestProperties.add(new CKassaRequestProperties("ДАТА_ЗАКАЗА", "24.04.2020"));
				requestProperties.add(new CKassaRequestProperties("ПОЛУЧАТЕЛЬ", "ООО Деловая культура"));
				paymentResponse.setProperties(requestProperties);
				paymentResponse.setShopToken(shopToken);
				StringBuilder requestBody = new StringBuilder(paymentResponse.getServiceCode() + '&'
					+ paymentResponse.getUserToken() + '&'
					+ paymentResponse.getAmount() + '&'
					+ paymentResponse.getComission() + '&');
				for(CKassaRequestProperties properties : requestProperties)
				{
						requestBody.append(properties.getName()).append('&').append(properties.getValue()).append('&');
				}
				requestBody.append(paymentResponse.getShopToken()).append('&');
				requestBody.append(secKey);
				paymentResponse.setSign(MD5(MD5(requestBody.toString()).toUpperCase()).toUpperCase());
				return cKassaApi.call("do/payment", new Gson().toJson(paymentResponse));
		}

		public String makeAnonymousPayment(OrderResponse orderResponse) throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setServiceCode(servCode);
				paymentResponse.setAmount(BigDecimal.valueOf(orderResponse.getDeliveryPrice()).add(orderResponse.getTotalSum()).multiply(new BigDecimal(100)).intValue());
				paymentResponse.setComission("0");
				//		paymentResponse.setOrderBestBefore(String.valueOf(dateUtils.addMinutes(new Date(), 5).getTime()));
				List<CKassaRequestProperties> requestProperties = new ArrayList<>();
				requestProperties.add(new CKassaRequestProperties("НОМЕР_ЗАКАЗА", orderResponse.getId().toString()));
				requestProperties.add(new CKassaRequestProperties("ДАТА_ЗАКАЗА", orderResponse.getCreatedAt().substring(0, orderResponse.getCreatedAt().indexOf(" "))));
				requestProperties.add(new CKassaRequestProperties("ПОЛУЧАТЕЛЬ", orderResponse.getRetailerName()));
				paymentResponse.setProperties(requestProperties);
				paymentResponse.setShopToken(shopToken);
				StringBuilder requestBody = new StringBuilder(paymentResponse.getServiceCode() + '&'
					+ paymentResponse.getAmount() + '&'
					+ paymentResponse.getComission() + '&'
					/*+ paymentResponse.getOrderBestBefore() + '&'*/);
				for(CKassaRequestProperties properties : requestProperties)
				{
						requestBody.append(properties.getName()).append('&').append(properties.getValue()).append('&');
				}
				requestBody.append(paymentResponse.getShopToken()).append('&');
				requestBody.append(secKey);
				paymentResponse.setSign(MD5(MD5(requestBody.toString()).toUpperCase()).toUpperCase());
				return cKassaApi.call("do/payment/anonymous", new Gson().toJson(paymentResponse));
		}

		public PaymentStatusResponse getPaymentStatus(String paymentNumber) throws Exception
		{
				PaymentResponse paymentResponse = new PaymentResponse();
				paymentResponse.setRegPayNum(paymentNumber);
				paymentResponse.setShopToken(shopToken);
				StringBuilder requestBody = new StringBuilder(paymentResponse.getRegPayNum() + '&');
				requestBody.append(paymentResponse.getShopToken()).append('&');
				requestBody.append(secKey);
				paymentResponse.setSign(MD5(MD5(requestBody.toString()).toUpperCase()).toUpperCase());
				return new Gson().fromJson(cKassaApi.call("check/payment/state", new Gson().toJson(paymentResponse)), PaymentStatusResponse.class);
		}

		private String MD5(String str)
		{
				MessageDigest md5;
				StringBuffer hexString = new StringBuffer();
				try
				{
						md5 = MessageDigest.getInstance("md5");
						md5.reset();
						md5.update(str.getBytes());
						byte messageDigest[] = md5.digest();
						for(int i = 0; i < messageDigest.length; i++)
						{
								hexString.append(Integer.toHexString((0xFF & messageDigest[i]) | 0x100).substring(1, 3).toUpperCase());
						}
				}
				catch(NoSuchAlgorithmException e)
				{
						return e.toString();
				}
				return hexString.toString();
		}
}
