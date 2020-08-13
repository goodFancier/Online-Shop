package com.messager;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messager.config.JpaConfig;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

@SpringBootApplication
@ComponentScan(basePackages = {
	"com.messager.config",
	"com.messager.controller",
	"com.messager.model",
	"com.messager.exception",
	"com.messager.repository",
	"com.messager.security",
	"com.messager.utils",
	"com.messager.kafkaService",
	"com.messager.service",
	"com.messager.schedule"
})
@PropertySource({"classpath:kafka.properties"})
@EnableScheduling
public class OnlineShopApplication
{
		public static void main(String[] args)
		{
				SpringApplication.run(new Class<?>[]{OnlineShopApplication.class, JpaConfig.class}, args);
		}

		@Bean
		public JsonDeserializer jsonDeserializer()
		{
				return new JsonDeserializer()
				{
						@Override
						public Object deserialize(JsonParser p, DeserializationContext context) throws IOException
						{
								return null;
						}
				};
		}

		@Bean
		public ObjectMapper objectMapper()
		{
				return new ObjectMapper();
		}
}
