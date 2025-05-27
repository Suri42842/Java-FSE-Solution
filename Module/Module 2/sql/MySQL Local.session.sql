

CREATE DATABASE IF NOT EXISTS JavaFSE;
USE JavaFSE;
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique user ID ',
    full_name VARCHAR(100) NOT NULL COMMENT 'Full name of the user ',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'User email address ',
    city VARCHAR(50) COMMENT 'City of the user ',
    registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date when user registered'
);
CREATE TABLE IF NOT EXISTS events (
    event_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique event Identifier',
    title VARCHAR(200) NOT NULL COMMENT 'Title of the event ',
    description TEXT COMMENT 'Description of the event ',
    city VARCHAR(100) NOT NULL COMMENT 'City where the event is held ',
    start_date DATETIME NOT NULL COMMENT 'Event start date and time',
    end_date DATETIME NOT NULL COMMENT 'Event end date and time',
    status ENUM('Upcoming', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Upcoming' COMMENT 'Current status ',
    organizer_id INT NOT NULL COMMENT 'User ID of the event organizer ',
    FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique sessionmidentifier ',
    event_id INT NOT NULL COMMENT ' Associated event',
    title VARCHAR(200) NOT NULL COMMENT 'Title of the session ',
    speaker_name VARCHAR(100) NOT NULL COMMENT 'Name of the speaker ',
    start_time DATETIME NOT NULL COMMENT 'Session start  time ',
    end_time DATETIME NOT NULL COMMENT 'Session end  time ',
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
CREATE TABLE IF NOT EXISTS Registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique registration ID ',
    user_id INT NOT NULL COMMENT 'User ID of the registrant ',
    event_id INT NOT NULL COMMENT 'registered event',
    registration_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of registration',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
CREATE TABLE IF NOT EXISTS Feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique feedback ID',
    user_id INT NOT NULL COMMENT 'User who providing feedback ',
    event_id INT NOT NULL COMMENT 'Event  for which feedback is provided',
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL COMMENT 'Rating out of 5',
    comments TEXT COMMENT 'optional comments ',
    feedback_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date of feedback ',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
CREATE TABLE IF NOT EXISTS Resources(
    resource_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique resource ID',
    event_id INT COMMENT 'AssociatedEvent',
    resource_type ENUM('Document', 'Video', 'Audio', 'Image') NOT NULL COMMENT 'Type of the resource',
    resource_url VARCHAR(255) NOT NULL COMMENT 'path or link to the resource',
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'uploaded timestamp',
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);
INSERT INTO users (full_name,email,city,registration_date) VALUES
('Alice Johnson', 'alice1@example.com', 'New York', '2024-12-01'),
('Bob Smith', 'bob1@example.com', 'Los Angeles', '2024-12-05'),
('Charlie Lee', 'charlie1@example.com', 'Chicago', '2024-12-10'),
('Diana King', 'diana1@example.com', 'New York', '2025-01-15'),
('Ethan Hunt', 'ethan1@example.com', 'Los Angeles', '2025-02-01');
INSERT INTO events (title, description, city, start_date, end_date, status, organizer_id) VALUES
('Tech Innovators Meetup', 'A meetup for tech enthusiasts.', 'New York', '2025-06-10', '2025-06-10', 'Upcoming', '1'),
('AI & ML Conference', 'Conference on AI and ML.', 'Chicago', '2025-05-15', '2025-05-15', 'Completed', '3'),
('Frontend Development Bootcamp', 'Hands on Training on frontend tech', 'Los Angeles', '2025-07-01', '2025-07-03', 'Upcoming', '2');
INSERT INTO Sessions (session_id, event_id, title, speaker_name, start_time, end_time) VALUES
('1','1', 'Opening keynote', 'Dr.Tech', '2025-06-10 10:00:00', '2025-06-10 11:00:00'),
('2','1','Future of web dev', 'Alice Johnson', '2025-06-10 11:15:00', '2025-06-10 12:30:00'),
('3', '2','AI in healthcare', 'Charlie Lee', '2025-05-15 09:30:00', '2025-05-15 11:00:00'),
('4', '3','Intro to HTML5', 'Bob Smith', '2025-07-01 10:00:00', '2025-07-01 12:00:00');
INSERT INTO Registrations (reference_id, user_id, event_id, registration_date) VALUES
('1','1', '1', '2025-05-01'),
('2','2', '1', '2025-05-02'),
('3','3', '2', '2025-04-30'),
('4','4', '2', '2025-04-28'),
('5','5', '3', '2025-06-15');
INSERT INTO Registrations (registration_id, user_id, event_id, registration_date) VALUES
('1', '1', '1', '2025-05-01'),
('2', '2', '1', '2025-05-02'),
('3', '3', '2', '2025-04-30'),
('4', '4', '2', '2025-04-28'),
('5', '5', '3', '2025-06-15');
insert into Feedback (feedback_id, user_id, event_id,rating,comments, feedback_date) values
('1', '3', '2', 4, 'Great insights!', '2025-05-16'),
('2', '4', '2', 5, 'Very informative.', '2025-05-16'),
('3', '3', '1', 3, 'Could be better.', '2025-04-11');
INSERT into resources (resource_id, event_id, resource_type, resource_url,uploaded_at) VALUES
('1', '1', 'pdf', 'https://portal.com/resources/tech_meetup_agenda.pdf', '2025-05-01 10:00:00'),
('2', '2', 'image', 'https://portal.com/resources/ai_poster.jpg', '2025-04-20 09:00:00'),
('3', '3', 'link', 'https://portal.com/resources/html5_doc', '2025-06-25 15:00:00');
--upcoming events--

SELECT 
    e.event_id,
    e.title,
    e.city,
    e.start_date,
    e.end_date
FROM 
    users u
JOIN 
    Registrations r ON u.user_id = r.user_id
JOIN 
    events e ON r.event_id = e.event_id
WHERE 
    u.user_id = :user_id
    AND e.status = 'Upcoming'
    AND e.city = u.city
ORDER BY 
    e.start_date ASC;
--top rated events--
SELECT 
    e.event_id,
    e.event_name,
    AVG(f.rating) AS average_rating,
    COUNT(f.feedback_id) AS feedback_count
FROM 
    events e
JOIN 
    feedback f ON e.event_id = f.event_id
GROUP BY 
    e.event_id, e.event_name
HAVING 
    COUNT(f.feedback_id) >= 10
ORDER BY 
    average_rating DESC;
    --inactive users--
    SELECT u.user_id, u.username, u.email
FROM users u
LEFT JOIN event_registrations er
    ON u.user_id = er.user_id
    AND er.registration_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
WHERE er.registration_id IS NULL;
--peek session--
SELECT 
    event_id,
    COUNT(*) AS session_count
FROM 
    sessions
WHERE 
    TIME(session_start) >= '10:00:00'
    AND TIME(session_start) < '12:00:00'
GROUP BY 
    event_id;
    --most active cities--
    SELECT city, COUNT(DISTINCT user_id) AS registration_count
FROM users
GROUP BY city
ORDER BY registration_count DESC
LIMIT 5;
--event resources--
SELECT 
    e.event_id,
    e.event_name,
    SUM(CASE WHEN r.resource_type = 'PDF' THEN 1 ELSE 0 END) AS pdf_count,
    SUM(CASE WHEN r.resource_type = 'Image' THEN 1 ELSE 0 END) AS image_count,
    SUM(CASE WHEN r.resource_type = 'Link' THEN 1 ELSE 0 END) AS link_count,
    COUNT(r.resource_id) AS total_resources
FROM 
    events e
LEFT JOIN 
    resources r ON e.event_id = r.event_id
GROUP BY 
    e.event_id, e.event_name
ORDER BY 
    e.event_id;
    --low feedback alert--
    SELECT 
    users.user_id,
    users.username,
    feedback.rating,
    feedback.comment,
    events.event_name
FROM 
    feedback
JOIN 
    users ON feedback.user_id = users.user_id
JOIN 
    events ON feedback.event_id = events.event_id
WHERE 
    feedback.rating < 3;
    --Sessions per Upcoming Event--
    SELECT 
    e.event_id,
    e.event_name,
    e.event_date,
    COUNT(s.session_id) AS session_count
FROM 
    events e
LEFT JOIN 
    sessions s ON e.event_id = s.event_id
WHERE 
    e.event_date >= CURDATE()
GROUP BY 
    e.event_id, e.event_name, e.event_date
ORDER BY 
    e.event_date ASC;
    --organiser event summary--
    SELECT 
    o.id AS organizer_id,
    o.name AS organizer_name,
    e.status,
    COUNT(e.id) AS event_count
FROM 
    organizers o
JOIN 
    events e ON o.id = e.organizer_id
GROUP BY 
    o.id, o.name, e.status
ORDER BY 
    o.name, e.status;
    --feedback gap--
    SELECT e.event_id, e.event_name
FROM events e
JOIN registrations r ON e.event_id = r.event_id
LEFT JOIN feedback f ON e.event_id = f.event_id
WHERE f.event_id IS NULL
GROUP BY e.event_id, e.event_name;
--daily new users count--
SELECT 
    DATE(registration_date) AS registration_day,
    COUNT(*) AS new_user_count
FROM 
    users
WHERE 
    registration_date >= CURDATE() - INTERVAL 7 DAY
GROUP BY 
    registration_day
ORDER BY 
    registration_day DESC;
--events with maximum sessions--
SELECT event_id, event_name, session_count
FROM (
    SELECT 
        e.event_id,
        e.event_name,
        COUNT(s.session_id) AS session_count,
        RANK() OVER (ORDER BY COUNT(s.session_id) DESC) AS rnk
    FROM events e
    JOIN sessions s ON e.event_id = s.event_id
    GROUP BY e.event_id, e.event_name
) ranked_events
WHERE rnk = 1;
--average ratings per city--
SELECT city, AVG(feedback_rating) AS average_rating
FROM events
GROUP BY city;
--most registered event--
SELECT 
    event_id,
    event_name,
    COUNT(user_id) AS total_registrations
FROM 
    event_registrations
GROUP BY 
    event_id, event_name
ORDER BY 
    total_registrations DESC
LIMIT 3;
--event session time conflict--
SELECT 
    s1.event_id,
    s1.session_id AS session1_id,
    s2.session_id AS session2_id,
    s1.start_time AS session1_start,
    s1.end_time AS session1_end,
    s2.start_time AS session2_start,
    s2.end_time AS session2_end
FROM 
    sessions s1
JOIN 
    sessions s2
    ON s1.event_id = s2.event_id
    AND s1.session_id < s2.session_id
    AND s1.start_time < s2.end_time
    AND s2.start_time < s1.end_time
ORDER BY 
    s1.event_id, s1.session_id, s2.session_id;
    --unregistered active users--
    SELECT u.user_id, u.username, u.created_at
FROM users u
LEFT JOIN event_registrations er ON u.user_id = er.user_id
WHERE u.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    AND er.user_id IS NULL;
    --multi sssion speaker--
    SELECT speaker_id, COUNT(session_id) AS session_count
FROM sessions
GROUP BY speaker_id
HAVING COUNT(session_id) > 1;
--resource availability check--
SELECT e.event_id, e.event_name
FROM events e
LEFT JOIN resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL;
--completed events with feedback--
SELECT 
    e.event_id,
    e.event_name,
    COUNT(r.registration_id) AS total_registrations,
    AVG(f.rating) AS average_feedback_rating
FROM 
    events e
LEFT JOIN 
    registrations r ON e.event_id = r.event_id
LEFT JOIN 
    feedback f ON e.event_id = f.event_id
WHERE 
    e.status = 'Completed'
GROUP BY 
    e.event_id, e.event_name;
    --user engagement index-
    SELECT 
    u.user_id,
    u.user_name,
    COUNT(DISTINCT e.event_id) AS events_attended,
    COUNT(DISTINCT f.feedback_id) AS feedbacks_submitted
FROM 
    users u
LEFT JOIN 
    event_attendance e ON u.user_id = e.user_id
LEFT JOIN 
    feedbacks f ON u.user_id = f.user_id
GROUP BY 
    u.user_id, u.user_name;
    --top feedback providers--
    SELECT 
    user_id, 
    COUNT(*) AS feedback_count
FROM 
    feedback
GROUP BY 
    user_id
ORDER BY 
    feedback_count DESC
LIMIT 5;
--duplicate registrations--
SELECT 
    user_id, 
    event_id, 
    COUNT(*) AS registration_count
FROM 
    registrations
GROUP BY 
    user_id, 
    event_id
HAVING 
    COUNT(*) > 1;
    --registration trends--
    SELECT 
    DATE_FORMAT(registration_date, '%Y-%m') AS month,
    COUNT(*) AS registration_count
FROM 
    users
WHERE 
    registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY 
    month
ORDER BY 
    month;
    --average session duration--
    SELECT 
    event_id,
    AVG(TIMESTAMPDIFF(MINUTE, session_start, session_end)) AS avg_session_duration_minutes
FROM 
    sessions
GROUP BY 
    event_id;
--events without sessions--
SELECT e.*
FROM events e
LEFT JOIN sessions s ON e.event_id = s.event_id
WHERE s.session_id IS NULL;