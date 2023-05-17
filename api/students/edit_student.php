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
    //  $json = file_get_contents('php://input');
    //  $data = json_decode($json);
    //  echo $data;
    // echo "entering";
//  var_dump( $_POST);
      $edit_user_id = $_POST['ID'];

    //  echo $edit_user_id;
    //  exit;

    // $first_name = $data->first_name ?? "";
    // $gender = $data->gender ?? "";
    // $email = $data->email ?? "";
    // $mobile = $data->mobile ?? '';


    // // $country = $data->country ?? '';
    // $state = $data->state ?? '';
    // $district = $data->district ?? '';



    // // $city = $data->city??'';
    // // $area= $data->area??'';
    // $address = $data->address ?? '';



    // // $school = $data->school??'';
    // // $class1 = $data->class1??'';
    // $status = $data->status ?? '';
    // $last_name = $data->last_name ?? '';
    // $middle_name = $data->middle_name ?? '';
    // $dob = $data->dob ?? '';
    // $gfirst_name = $data->gfirst_name ?? '';
    // $glast_name = $data->glast_name ?? '';
    // $gmobile = $data->gmobile ?? '';
    // $family_members = $data->family_members ?? '';
    // $annual_income = $data->annual_income ?? '';
    // $prof_cwo = $data->prof_cwo ?? '';
    // $highed_family = $data->highed_family ?? '';
    // $highedqual_family = $data->highedqual_family ?? '';
    // $pwd = $data->pwd ?? '';
    // $disability = $data->disability ?? '';
    // $occupation = $data->occupation ?? '';
    // $pincode = $data->pincode ?? '';
    // $edqual = $data->edqual ?? '';
    // $edstatus = $data->edstatus ?? '';
    // $yofpass = $data->yofpass ?? '';
    // $bpl = $data->bpl ?? '';
    // $grelation = $data->grelation ?? '';
    // $course = $data->course ?? '';
    // $aadhar_number = $dara->aadhar_number ?? '';
    // $mode = $data->mode ?? '';
    // $otherID =$data->otherID ?? '';
    // $source = $data->source ?? '';
    // $tech_level =$data->tech_level ?? '';


     //aadhaar card
    //  $aadhaar_file = '';
    // echo $_POST['aadhaar_file'];
    if(isset($_FILES['aadhaar_file']) && $_FILES['aadhaar_file']['size'] != 0){
     $aadhaar = $_FILES['aadhaar_file'];
    //  echo $aadhaar;
    //  exit;
     $aadhaar_upload = $core->upload_file($aadhaar, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
     if ($aadhaar_upload['status'] == 'success') {
         $aadhaar_file = $aadhaar_upload['path'];
     } else {
         $request->meta = [
             "error" => true,
             "message" => 'Error in uploading aadhaar card. Please check the type of file you have selected and try again.'
         ];
         echo json_encode($request);
         exit;
     }
    }
//  $photo_file='';
    if(isset($_FILES['photo_file']) && $_FILES['photo_file']['size']!=0){
     $photo_name = $_FILES['photo_file'];
     $photo_upload = $core->upload_file($photo_name, '../uploads/', array('png', 'jpg', 'jpeg'));
     if ($photo_upload['status'] == 'success') {
         $photo_file = $photo_upload['path'];
     } else {
         $request->meta = [
             "error" => true,
             "message" => 'Error in uploading photo. Please check the type of file you have selected and try again.'
         ];
         echo json_encode($request);
         exit;
     }
    }
 
     //pwd file
    //   $pwd_file='';
     if(isset($_FILES['pwd_file']) && $_FILES['pwd_file']['size'] != 0 )
     {
         $pwd = $_FILES['pwd_file'];
         $pwd_upload = $core->upload_file($pwd, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($pwd_upload['status'] == 'success') {
             $pwd_file = $pwd_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading disability certificate. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }
     }
 
     //income card
    //   $income_file='';
     if(isset($_FILES['income_file']) && $_FILES['income_file']['size'] != 0 )
     {
         $income = $_FILES['income_file'];
         $income_upload = $core->upload_file($income, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($income_upload['status'] == 'success') {
             $income_file = $income_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading income certificate. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }
     }
         
     //resume file
    //   $resume_file='';
     if(isset($_FILES['resume_file']) && $_FILES['resume_file']['size'] != 0 )
     {
         $resume = $_FILES['resume_file'];
         $resume_upload = $core->upload_file($resume, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($resume_upload['status'] == 'success') {
             $resume_file = $resume_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading resume. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }
     }
 
     //ssc certificate
    //   $ssc_file='';
     if(isset($_FILES['ssc_file']) && $_FILES['ssc_file']['size'] != 0 )
     {
         $ssc = $_FILES['ssc_file'];
         $ssc_upload = $core->upload_file($ssc, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($ssc_upload['status'] == 'success') {
             $ssc_file = $ssc_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading SSC marks memo. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }
     }  
     
     //exp file
    //   $exp_file='';
     if(isset($_FILES['exp_file']) && $_FILES['exp_file']['size'] != 0 )
     {
         $exp = $_FILES['exp_file'];
         $exp_upload = $core->upload_file($exp, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($exp_upload['status'] == 'success') {
             $exp_file = $exp_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading experience certificate. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }   
     }
 
     //othe ID
    //   $otherID_file = '';
     if(isset($_FILES['otherID_file']) && $_FILES['otherID_file']['size'] != 0)
     {
           
             $otherID = $_FILES['otherID_file'];
             $otherID_upload = $core->upload_file($otherID, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
             if ($otherID_upload['status'] == 'success') {
                 $otherID_file = $otherID_upload['path'];
             } else {
                 $request->meta = [
                     "error" => true,
                     "message" => 'Error in uploading other ID proof. Please check the type of file you have selected and try again.'
                 ];
                 echo json_encode($request);
                 exit;
             }
         
     }
 
     //Education Proof
    //   $edproof_file = '';
     if(isset($_FILES['edproof_file']) && $_FILES['edproof_file']['size'] != 0 )
     {
         $edproof = $_FILES['edproof_file'];
         $edproof_upload = $core->upload_file($edproof, '../uploads/', array('png', 'jpg', 'jpeg','pdf'));
         if ($edproof_upload['status'] == 'success') {
             $edproof_file = $edproof_upload['path'];
         } else {
             $request->meta = [
                 "error" => true,
                 "message" => 'Error in uploading education certificate. Please check the type of file you have selected and try again.'
             ];
             echo json_encode($request);
             exit;
         }
     }
 
 
 
 
 


    $user_data = array(
        'first_name' => $_POST['first_name'],
        'last_name' => $_POST['last_name'],
        'middle_name' => $_POST['middle_name'],
        'gender' => $_POST['gender'],
        'dob' => $_POST['dob'],
        'caste_category' => $_POST['caste_category'],
        'religion' => $_POST['religion'],
        'marital_status' => $_POST['marital_status'],
        'occupation' => $_POST['occupation'],
        'bpl' => $_POST['bpl'],
        'pwd' => $_POST['pwd'],
        'disability' => isset($_POST['disability'])?$_POST['disability']:"",
        'languages' => $_POST['languages'],
        // 'photo_file' => $photo,
        //  'password' => hash('sha256', $password),
        // 'password' => hash('sha256',$_POST['password']),

        // 'aadhaar_number' => $_POST['aadhaar_number'],
        // 'otherID' => isset($_POST['otherID'])?$_POST['otherID']:"",
        // 'otherID_number' => isset($_POST['otherID'])?$_POST['otherID_number']:"",
         'otherID' => $_POST['otherID'],
         'otherID_number' => $_POST['otherID_number'],
        
        'mobile' => $_POST['mobile'],
        'emailID' => $_POST['emailID'],
        'address' => $_POST['address'],
        'state' => $_POST['state'],
        'district' => $_POST['district'],
        'pincode' => $_POST['pincode'],
        'edqual' => $_POST['edqual'],
        'edstatus' => $_POST['edstatus'],
        'yofpass' => $_POST['yofpass'],
        
        'gfirst_name' => $_POST['gfirst_name'],
        'glast_name' => $_POST['glast_name'],
        'grelation' => $_POST['grelation'],
        'gmobile' => $_POST['gmobile'],
        'family_members' => $_POST['family_members'],
        'annual_income' => $_POST['annual_income'],
        'prof_cwo' => $_POST['prof_cwo'],
        'highed_family' => $_POST['highed_family'],
        'highedqual_family' => $_POST['highedqual_family'],
        'source' => $_POST['source'],
        'tech_level' => $_POST['tech_level'],
        'course' => $_POST['course'],
        'mode' => $_POST['mode'],
        'enroll_date'=> date('Y-m-d'),
        // 'pwd_file' => $pwd_file,
        // 'income_file' => $income_file,
        // 'resume_file' => $resume_file,
        // 'ssc_file' => $ssc_file,
        // 'exp_file' => $exp_file,
        // 'photo_file'=> $photo_file,
        // 'otherID_file' => $otherID_file,
        'status'=>$_POST['status'],
        'gradtype'=>$_POST['gradtype'],
        'specialization'=>$_POST['specialization'],
        'pgradtype'=>$_POST['pgradtype'],
        'mark_percentage'=>$_POST['mark_percentage'],
        'center_id'=>$_POST['center_id'],



    );

    // echo $user_data;

    if(!empty($aadhaar_file)){
        $user_data['aadhaar_file'] = $aadhaar_file;
    }
    if(!empty($pwd_file)){
        $user_data['pwd_file'] = $pwd_file;
    }
    if(!empty($ssc_file)){
        $user_data['ssc_file'] = $ssc_file;
    }
    if(!empty($income_file)){
        $user_data['income_file'] = $income_file;
    }
    if(!empty($resume_file)){
        $user_data['resume_file'] = $resume_file;
    }
    if(!empty($exp_file)){
        $user_data['exp_file'] = $exp_file;
    }
    if(!empty($photo_file)){
        $user_data['photo_file'] = $photo_file;
    }
    if(!empty($otherID_file)){
        $user_data['otherID_file'] = $otherID_file;
    }
    if(!empty($edproof_file)){
        $user_data['edproof_file']= $edproof_file;
    }

    




    

   

    


    $user_update = $db->update('registrations', $user_data, "ID=$edit_user_id");





    if ($user_update === TRUE) {
        $request->meta = [
            "error" => false,
            "message" => 'User successfully updated'
        ];
        $request->id = $edit_user_id;
    } else {
        $request = new \stdClass();
        $request->meta = [
            "error" => true,
            "message" => 'Something Error'
        ];
    }
}

echo json_encode($request);
