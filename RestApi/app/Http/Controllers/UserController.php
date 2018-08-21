<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Dingo\Api\Routing\Helpers;
use App\Transformer\UserTransformer;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Auth;
use Log;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegisterEmail;
use App\Mail\ResetPasswordEmail;
use App;
use Hash;

class UserController extends Controller
{
    //

    //use Helpers;

    protected $userRepository;
    protected $userTransformer;
    protected $messages = [
        'password'    => 'The :attribute must bedsdsad greater than :min .'
    ];

    public function __construct(UserRepository $userRepository, UserTransformer $userTransformer){
    	$this->userRepository = $userRepository;
    	$this->userTransformer = $userTransformer;

    }

    public function getCurrentUserInfo() {
        if (Auth::check()) {
            return Auth::user();
        }
    }

    public function show() {
    	$users = $this->userRepository->getAll();

    	$response = $users;//$this->reponse->item($users);//$this->reponse->item($user, new UserTransformer());

    	return $response;
    }

    public function passwordReset(Request $request) {
        $validation = $this->validateRequest($request, [
            'email' => 'required|email|max:255'
        ]);
        if ($validation !== true) {
            return $this->sendInvalidFieldResponse($validation);
        }
        $user = $this->userRepository->getUserByEmail($request['email']);
        if (!$user) {
            // Log::Info('This email already registered');
            return $this->sendCustomResponse(404, "The email has not been registered and user not found");
        }

        try {
            $resetPassword = $this->userRepository->insertResetPassword($request);

            $when = Carbon::now()->addSeconds(10);

            $viewData = ['link'=> env('APP_URL').'/resetPassword/'.$resetPassword->token];
            
            Mail::to($request['email'])->later($when, new ResetPasswordEmail($viewData));
            return "The confirmation email will be sent in a minute";
          }
          catch (\Exception $e) {
              return $this->sendCustomResponse(500, $e->getMessage());
        }
    }
    
    public function passwordResetPage($token) {
        return view('email.reset_password_page', ['inputs' => ['token' => $token]]);
    }

    public function confirmResetPassword(Request $request) {
        $passwordResetInfo = $this->userRepository->getPasswordResetByToken($request->token);
        if (!$passwordResetInfo) {
            return 'The link has expired and password reset details not found';
        }
        $result = "FALSE";
        try {
            $user = $this->userRepository->getUserByEmail($passwordResetInfo->email);
            if (!$user) {
                return $this->sendCustomResponse(404, "ERROR");
            }
            $user->password = Hash::make($request->password);
            $user->save();
          }
          catch (\Exception $e) {
              return $this->sendCustomResponse(500, $e->getMessage());
          }
        return $user;
        // return 'confirmResetPassword';
    }



    public function registerUser(Request $request) {
        $validation = $this->validateRequest($request, [
            'first_name' => '',
            'last_name' => '',
            'email' => 'required|email|max:255',
            'password' => 'required|min:4',
            'city' => '',
        ]);
        if ($validation !== true) {
            return $this->sendInvalidFieldResponse($validation);
        }
        $user = $this->userRepository->getUserByEmail($request['email']);
        if ($user) {
            // Log::Info('This email already registered');
            return $this->sendCustomResponse(404, "The email has been registered");
        }

        try {
            $registerUser = $this->userRepository->registerUser($request);

            $when = Carbon::now()->addSeconds(10);

            $viewData = ['link'=> env('APP_URL').'/registerUserViaEmail/'.$registerUser->uid];
            
            Mail::to($request['email'])->later($when, new RegisterEmail($viewData));
            //Mail::to($request['email'])->send(new RegisterEmail($viewData));
            return "The confirmation email will be sent to you in a minute";
          }
          catch (\Exception $e) {
              return $this->sendCustomResponse(500, $e->getMessage());
        }
    }

    public function confirmRegistration($unique_code) {
        $registerUser = $this->userRepository->getRegisterUserByUid($unique_code);
        if (!$registerUser) {
            return 'The link has expired and registration details not found';
        }

        $obj = [
            'uid' =>  $registerUser['uid'],
            'first_name' => $registerUser->first_name,
            'last_name' => $registerUser->last_name,
            'email' => $registerUser->email,
            'password' => $registerUser->password,
            'city' => $registerUser->city,
            'username' => '',
        ];
        $result = "FALSE";
        try {
            
            $user = $this->userRepository->getUserByEmail($obj['email']);
            if ($user) {
                return $this->sendCustomResponse(404, "The email has been registered");
            }
            $result = $this->userRepository->registerUserViaEmail($obj);
          }
          catch (\Exception $e) {
              return $this->sendCustomResponse(500, $e->getMessage());
          }
        return  $result;
    }


}
