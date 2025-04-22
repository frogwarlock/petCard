-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: petcare
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consultas`
--

DROP TABLE IF EXISTS `consultas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `petId` int NOT NULL,
  `veterinario` varchar(60) NOT NULL,
  `dataConsulta` date NOT NULL,
  `motivo` varchar(100) DEFAULT NULL,
  `observacoes` text,
  PRIMARY KEY (`id`),
  KEY `petId` (`petId`),
  CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultas`
--

LOCK TABLES `consultas` WRITE;
/*!40000 ALTER TABLE `consultas` DISABLE KEYS */;
INSERT INTO `consultas` VALUES (2,2,'Dr. Paulo','2024-02-20','Tosse','Receitou xarope'),(3,1,'Dra. Helena','2024-04-15','Vacinação','Tudo certo'),(4,1,'Dr. Victor','2024-04-20','Vacinação anual','Tudo em ordem'),(5,2,'Dr. Herácio','2025-04-21','Checkup','Remédios ministrados, próxima vez ministrar pré-anestésico.'),(8,10,'Zé da Esquina','2025-04-21','probióticos','o passarinho tinha mudado de casa e foi interessante dar probiótico'),(9,9,'Dr. Maria Fernanda ','2025-04-16','Checkup','Exame de rotina, tudo ok!'),(10,5,'Dr. Daniela','2023-07-21','Limpeza Bucal','Paciente apresentava tártaro nos dentes, precisou ser sedada para a retirada, alguns dentes foram perdidos mas não deve impactar na vida do animal.'),(11,4,'Dr. Atticus','2025-03-03','Biópsia de nódulo','Ratinho apresentou nódulo, fazer avaliação para avaliar benigno ou não, retornar daqui um mês para retirada.');
/*!40000 ALTER TABLE `consultas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 17:10:32
