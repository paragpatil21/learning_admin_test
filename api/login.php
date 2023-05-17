<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('inc/core.php');
$core = new Core();
$db = $core->dbcon;
// $core->check_cors();
$request = new \stdClass();
if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $email = $data->email;
    $unique_id = $data->email;
    $password = $data->password;
    $password = hash("sha256", $password);
    $condition = "(ld.email='$email' OR ld.UniqueID='$unique_id') and ld.password='$password'";

    // Join login_details and center_list tables on email column
    // $condition .= " LEFT JOIN center_list cl ON ld.email = cl.mail_id";

    // Check if the email and password belong to a center admin
    $centerAdmin = $db->get('center_list', 'center_id', "mail_id='$email'");
    if (!empty($centerAdmin)) {
        // Email and password belong to a center admin
        $condition .= " AND ld.user_type='admin' AND cl.center_id='".$centerAdmin['center_id']."'";
    } else {
        // Email and password do not belong to a center admin
        $condition .= " AND (ld.user_type='superadmin' OR ld.user_type='contentwriter')";
    }
    $join_array = array(
        array(
            "type" => 'LEFT JOIN',
            'table' => 'center_list',
            'as' => 'cl',
            "on" => 'ld.email = cl.mail_id'
        ),  
    );

    $response = $db->join('login_details', "ld", "ld.id, ld.email, ld.user_type, cl.center_id", $join_array, $condition);
    // $response = $db->get('login_details ld', " ld.id, ld.email, ld.user_type, cl.center_id", $condition);

    $total = $db->join_count('login_details', "ld", "ld.id", $join_array, $condition);
    if (!empty($response)) {
        $response['password'] = '';
    }
    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'Successfully logged In'
        ];
        $request->data = $response;
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Wrong Username or password'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No credentials posted'
    ];
}
echo json_encode($request);
