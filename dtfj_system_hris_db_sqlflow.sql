-- Cleaned SQL for ERD generation (SQLFlow/MySQL compatible)
-- Project: HRIS System
-- Source: dtfj_system_hris_db.sql

-- --------------------------------------------------------
-- Table structure for table `activity_logs`
-- --------------------------------------------------------
CREATE TABLE `activity_logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `announcements`
-- --------------------------------------------------------
CREATE TABLE `announcements` (
  `announcement_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `posted_by` int(11) DEFAULT NULL,
  `date_posted` datetime DEFAULT NULL,
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `attendance_disputes`
-- --------------------------------------------------------
CREATE TABLE `attendance_disputes` (
  `dispute_id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `dispute_date` date DEFAULT NULL,
  `dispute_type` varchar(100) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` enum('Pending','Endorsed','Approved','Denied') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  PRIMARY KEY (`dispute_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `attendance_logs`
-- --------------------------------------------------------
CREATE TABLE `attendance_logs` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `timelog_id` int(11) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `attendance_date` date DEFAULT NULL,
  `attendance_status` enum('Present','Absent','Late','Overtime','On Leave') DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  UNIQUE KEY `unique_employee_date` (`employee_id`,`attendance_date`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `break_logs`
-- --------------------------------------------------------
CREATE TABLE `break_logs` (
  `break_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `time_log_id` int(11) DEFAULT NULL,
  `cluster_id` int(11) DEFAULT NULL,
  `break_start` datetime DEFAULT NULL,
  `break_end` datetime DEFAULT NULL,
  `total_break_hour` double(11,2) DEFAULT NULL,
  PRIMARY KEY (`break_log_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `clusters`
-- --------------------------------------------------------
CREATE TABLE `clusters` (
  `cluster_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','active','rejected') DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cluster_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `cluster_members`
-- --------------------------------------------------------
CREATE TABLE `cluster_members` (
  `cluster_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`cluster_id`,`employee_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `employees`
-- --------------------------------------------------------
CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `personal_email` varchar(100) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `account` varchar(100) DEFAULT NULL,
  `cluster_id` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `employment_status` varchar(20) DEFAULT NULL,
  `employee_type` varchar(30) DEFAULT NULL,
  `date_hired` date DEFAULT NULL,
  `archived` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `holidays`
-- --------------------------------------------------------
CREATE TABLE `holidays` (
  `holiday_id` int(11) NOT NULL AUTO_INCREMENT,
  `holiday_name` varchar(50) DEFAULT NULL,
  `holiday_date` date DEFAULT NULL,
  PRIMARY KEY (`holiday_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `leave_requests`
-- --------------------------------------------------------
CREATE TABLE `leave_requests` (
  `leave_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `leave_type` varchar(50) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `reviewed_by` int(11) DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `agreement_1` tinyint(1) DEFAULT NULL,
  `agreement_2` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `remarks` text DEFAULT NULL,
  PRIMARY KEY (`leave_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `overtime_requests`
-- --------------------------------------------------------
CREATE TABLE `overtime_requests` (
  `ot_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `ot_type` enum('Regular Overtime','Duty on Rest Day','Duty on Rest Day OT') DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `agreement_1` tinyint(1) DEFAULT NULL,
  `agreement_2` tinyint(1) DEFAULT NULL,
  `status` enum('Pending','Endorsed','Approved','Denied') DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  PRIMARY KEY (`ot_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `permissions`
-- --------------------------------------------------------
CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `roles`
-- --------------------------------------------------------
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `role_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `role_permissions`
-- --------------------------------------------------------
CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `schedules`
-- --------------------------------------------------------
CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `cluster_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
  `shift_type` enum('Morning','Mid','Night') DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `work_setup` enum('Onsite','WFH','Hybrid') DEFAULT NULL,
  `breaksched_start` datetime DEFAULT NULL,
  `breaksched_end` datetime DEFAULT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `time_logs`
-- --------------------------------------------------------
CREATE TABLE `time_logs` (
  `time_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `attendance_id` int(11) DEFAULT NULL,
  `time_in` datetime DEFAULT NULL,
  `time_out` datetime DEFAULT NULL,
  `break_start` datetime DEFAULT NULL,
  `break_end` datetime DEFAULT NULL,
  `total_hours` double(5,2) DEFAULT NULL,
  `log_date` date DEFAULT NULL,
  `tag` enum('On Time','Late','Absent','Break Time','Lunch Time') DEFAULT NULL,
  PRIMARY KEY (`time_log_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Table structure for table `user_permissions`
-- --------------------------------------------------------
CREATE TABLE `user_permissions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `is_allowed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `permission_id` (`permission_id`)
) ENGINE=InnoDB;

-- --------------------------------------------------------
-- Foreign Key Constraints
-- --------------------------------------------------------

ALTER TABLE `activity_logs` ADD CONSTRAINT `fk_activity_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `announcements` ADD CONSTRAINT `fk_announcement_user` FOREIGN KEY (`posted_by`) REFERENCES `users` (`user_id`);
ALTER TABLE `attendance_disputes` ADD CONSTRAINT `fk_dispute_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `clusters` (`cluster_id`);
ALTER TABLE `attendance_disputes` ADD CONSTRAINT `fk_dispute_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_attendance_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `clusters` (`cluster_id`);
ALTER TABLE `attendance_logs` ADD CONSTRAINT `fk_attendance_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `break_logs` ADD CONSTRAINT `fk_break_timelog` FOREIGN KEY (`time_log_id`) REFERENCES `time_logs` (`time_log_id`);
ALTER TABLE `break_logs` ADD CONSTRAINT `fk_break_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `clusters` (`cluster_id`);
ALTER TABLE `clusters` ADD CONSTRAINT `fk_cluster_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `cluster_members` ADD CONSTRAINT `fk_member_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `clusters` (`cluster_id`);
ALTER TABLE `cluster_members` ADD CONSTRAINT `fk_member_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `employees` ADD CONSTRAINT `fk_employee_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `leave_requests` ADD CONSTRAINT `fk_leave_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `leave_requests` ADD CONSTRAINT `fk_leave_reviewer` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`);
ALTER TABLE `leave_requests` ADD CONSTRAINT `fk_leave_approver` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`);
ALTER TABLE `overtime_requests` ADD CONSTRAINT `fk_ot_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `overtime_requests` ADD CONSTRAINT `fk_ot_approver` FOREIGN KEY (`approved_by`) REFERENCES `users` (`user_id`);
ALTER TABLE `role_permissions` ADD CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
ALTER TABLE `role_permissions` ADD CONSTRAINT `fk_rp_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`);
ALTER TABLE `schedules` ADD CONSTRAINT `fk_schedule_cluster` FOREIGN KEY (`cluster_id`) REFERENCES `clusters` (`cluster_id`);
ALTER TABLE `schedules` ADD CONSTRAINT `fk_schedule_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `time_logs` ADD CONSTRAINT `fk_time_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `time_logs` ADD CONSTRAINT `fk_time_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);
ALTER TABLE `users` ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
ALTER TABLE `user_permissions` ADD CONSTRAINT `fk_up_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
ALTER TABLE `user_permissions` ADD CONSTRAINT `fk_up_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`);
