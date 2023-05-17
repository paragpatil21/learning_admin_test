<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $donor = $_POST['donor'];
    $address = $_POST['address'];
    $mail_id = $_POST['mail_id'];
    $center_manager = $_POST['center_manager'];
    $contact_number=$_POST['contact_number'];
    $designation= $_POST['designation'];
    $center_shortadd= $_POST['center_shortadd'];
    $city= $_POST['city'];
    $state= $_POST['state'];
    // $state = $data->state;
    // $user_id = $data->user_id??1;


    if (!empty($donor)) {
        $location_data = array(
            'donor' => $donor,
            'address' => $address,
            'mail_id' => $mail_id,
            'contact_number' => $contact_number,
            'center_manager' => $center_manager,
            'designation' => $designation,
            'city' => $city,
            'state' => $state,
            'center_shortadd'=>$center_shortadd

        );
        $location_id = $db->add('center_list', $location_data);

        if ($location_id > 0) {
            $request->meta = [
                "error" => false,
                "message" => 'Asset Type successfully Added'
            ];
            $request->id = $location_id;
        } else {
            $request = new \stdClass();
            $request->meta = [
                "error" => true,
                "message" => 'Something Error'
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Fields are missing'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'Fields are missing'
    ];
}
echo json_encode($request);
