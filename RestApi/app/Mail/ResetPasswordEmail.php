<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $tries = 5;

    public $mailData;
    /**
     * Create a new message instance.
     *
     * @return void
     */


    public function __construct($mailData)
    {
        $this->mailData = $mailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $address = 'joehuang123@gmail.com';
        $name = 'Mr. Joe';
        $subject = 'Car Tracking Info';
        // $input = array(
        //     'unqique_code' => $this->mailData['unqique_code']
        // );
        return $this->view('email.reset_password')
                    ->with(['inputs' => $this->mailData])
                    ->from($address, $name)
                    ->subject($subject);
                    // ->from($address, $name)
                    // ->cc($address, $name)
                    // ->bcc($address, $name)
                    // ->replyTo($address, $name)
                    //->subject($subject);
    }
}
