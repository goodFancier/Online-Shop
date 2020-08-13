package com.messager.controller;

import com.messager.kafkaService.Producer;
import com.messager.model.Role;
import com.messager.model.enumdto.RoleName;
import com.messager.model.User;
import com.messager.payload.*;
import com.messager.payload.user.UserResponse;
import com.messager.repository.RoleRepository;
import com.messager.repository.OrderDetailsRepository;
import com.messager.repository.UserRepository;
import com.messager.exception.AppException;
import com.messager.security.CustomUserDetailsService;
import com.messager.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
		@Autowired
		AuthenticationManager authenticationManager;

		@Autowired
		UserRepository userRepository;

		@Autowired
		OrderDetailsRepository orderDetailsRepository;

		@Autowired
		RoleRepository roleRepository;

		@Autowired
		PasswordEncoder passwordEncoder;

		@Autowired
		JwtTokenProvider tokenProvider;

		@Autowired
		private CustomUserDetailsService customUserDetailsService;

		@Autowired
		Producer producer;

		private User user;

		@PostMapping("/signin")
		public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest)
		{
				User user = userRepository.findByPhone(loginRequest.getPhone())
					.orElseThrow(() ->
						new UsernameNotFoundException("Пользователь с таким номером телефона не найден : +7" + loginRequest.getPhone())
					);
				if(user.getPassword() == null || !BCrypt.checkpw(loginRequest.getPassword(), user.getPassword()))
						return new ResponseEntity(
							new ApiResponse(false, "Извините, пароль введен не верно!"),
							HttpStatus.BAD_REQUEST);
				UserDetails userDetails = customUserDetailsService.loadUserById(user.getId());
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authentication);
				String jwt = tokenProvider.generateToken(user);
				return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
		}

		@PostMapping("/requestSmsCode")
		public ResponseEntity<?> authenticateUserBySms(@Valid @RequestBody SmsResponse smsResponse)
		{
				user = userRepository.findByPhone(smsResponse.getPhone()).orElse(null);
				if(user == null)
				{
						user = new User();
						Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
							.orElseThrow(() -> new AppException("User Role not set."));
						user.setRoles(Collections.singleton(userRole));
						user.setPhone(smsResponse.getPhone());
				}
				smsResponse.setPhone("7" + smsResponse.getPhone());
				smsResponse.setSmsCode(String.valueOf(new Random().nextInt(9000) + 1000));
				user.setDisposablePassword(smsResponse.getSmsCode());
				userRepository.save(user);
				producer.sendSmsRequest(smsResponse);
				return new ResponseEntity(new ApiResponse(true, "Одноразовый код для входа отправлен!"), HttpStatus.OK);
		}

		@PostMapping("/signup")
		public ResponseEntity<?> registerUser(@Valid @RequestBody SmsResponse smsResponse)
		{
				if(!smsResponse.getSmsCode().equals(user.getDisposablePassword()))
						return new ResponseEntity(
							new ApiResponse(false, "Извините, SMS код введен не верно!"),
							HttpStatus.BAD_REQUEST);
				UserDetails userDetails = customUserDetailsService.loadUserById(user.getId());
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authentication);
				String jwt = tokenProvider.generateToken(user);
				return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, new UserResponse(user)));
		}
}
