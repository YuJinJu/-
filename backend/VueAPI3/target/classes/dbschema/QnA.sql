use ssafyvue;

CREATE TABLE `question` (
  `qno` INT NOT NULL AUTO_INCREMENT,
  `userid` VARCHAR(16) NULL DEFAULT NULL,
  `subject` VARCHAR(100) NULL DEFAULT NULL,
  `content` VARCHAR(2000) NULL DEFAULT NULL,
  `hit` INT NULL DEFAULT 0,
  `regtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`qno`),
  INDEX `question_to_member_fk` (`userid` ASC) VISIBLE,
  CONSTRAINT `question_to_member_fk`
    FOREIGN KEY (`userid`)
    REFERENCES `ssafyvue`.`ssafy_member` (`userid`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `answer` (
  `ano` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(16) NOT NULL,
  `answer` varchar(2000) NOT NULL,
  `answertime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `qno` int NOT NULL,
  PRIMARY KEY (`ano`),
  KEY `answer_qno_idx` (`qno`),
  CONSTRAINT `answer_qno` FOREIGN KEY (`qno`) REFERENCES `ssafyvue`.`question` (`qno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ans_comment` (
  `cno` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(16) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `comment_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ano` int NOT NULL,
  PRIMARY KEY (`cno`),
  KEY `comment_ano_idx` (`ano`),
  CONSTRAINT `comment_ano` FOREIGN KEY (`ano`) REFERENCES `ssafyvue`.`answer` (`ano`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;