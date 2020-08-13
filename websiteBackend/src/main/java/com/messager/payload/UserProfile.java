package com.messager.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.Size;
import java.time.Instant;

public class UserProfile
{
		@JsonIgnore
		private Long id;

		@JsonIgnore
		private Instant joinedAt;

		@JsonIgnore
		private String avatarImgUrl;

		private String surname;

		private String name;

		private String lastname;

		private String username;

		private String phone;

		private String email;

		private String password;

		private String city;

		public UserProfile(Long id, String username, String name, Instant joinedAt, String phone, String email, String password, String city)
		{
				this.id = id;
				this.username = username;
				this.name = name;
				this.joinedAt = joinedAt;
				this.email = email;
				this.phone = phone;
				this.password = password;
				this.city = city;
		}

		public UserProfile()
			{
			}

		public UserProfile(String username, String phone, String email, String password)
		{
				this.username = username;
				this.email = email;
				this.phone = phone;
				this.password = password;
		}

		public UserProfile(Long id, String surname, String name, String lastname, String username, Instant joinedAt, String phone, String email, String password, String city) {
			this.id = id;
			this.surname = surname;
			this.name = name;
			this.lastname = lastname;
			this.username = username;
			this.joinedAt = joinedAt;
			this.phone = phone;
			this.email = email;
			this.password = password;
			this.city = city;
		}

		public Long getId()
		{
				return id;
		}

		public void setId(Long id)
		{
				this.id = id;
		}

		public String getUsername()
		{
				return username;
		}

		public void setUsername(String username)
		{
				this.username = username;
		}

		public String getName()
		{
				return name;
		}

		public void setName(String name)
		{
				this.name = name;
		}

		public Instant getJoinedAt()
		{
				return joinedAt;
		}

		public void setJoinedAt(Instant joinedAt)
		{
				this.joinedAt = joinedAt;
		}

		public String getAvatarImgUrl()
		{
				return avatarImgUrl;
		}

		public void setAvatarImgUrl(String avatarImgUrl)
		{
				this.avatarImgUrl = avatarImgUrl;
		}

		public String getPhone()
		{
				return phone;
		}

		public void setPhone(String phone)
		{
				this.phone = phone;
		}

		public String getEmail()
		{
				return email;
		}

		public void setEmail(String email)
		{
				this.email = email;
		}

		public String getPassword()
		{
				return password;
		}

		public void setPassword(String password)
		{
				this.password = password;
		}

		public String getSurname()
		{
			return surname;
		}

		public void setSurname(String surname)
		{
			this.surname = surname;
		}

		public String getLastname()
		{
			return lastname;
		}

		public void setLastname(String lastname)
		{
			this.lastname = lastname;
		}

		public String getCity()
		{
			return city;
		}

		public void setCity(String city)
		{
			this.city = city;
		}
}
