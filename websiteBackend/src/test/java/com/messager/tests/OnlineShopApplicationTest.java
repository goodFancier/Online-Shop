package com.messager.tests;

import com.messager.controller.UserController;
import com.messager.model.User;
import com.messager.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

@SpringBootTest
public class OnlineShopApplicationTest
{
    @Mock
    UserRepository userRepository;

    @Mock
    UserController userController;

    @Before
    public void setUp()
    {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void signInTest()
    {
        User user = new User();
        user.setName("user@mail.ru");
        user.setPassword("123456");
        userRepository.save(user);
        verify(userRepository).save(any(User.class));
    }

    @Test
    public void getAllUsersTest()
    {
        userController.getAllUsers();
        verify(userController, times(1)).getAllUsers();
    }

    @Test
    public void findByUserNameOrEmailTest()
    {
        List<User> userList = new ArrayList<>();
        User user = new User();
        user.setName("userName");
        user.setEmail("userEmail@yandex.ru");
        userList.add(user);
        when(userRepository.findAll()).thenReturn(userList);
        verify(userRepository, never()).save(isA(User.class));
    }
}