package com.messager.utils;

import org.springframework.stereotype.Component;

@Component
public class StringUtils
{
		public String removeUseless(String value)
		{
				if(value == null)
						return null;
				String result = value.replaceAll("(\r\n|\n)+", "");
				return result.trim();
		}
}
