<?php

define("ADMIN_NEWS", array("260945217664974860", "120084264489451520", "107568694359531520", "264457080889409536", "210326854282772480"));
//                          AndrewSM64              FrostyZako              MarvJungs               Mushie64               Tomatobird8
define("ADMIN_SITE", array("260945217664974860", "120084264489451520", "107568694359531520", "264457080889409536", "210326854282772480"));

$jsonString = file_get_contents("$_SERVER[DOCUMENT_ROOT]/.credentials.json");
$data = json_decode($jsonString);

define("DB_HOST", $data->DB_HOST);
define("DB_USER", $data->DB_USER);
define("DB_PASS", $data->DB_PASS);
define("DB_NAME", $data->DB_NAME);

define("TWITCH_CLIENT_ID", $data->TWITCH_CLIENT_ID);
define("TWITCH_CLIENT_SECRET", $data->TWITCH_CLIENT_SECRET);

define("DISCORD_CLIENT_ID", $data->DISCORD_CLIENT_ID);
define("DISCORD_CLIENT_SECRET", $data->DISCORD_CLIENT_SECRET);
define("DISCORD_REDIRECT_URI", $data->DISCORD_REDIRECT_URI);
define("DISCORD_REDIRECT_URL", $data->DISCORD_REDIRECT_URL);

error_reporting(E_ERROR);

?>
