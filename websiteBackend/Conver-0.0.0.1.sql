-- 
-- Установка кодировки, с использованием которой клиент будет посылать запросы на сервер
--
SET NAMES 'utf8';

--
-- Установка базы данных по умолчанию
--
USE messager;

--
-- Создать таблицу `users`
--
CREATE TABLE users (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  email varchar(40) DEFAULT NULL,
  name varchar(40) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  username varchar(15) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  messageRecipient bigint(20) DEFAULT NULL,
  messageSender bigint(20) DEFAULT NULL,
  messageText varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 19,
AVG_ROW_LENGTH = 124,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать индекс `UK6dotkott2kjsp8vw4d0m25fb7` для объекта типа таблица `users`
--
ALTER TABLE users
ADD UNIQUE INDEX UK6dotkott2kjsp8vw4d0m25fb7 (email);

--
-- Создать индекс `UKr43af9ap4edm43mmtq01oddj6` для объекта типа таблица `users`
--
ALTER TABLE users
ADD UNIQUE INDEX UKr43af9ap4edm43mmtq01oddj6 (username);

--
-- Создать таблицу `userbucket`
--
CREATE TABLE userbucket (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  user_id bigint(20) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 2,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE userbucket
ADD CONSTRAINT FKgoajfs2flbbq9rsw9yby1o424 FOREIGN KEY (user_id)
REFERENCES users (id);

--
-- Создать таблицу `messages`
--
CREATE TABLE messages (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  messageRecipient bigint(20) DEFAULT NULL,
  messageSender bigint(20) DEFAULT NULL,
  messageText varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 4,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE messages
ADD CONSTRAINT FK_messages_messageRecipient FOREIGN KEY (messageRecipient)
REFERENCES users (id) ON DELETE NO ACTION;

--
-- Создать внешний ключ
--
ALTER TABLE messages
ADD CONSTRAINT FK_messages_messageSender FOREIGN KEY (messageSender)
REFERENCES users (id) ON DELETE NO ACTION;

--
-- Создать таблицу `roles`
--
CREATE TABLE roles (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  name varchar(60) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать индекс `UK_nb4h0p6txrmfc0xbrd1kglp9t` для объекта типа таблица `roles`
--
ALTER TABLE roles
ADD UNIQUE INDEX UK_nb4h0p6txrmfc0xbrd1kglp9t (name);

--
-- Создать таблицу `user_roles`
--
CREATE TABLE user_roles (
  user_id bigint(20) NOT NULL,
  role_id bigint(20) NOT NULL,
  PRIMARY KEY (user_id, role_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 963,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE user_roles
ADD CONSTRAINT FKh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id)
REFERENCES roles (id);

--
-- Создать внешний ключ
--
ALTER TABLE user_roles
ADD CONSTRAINT FKhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id)
REFERENCES users (id);

--
-- Создать таблицу `good`
--
CREATE TABLE good (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  currentPrice varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  oldPrice varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 3,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать таблицу `userbucket_goods`
--
CREATE TABLE userbucket_goods (
  user_bucket bigint(20) NOT NULL,
  good_id bigint(20) NOT NULL
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Создать внешний ключ
--
ALTER TABLE userbucket_goods
ADD CONSTRAINT FKkg6u4j359sofnoh559xcc9il FOREIGN KEY (user_bucket)
REFERENCES userbucket (id);

--
-- Создать внешний ключ
--
ALTER TABLE userbucket_goods
ADD CONSTRAINT FKqbu6s8chlltqaxtt5r30sp47n FOREIGN KEY (good_id)
REFERENCES good (id);