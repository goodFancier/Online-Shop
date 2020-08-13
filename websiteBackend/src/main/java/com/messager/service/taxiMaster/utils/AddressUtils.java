package com.messager.service.taxiMaster.utils;

import org.springframework.stereotype.Service;

@Service
public class AddressUtils
{
		public String cleanAddress(String address, String city)
		{
				//		String pattern1 = "�\\w*\\s*" + city + ",*"; // ����� ������ �������� ��� ��������� ����� ������ ��������
				String pattern1 = "�*\\.*\\s*" + city + ",*"; // �. ������ ��������
				String pattern2 = "\\s*" + city + ",*"; // ������ ��������
				return address
					.trim()
					.replaceAll(pattern1, "")
					.replaceAll(pattern2, "")
					.trim();
		}
}
