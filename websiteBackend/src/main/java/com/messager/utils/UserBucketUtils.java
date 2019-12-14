package com.messager.utils;

import com.messager.Controller.UserBucketController;
import com.messager.Repository.UserBucketRepository;
import com.messager.Repository.UserRepository;
import com.messager.model.User;
import com.messager.model.UserBucket;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserBucketUtils
{
    private static final Logger logger = LoggerFactory.getLogger(UserBucketController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserBucketRepository userBucketRepository;

    public UserBucket getUserBucketByUserId(String userId)
    {
        UserBucket userBucket;
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        if (user.isPresent())
        {
            boolean isUserBucketPresent = userBucketRepository.findByUser(user.get()).isPresent();
            if (isUserBucketPresent)
            {
                userBucket = userBucketRepository.findByUser(user.get()).get();
            } else
            {
                logger.info("Корзины пользователя {} не найдено", userId);
                logger.info("Корзины не найдено. Создаем новую для пользователя");
                userBucket = new UserBucket();
                userBucket.setUser(user.get());
                userBucketRepository.save(userBucket);
            }
        } else
        {
            logger.error("не удалось получить пользователя по id");
            return null;
        }
        return userBucket;
    }
}
