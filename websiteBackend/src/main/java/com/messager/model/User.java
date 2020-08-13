package com.messager.model;

import com.messager.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"phone"})})
public class User extends DateAudit
{
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;

		@Size(max = 40)
		private String surname;

		@Size(max = 40)
		private String name;

		@Size(max = 40)
		private String lastname;

		@Size(max = 30)
		private String username = "default";

		@NotBlank
		@Size(max = 15)
		private String phone;

		@Size(max = 40)
		@Email
		private String email;

    	@Column(name = "password", columnDefinition = "char(60)")
		private String password;

		@Lob
		private byte[] avatar;

		private String disposablePassword;

		/**
		 * Список заказов
		 */
		@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
		private List<Orders> ordersList;

		@ManyToMany(fetch = FetchType.LAZY)
		@JoinTable(name = "user_roles",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "role_id"))
		private Set<Role> roles = new HashSet<>();

		private String city;

		public User()
		{
		}

		public User(String surname, String name, String lastname, String username, String email, String password, String city)
		{
				this.surname = surname;
				this.name = name;
				this.lastname = lastname;
				this.username = username;
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

		public Set<Role> getRoles()
		{
				return roles;
		}

		public void setRoles(Set<Role> roles)
		{
				this.roles = roles;
		}

		public byte[] getAvatar()
		{
				return avatar;
		}

		public void setAvatar(byte[] avatar)
		{
				this.avatar = avatar;
		}

		public String getPhone()
		{
				return phone;
		}

		public void setPhone(String phone)
		{
				this.phone = phone;
		}

		public String getDisposablePassword()
		{
				return disposablePassword;
		}

		public void setDisposablePassword(String disposablePassword)
		{
				this.disposablePassword = disposablePassword;
		}



		public List<Orders> getOrdersList() {
			return ordersList;
		}

		public void setOrdersList(List<Orders> ordersList) {
			this.ordersList = ordersList;
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