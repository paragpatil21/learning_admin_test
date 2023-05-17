<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
$request = new \stdClass();
if(isset($_POST)){
    $json = file_get_contents('php://input');
    $data = json_decode($json);
$center = $db->get('center_list', '*','center_id='.$data->center_code);
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->centert = $center;

echo json_encode($request);
}
?>