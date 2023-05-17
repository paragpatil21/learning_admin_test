

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require "../vendor/autoload.php";
$mail = new PHPMailer(true);
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
    // var_dump($data);
    
    $email = $data->email; 
    $password = 'learn@nirmaan'; 
    $role = $data->role;
    $uniqueid = $data->uniqueid;
    $course=$data->course;
    // $state = $data->state;
    // $user_id = $data->user_id??1;


    if (!empty($role)) {
        $location_data = array(            
            'email' => $email,
            'password' => hash('sha256', $password),
            'user_type' => $role,
            'UniqueID' => $uniqueid,
            'course'=>$course,
        );
        $location_id = $db->add('login_details', $location_data);

        if ($location_id > 0) {
        //sending  email,password,regID, through Email
        try {
            $mail->SMTPDebug = 0;									
            $mail->isSMTP();											
            $mail->Host	 = 'smtp.gmail.com';					
            $mail->SMTPAuth = true;							
            $mail->Username = 'shiksha@nirmaan.org';				
            $mail->Password = 'tlwejdwhammfjbvt';						
            $mail->SMTPSecure = 'tls';							
            $mail->Port	 = 587;
    
            $mail->setFrom('shiksha@nirmaan.org', 'Nirmaan Learning Portal');		
            $mail->addAddress($email);
            //$mail->addAddress('srilatha.kaveti@nirmaan.org', 'Srilatha');
    
            $mail->isHTML(true);								
            $mail->Subject = ''.$email.'';
            $mail->Body = 'Dear Learner, <br /> Congratulations!!!<br />Your application has been accepted for "Women In Technology" - Free Online Traning and Placements Program for course '.$course.' You can access our learning portal using the following details. <br /> URL: <a href="https://shiksha.nirmaan.org">https://shiksha.nirmaan.org</a> <br /> Username:'.$uniqueid.'<br /> Password:'.$password.'<br />If you are facing any issues please contact us at shiksha@nirmaan.org or +91-6281450591, +91-8247717684.<br /><br />Best Wishes<br />Nirmaan Skills Training Center,<br /> Nirmaan Organization,<br /> Hyderabad.';
            $mail->AltBody = 'Dear Learner, Congratulations!!!Your application has been accepted for "Women In Technology" - Free Online Traning and Placements Program. You can access our learning portal using the following details.  URL: https://shiksha.nirmaan.org Username:'.$uniqueid.' Password:'.$password.'If you are facing any issues please contact us at shiksha@nirmaan.org or+91-6281450591,+91-8247717684.Best Wishes, Nirmaan Skills Training Center, Nirmaan Organization, Hyderabad.';
            $mail->send();
            } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
            $request->meta = [
                "error" => false,
                "message" => 'Message saved successfully .'
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
?>