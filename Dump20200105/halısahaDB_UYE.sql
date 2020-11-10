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
-- Table structure for table `UYE`
--

DROP TABLE IF EXISTS `UYE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UYE` (
  `uye_id` int(11) NOT NULL AUTO_INCREMENT,
  `uye_nick` varchar(35) CHARACTER SET utf8 NOT NULL,
  `uye_ad` varchar(20) COLLATE utf8_latvian_ci DEFAULT NULL,
  `uye_soyad` varchar(20) COLLATE utf8_latvian_ci DEFAULT NULL,
  `uye_tel` varchar(20) COLLATE utf8_latvian_ci DEFAULT NULL,
  `uye_email` varchar(75) CHARACTER SET utf8 NOT NULL,
  `uye_sifre` varchar(15) COLLATE utf8_latvian_ci DEFAULT NULL,
  PRIMARY KEY (`uye_id`),
  UNIQUE KEY `uye_nick_UNIQUE` (`uye_nick`)
) ENGINE=InnoDB AUTO_INCREMENT=2156 DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UYE`
--

LOCK TABLES `UYE` WRITE;
/*!40000 ALTER TABLE `UYE` DISABLE KEYS */;
INSERT INTO `UYE` VALUES (1,'müco','Mücahit','Norris','0555123421','gmail21','123456'),(2,'abcx','Test','test','12345678','qwerty@gmail.com','1111'),(2129,'5049','Veli','Ali','+905068920327','test@gmail.com','147'),(2143,'Talpidaex','Oğuz','Bayrak','9999999999','bayrakogzhn@gmail.com','1234'),(2150,'John Doe','John','Doe','05068920327','john@gmail.com','123'),(2151,'sincanlı','Selin','Büşra','12345678901','slnbsr@gmail.com','12345678'),(2152,'Mete','mete','capar','123456','metecapar@gmail.com','12345'),(2154,'aaaa','bbbbb','bbbbb','342434','aaaa@gmail.ccom','123'),(2155,'qqq','aaaa','bbbbb','123','bbb@gmail.com','123');
/*!40000 ALTER TABLE `UYE` ENABLE KEYS */;
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
