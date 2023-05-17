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
    //$conditionmale = "gender='Male'";
    //$conditionfemale = "gender='Female'";
    //$conditionlgbtq = "gender='LGBTQ+'";
    $condition_join = "status='accepted'";
    $conditioncenter="SELECT c.center_id, c.center_shortadd, COUNT(r.regID) as student_count 
    FROM center_list c 
    LEFT JOIN registrations r 
    ON c.center_id = r.center_id 
    GROUP BY c.center_id";


// instead you can use the following
// $join_array = array(
//     array(
//         "type" => 'LEFT JOIN',
//         'table' => 'center_list',
//         'as' => 'c',
//         "on" => 'c.center_id = r.center_id'
//     ),
    
    
  
// );
// // $centers=$db->join_all('registrations','r','c.center_id, c.center_shortadd',$join_array,$condition_join);
// // echo $centers;
// $centers = $db->join_all_count('registrations', 'r', 'c.center_id, c.center_shortadd', $join_array, $condition_join, '', '', 'c.center_id');
  
 
    $total_regstudents = $db->count('registrations','ID');
    $total_joinstudents = $db->count('registrations', "ID", $condition_join);
    //$total_female = $db->count('registrations', "ID", $conditionfemale);
    //$total_lgbtq = $db->count('registrations', "ID", $conditionlgbtq);
    $centers=$db->calculate_centers($conditioncenter);
    $request->centers=$centers;

    $request->meta = [
        "error" => false,
        "message" => 'successfull'
    ];
    $request->total_regstudents = $total_regstudents;
    $request->total_joinstudents = $total_joinstudents;
    //$request->total_female = $total_female;
    //$request->total_lgbtq = $total_lgbtq;
} else {
    $request->meta = [
        "error" => true,
        "message" => 'No Data Available'
    ];
}
echo json_encode($request);
?>