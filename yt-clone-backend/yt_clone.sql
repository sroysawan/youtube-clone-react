CREATE TABLE videos_long(
    video_id INT NOT NULL AUTO_INCREMENT,
    video_title VARCHAR(255) NOT NULL,
    video_description VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    video_thumbnail VARCHAR(255) NOT NULL,
    video_duration INT NOT NULL,
    video_created_at DATETIME NOT NULL,
    video_updated_at DATETIME NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (video_id)
);

CREATE TABLE videos_short(
    video_id INT NOT NULL AUTO_INCREMENT,
    video_title VARCHAR(255) NOT NULL,
    video_description VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    video_thumbnail VARCHAR(255) NOT NULL,
    video_duration INT NOT NULL,
    video_created_at DATETIME NOT NULL,
    video_updated_at DATETIME NOT NULL,
    channel_id INT NOT NULL,
    PRIMARY KEY (video_id)
);

CREATE TABLE channels(
    channel_id INT NOT NULL AUTO_INCREMENT,
    channel_name VARCHAR(255) NOT NULL,
    channel_banner_url VARCHAR(255) NOT NULL,
    channel_username VARCHAR(255) NOT NULL,
    channel_description VARCHAR(255) NOT NULL,
    channel_profile_picture VARCHAR(255) NOT NULL,
    channel_created_at DATETIME NOT NULL,
    channel_updated_at DATETIME NOT NULL,
    PRIMARY KEY (channel_id)
);

CREATE TABLE channel_subscribe(
    channel_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (channel_id,user_id)
);

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_profile_picture VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_created_at DATETIME NOT NULL,
    user_updated_at DATETIME NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    video_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text VARCHAR(255) NOT NULL,
    comment_created_at DATETIME NOT NULL,
    comment_updated_at DATETIME NOT NULL,
    PRIMARY KEY (comment_id)
);

CREATE TABLE popular (
    video_id INT NOT NULL,
    view_count INT NOT NULL,
    like_count INT NOT NULL,
    dislike_count INT NOT NULL,
    comment_count INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (video_id)
);



-- INSERT INTO `users` (
--     `user_name` ,
--     `password` ,
--     `user_email`,
--     `user_profile_picture` ,
--     `first_name`, 
--     `last_name`,
--     `user_created_at` ,
--     `user_updated_at`
-- ) VALUES (
--     "Sroysawan",
--     "626796778",
--     "sroysawan.kcd@gmail.com",
--     "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
--     "Sroysawan",
--     "Kladcheydee",
--     NOW(),
--     NOW()
-- );





