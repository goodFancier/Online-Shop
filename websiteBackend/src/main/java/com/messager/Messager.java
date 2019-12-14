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

import java.io.IOException;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.messager.config",
        "com.messager.Controller",
        "com.messager.model",
        "com.messager.exception",
        "com.messager.Repository",
        "com.messager.security",
        "com.messager.utils"
})
public class Messager
{
    public static void main(String[] args)
    {
        SpringApplication.run(new Class<?>[]{Messager.class, JpaConfig.class}, args);
    }

    @Bean
    public JsonDeserializer jsonDeserializer() {
        return new JsonDeserializer() {
            @Override
            public Object deserialize(JsonParser p, DeserializationContext context) throws IOException
            {
                return null;
            }
        };
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
