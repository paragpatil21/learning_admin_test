<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
require('../inc/core.php');
$core = new Core();
$db = $core->dbcon;
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
    $center_id = $data->center ?? '';

    $condition = 'true';
    $pagination = "$from";
    $condition .= $keyword ? " AND (first_name LIKE '%" . $keyword . "%' OR last_name LIKE '%" . $keyword . "%' OR middle_name LIKE '%" . $keyword . "%' OR  emailID LIKE '%" . $keyword . "%' OR  mobile LIKE '%" . $keyword . "%')" : "";
    $condition .= $status ? " AND (status='$status')" : "";
    $condition .= $course ? " AND (course='$course')" : "";
    $condition .= $center_id ? " AND (center_id='$center_id')" : "";

    $response = $db->get_all('registrations', "*", $condition, "", $limit, "", $pagination);
    $total = $db->count('registrations', "ID", $condition);

    if ($total > 0) {
        // Create the CSV file
        $file = fopen('student_data.csv', 'w');

        // Write the headers
        $headers = array('ID','Registration ID', 'First Name','Middle Name', 'Last Name', 'Email', 'Mobile', 'Status', 'Course','Date of Birth','Caste Category','Religion','Maritial Status','Occupation','PWD Status','Disability','Languages Known','Aadhaar Number','OtherID Type','OtherID Number','Address','State','District','Pincode','Educational Qualification','Status Of Education','Year Of Passing','Specialization','Marks','Post Graduation Type','Graduation Type','Gaurdian First Name','Guardian Last Name','Guardian Relation','Guardian Mobile Number','No Of Family Members','Annual Income','Profession Of Cheif Wage Owner','Information Source','Tech Level','Mode Of Training','Enroll Date', 'Center ID');
        fputcsv($file, $headers);

        // Write the data
        foreach ($response as $row) {
            $data = array(
                $row['ID'],
                $row['regID'],
                $row['first_name'],
                $row['middle_name'],
                $row['last_name'],
                 $row['emailID'],
                 $row['mobile'],
                  $row['status'],
                  $row['course'],


                $row['dob'],
                $row['caste_category'],
                $row['religion'],
                $row['marital_status'],
                $row['occupation'],
                $row['pwd'],
                $row['disability'],
                $row['languages'],
                $row['aadhaar_number'],
                $row['otherID'],
                $row['otherID_number'],
                
               


         $row['address'],
                $row['state'],
                $row['district'],
                $row['pincode'],
                $row['edqual'],
                $row['edstatus'],
                $row['yofpass'],
                $row['specialization'],
                $row['mark_percentage'],
                $row['pgradtype'],
                $row['gradtype'],
                $row['gfirst_name'],
                $row['glast_name'],
                $row['grelation'],
                $row['gmobile'],
                $row['family_members'],
                $row['annual_income'],
                $row['prof_cwo'],
                $row['source'],
                $row['tech_level'],
                
                $row['mode'],
                $row['enroll_date'],
              
               
               
                $row['center_id'],

                 

              
               
                
                
                
                
            );
            fputcsv($file, $data);
        }

        // Close the file
        fclose($file);

        // Set the headers to download the CSV file
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="student_data.csv"');
        readfile('student_data.csv');
        exit;
    } else {
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
