package com.messager.Repository;

import com.messager.model.User;
import com.messager.model.UserBucket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserBucketRepository extends JpaRepository<UserBucket, Long>
{
    Optional<UserBucket> findByUser(User user);
}
