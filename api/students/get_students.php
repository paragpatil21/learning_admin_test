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

    $from = $data->from ?? '';
    $to = $data->to ?? '';
    $limit = $data->limit ?? '';
    $keyword = $data->keyword ?? '';
    $status = $data->status ?? '';
    $course = $data->course ?? '';
    $center_id =$data->center ?? '';

    // $user_id = $data->user_id;
    //$condition = "isActive='Yes'";
    $condition = 'true';
    $pagination = "$from";
    $condition .= $keyword ? " AND (first_name LIKE '%" . $keyword . "%' OR last_name LIKE '%" . $keyword . "%' OR middle_name LIKE '%" . $keyword . "%' OR  emailID LIKE '%" . $keyword . "%' OR  mobile LIKE '%" . $keyword . "%')" : "";
    $condition .= $status ? " AND (status='$status')" : "";
    $condition .= $course ? " AND (course='$course')" : "";
    $condition .=$center_id ? " AND (center_id='$center_id')" : "";

    // $join_array = array(
    //     array(
    //         "type" => 'LEFT JOIN',
    //         'table' => 'exam_marks',
    //         'as' => 'e',
    //         "on" => 'e.regID=r.regID'
    //     ),      
    // );

    // $response = $db->join_all('registrations', 'r', "r.*,e.subject_total", $join_array, $condition,"",$limit,"",$pagination);
    // $total = $db->join_count('registrations', 'r', "r.ID", $join_array, $condition,);
    // $response = $db->join_all('registrations', 'r', "r.*,e.subject_total", $join_array, $condition,"",$limit,"",$pagination);
    //  $total = $db->join_count('registrations', 'r', "r.ID", $join_array, $condition,);
 
    $response = $db->get_all('registrations', "*",$condition,"", $limit,"",$pagination);
    $total = $db->count('registrations', "ID",$condition);

    if ($total > 0) {
        $request->meta = [
            "error" => false,
            "message" => 'successfull'
        ];
        $request->data = $response;
        $request->total = $total;
        
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'No Data Available'
        ];
    }
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No Data Posted'
    ];
}
echo json_encode($request);

  