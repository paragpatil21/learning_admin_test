<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
$condition="isActive='yes'";
$centers = $db->get_all('center_list', '*',$condition);
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->centers = $centers;

echo json_encode($request);
?>