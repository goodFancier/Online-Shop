package com.messager.utils;

import com.messager.controller.UserBucketController;
import com.messager.repository.UserBucketRepository;
import com.messager.repository.UserRepository;
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
        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        if (user.isPresent())
        {
            boolean isUserBucketPresent = userBucketRepository.findByUser(user.get()).isPresent();
            if (isUserBucketPresent)
            {
                return userBucketRepository.findByUser(user.get()).get();
            }

        } else
        {
            logger.error("не удалось получить пользователя по id");
            return null;
        }
        return null;
    }
}
