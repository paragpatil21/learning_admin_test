<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "../vendor/autoload.php";
$mail = new PHPMailer(true);

if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $regID = $data->regID;
    $status = $data->student_status;
    $user_data = array(
        'status' => $status,
    );    
    $user_update = $db->update('registrations', $user_data,"regID='".$regID."'");

    if ($user_update===TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'Status successfully updated'
        ];
        //$request->id = $edit_user_id;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Something Went Wrong! Please Try Again!'
        ];
    }  
}
echo json_encode($request);
?>