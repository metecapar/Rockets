-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: halısahaDB
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Sikayetler`
--

DROP TABLE IF EXISTS `Sikayetler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sikayetler` (
  `Sikayetler_id` int(11) NOT NULL AUTO_INCREMENT,
  `Sikayetci_adi` varchar(50) COLLATE utf8_latvian_ci DEFAULT NULL,
  `Sikayetci_soyad` varchar(50) COLLATE utf8_latvian_ci DEFAULT NULL,
  `Sikayetci_email` varchar(45) COLLATE utf8_latvian_ci DEFAULT NULL,
  `Sikayetci_telefon` varchar(45) COLLATE utf8_latvian_ci DEFAULT NULL,
  `Sikayetci_mesaj` varchar(500) COLLATE utf8_latvian_ci NOT NULL,
  PRIMARY KEY (`Sikayetler_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sikayetler`
--

LOCK TABLES `Sikayetler` WRITE;
/*!40000 ALTER TABLE `Sikayetler` DISABLE KEYS */;
INSERT INTO `Sikayetler` VALUES (4,'4','4','4','4','4'),(7,'Oguzhan','Bayrak','bayrakogzhn@gmail.com',NULL,'Test Sikayet\r\n'),(9,'test2','testing','john@gmail.com',NULL,'MesajUzunluğu 255 olmalı1'),(12,'Test','bayrka','admin@admin.com',NULL,'test'),(13,'bayrk','qweq','admin@admin.com',NULL,'qtrwqeq'),(14,'sdasdd','asdas','aaaa@gmail.ccom',NULL,'asdfadsf');
/*!40000 ALTER TABLE `Sikayetler` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-05 20:39:25
