package com.messager.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class KafkaConsumerConfig
{
		@Value("${spring.kafka.bootstrap-servers}")
		private String bootstrapServers;

		@Value("${group.id}")
		private String groupId;

		@Bean
		public Map<String, Object> consumerConfigs()
		{
				Map<String, Object> props = new HashMap<>();
				props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
				props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
				props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
				props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
				props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
				props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, true);
				props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, Integer.MAX_VALUE);
				return props;
		}

		@Bean
		public ConsumerFactory<String, Long> consumerFactory()
				{
				return new DefaultKafkaConsumerFactory<>(consumerConfigs());
		}

		@Bean
		public ConcurrentKafkaListenerContainerFactory<String, Long> kafkaListenerContainerFactory()
		{
				ConcurrentKafkaListenerContainerFactory<String, Long> factory = new ConcurrentKafkaListenerContainerFactory<>();
				factory.setConsumerFactory(consumerFactory());
				return factory;
		}
}
