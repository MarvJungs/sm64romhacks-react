<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

include($_SERVER['DOCUMENT_ROOT'] . '/_includes/functions.php');
include($_SERVER['DOCUMENT_ROOT'] . '/_includes/db.php');

if ($_GET['type'] == 'normal') {
	print(json_encode(getMegapackNormalHacksFromDatabase($pdo)));
} else if ($_GET['type'] == 'kaizo') {
	print(json_encode(getMegapackKaizoHacksFromDatabase($pdo)));
}
else {
	print(json_encode(getMegapackHacksFromDatabase($pdo)));
}
