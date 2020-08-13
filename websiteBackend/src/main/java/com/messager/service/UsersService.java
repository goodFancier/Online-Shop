package com.messager.service;

import com.messager.model.User;
import com.messager.payload.ApiResponse;
import com.messager.payload.UserProfile;
import com.messager.repository.UserRepository;
import com.messager.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService
{
		@Autowired
		UserRepository userRepository;

		public ResponseEntity<?> saveUserProfile(UserPrincipal userPrincipal, UserProfile userProfileForm)
		{
				Optional<User> userDto = userRepository.findById(userPrincipal.getId());
				User user = userDto.orElse(null);
				if(user != null && !user.getPhone().equals(userProfileForm.getPhone()) && userRepository.existsByPhone(userProfileForm.getPhone()))
						return new ResponseEntity(
							new ApiResponse(false, "Пользователь с указаным номером телефона уже зарегистрирован! Пожалуйста, укажите другой номер телефона"),
							HttpStatus.BAD_REQUEST);
				if(user != null && user.getEmail() != null && !user.getEmail().equals(userProfileForm.getEmail()) && userRepository.existsByEmail(userProfileForm.getEmail()))
						return new ResponseEntity(
							new ApiResponse(false, "Пользователь с указаным email уже зарегистрирован! Пожалуйста, укажите другой номер телефона"),
							HttpStatus.BAD_REQUEST);
				if(user != null)
				{
						user.setSurname(userProfileForm.getSurname());
						user.setName(userProfileForm.getName());
						user.setLastname(userProfileForm.getLastname());
						user.setUsername(userProfileForm.getUsername());
						user.setEmail(userProfileForm.getEmail());
						user.setPhone(userProfileForm.getPhone());
						user.setPassword(BCrypt.hashpw(userProfileForm.getPassword(), BCrypt.gensalt()));
						user.setCity(userProfileForm.getCity());
						userRepository.save(user);
						return new ResponseEntity(new ApiResponse(true, "Изменения сохранены!"), HttpStatus.OK);
				}
				else
				{
						return new ResponseEntity(
							new ApiResponse(false, "Неизвестная ошибка! Попробуйте перезагрузить страницу"),
							HttpStatus.BAD_REQUEST);
				}
		}

		public Boolean saveCity(UserPrincipal userPrincipal, String city)
		{
			Optional<User> userDto = userRepository.findById(userPrincipal.getId());
			User user = userDto.orElse(null);
			if(user != null)
			{
				user.setCity(city);
				userRepository.save(user);
				return true;
			}
			else
				return false;
		}
}
