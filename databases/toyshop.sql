CREATE DATABASE IF NOT EXISTS `toyshop`;

USE `toyshop`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

insert into users ( name, email, password, role) VALUES ('karimnagib1',' kareem.elzeky@gmail.com','123456', 'admin' );


CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `rating` decimal(2,1),
  `stock` int(11) NOT NULL,
  `discountPercentage` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) references `users`(`id`)
);


CREATE TABLE IF NOT EXISTS `carts` (
    `user_id` int(11) NOT NULL,
    `product_id` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `product_id`),
    FOREIGN KEY (`user_id`) references `users`(`id`),
    FOREIGN KEY (`product_id`) references `products`(`id`)
);



INSERT INTO `products` (`title`, `brand`, `description`, `price`, `thumbnail`, `category`, `rating`, `stock`, `discountPercentage`, seller_id) VALUES
('Teddy Bear', 'LotFancy', 'A cute teddy bear', 14.99, 'teddy-bear.png','toys', 3.4,50, 0,1),
('Doll', 'Barbie', 'A sweet doll', 9.48, 'doll.png','toys', 3.4,50, 30,1),
('Toy Car 1', 'Hot Wheels', 'A cute datsun toy car', 57.14, 'toy-car-1.png','toys', 3.4,50, 20,1),
('Toy Car 2', 'Hot Wheels', 'A cute ford toy truck', 39.99, 'toy-car-2.png','toys', 3.4,50, 10,1),
('Toy Car 3', 'Hot Wheels', 'A cute mercedes toy racecar', 54.74, 'toy-car-3.png','toys', 3.4,50, 80,1),
('Lego Classics', 'Lego', 'A cute lego monsters set', 9.97, 'lego-monsters.png','toys', 3.4,50, 10,1),
('Lego Dots', 'Lego', 'A cute lego dots set', 17.94, 'lego-dots.png','toys', 3.4,50, 50,1),
('Sweet Jumperoo', 'Fisher-Price', 'A sweet ride jumperoo', 124.99, 'ride-jumperoo.png','toys', 3.4,50, 30,1),
('Musical Keyboard', 'CoComelon', 'A sweet musical keyboard', 26.99, 'musical-keyboard.png','toys', 3.4,50, 10,1),
('T-Shirt & Shorts Set 1', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-1.png','toys', 3.4,50, 70,1),
('T-Shirt & Shorts Set 2', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-2.png','toys', 3.4,50, 23,1),
('T-Shirt & Shorts Set 3', 'CoComelon', 'A sweet t-shirt & shorts set', 18.99, 'tshirt-shorts-3.png','toys', 3.4,50, 44,1),
('N-Strike Blaster', 'Nerf', 'A powerful blaster gun', 34.99, 'strike-blaster.png','toys', 3.4,50, 22,1),
('Baby Mickey Mouse', 'Disney', 'A sweet baby Mickey plush', 18.88, 'baby-mickey.png','toys', 3.4,50, 12,1),
('Baby Minnie Mouse', 'Disney', 'A sweet baby Minnie plush', 51.23, 'baby-minnie.png','toys', 3.4,50, 12,1),
('3D Toddler Scooter', 'Bluey', 'A fantastic 3-wheel scooter', 29.00, 'toddler-scooter.png','toys', 3.4,50, 21,1),
('Cottage Playhouse', 'Litte Tikes', 'A fancy blue playhouse', 139.99, 'cottage-playhouse.png','toys', 3.4,50, 20,1),
('2-in-1 Motor/Wood Shop', 'Little Tikes', 'A realistic motor/wood shop', 99.00, '2x1-motor-shop.png','toys', 3.4,50, 60,1),
('UNO Collector Tin', 'UNO', 'A premium quality uno set', 49.39, 'uno-phase10-snappy.png','toys', 3.4,50, 20,1),
('Razor MX350 Bike', 'Razor', 'A powerful electric bike', 328.00, 'mx350-bike.png','toys', 3.4,50, 22,1);

UPDATE toyshop.products SET thumbnail = concat('http://localhost:5000/'+'/images/', thumbnail) where id  > 0;