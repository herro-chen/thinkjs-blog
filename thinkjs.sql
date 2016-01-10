-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-01-11 01:33:10
-- 服务器版本： 10.0.16-MariaDB
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `thinkjs`
--

-- --------------------------------------------------------

--
-- 表的结构 `think_article`
--

CREATE TABLE IF NOT EXISTS `think_article` (
  `id` int(10) NOT NULL,
  `cateid` tinyint(3) unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `thumbnail` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `creattime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `think_article`
--

INSERT INTO `think_article` (`id`, `cateid`, `title`, `thumbnail`, `content`, `creattime`) VALUES
(1, 1, '相对纶千鸟格翻领长袖呢子大衣', 'http://www.zhuige.com/wp-content/uploads/2015/11/QQ20151115-2.png', '<p style="text-align: left;"><a href="http://www.zhuige.com/manshiji/4948.html" _hover-ignore="1"><img class="aligncenter size-full wp-image-4949" alt="QQ20151115-2" src="http://www.zhuige.com/wp-content/uploads/2015/11/QQ20151115-2.png" width="466" height="558"></a>淘宝店：<a rel="nofollow" href="http://www.zhuige.com/goto/_/4948/2" target="_blank">相对纶原创设计女装</a></p>\r\n<p style="text-align: left;">去购买：<a rel="nofollow" href="http://www.zhuige.com/goto/_/4948/3" target="_blank">相对纶千鸟格翻领长袖呢子大衣</a></p>', '2015-11-10 07:34:24'),
(2, 1, '尺渡秋装日系学院风连帽羊毛开衫', 'http://www.zhuige.com/wp-content/uploads/2014/10/QQ20141012-1.png', '<p style="text-align: left;"><a href="http://www.zhuige.com/manshiji/4487.html" target="_blank" _orighref="http://www.zhuige.com/manshiji/4487.html" _tkworked="true" _hover-ignore="1"><img class="aligncenter size-full wp-image-4488" alt="尺渡秋装日系学院风连帽羊毛开衫" src="http://www.zhuige.com/wp-content/uploads/2014/10/QQ20141012-1.png" width="429" height="476"></a>淘宝店：<a rel="nofollow" href="http://www.zhuige.com/goto/_SCALED/4487/2" target="_blank">尺渡SCALED</a></p><p style="text-align: left;">去购买：<a rel="nofollow" href="http://www.zhuige.com/goto/_/4487/3" target="_blank">尺渡秋装日系学院风连帽羊毛开衫</a></p>', '2016-01-10 11:25:28');

-- --------------------------------------------------------

--
-- 表的结构 `think_category`
--

CREATE TABLE IF NOT EXISTS `think_category` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `parentid` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `think_category`
--

INSERT INTO `think_category` (`id`, `name`, `parentid`) VALUES
(1, 'wind', 1);

-- --------------------------------------------------------

--
-- 表的结构 `think_user`
--

CREATE TABLE IF NOT EXISTS `think_user` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pwd` char(41) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `think_user`
--

INSERT INTO `think_user` (`id`, `name`, `pwd`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `think_article`
--
ALTER TABLE `think_article`
  ADD UNIQUE KEY `id` (`id`), ADD KEY `creattime` (`creattime`);

--
-- Indexes for table `think_category`
--
ALTER TABLE `think_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `think_user`
--
ALTER TABLE `think_user`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `think_article`
--
ALTER TABLE `think_article`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `think_category`
--
ALTER TABLE `think_category`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `think_user`
--
ALTER TABLE `think_user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
