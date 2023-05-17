<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();

$states = $db->get_all('state_list', '*');
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->states = $states;

echo json_encode($request);
?>