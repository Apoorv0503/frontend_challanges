// used IIFE to protect the timer variables from un-intentional updation

(function(){

    //input elements for Hour, minute, seconds
    var hour=document.querySelector(".hour");
    var minute=document.querySelector(".minute");
    var second=document.querySelector(".second");

    //get the buttons
    var startBtn=document.querySelector(".start");
    var pauseBtn=document.querySelector(".pause");
    var resetBtn=document.querySelector(".reset");

    //interval variable
    var countdownTimer=null;

    //alarm on completion
    var alarmSound = new Audio('./assests/alarm.wav');

//-------------start the countDown timer, when "START" button pressed manually-----------
    startBtn.addEventListener("click",function(){
        
        //if no value set for hour/minute/sec, then return
        if(hour.value==0 && minute.value==0 && second.value==0)return;

        function startInterval(){
        
        //hide the start button and show the pause button
        startBtn.style.display='none';
        pauseBtn.style.display='block';

        countdownTimer=setInterval(function(){
        //function with start/update the timer logic
            timer();
        },1000);
        }

        startInterval();
        
    });


//timer start/update logic
    function timer(){
//formate the time logic-----------------------

//since we are getting the value of input in the string formate, hence parse that in number


console.log("timer called");
        //keep sec in range, and increase minute by 1
        if(second.value>60){
            minute.value++;
            console.log("minute value updated: ",minute.value);
            second.value=parseInt(second.value)-60; 

            
            console.log("second value updated: ",second.value);
            //we cam do (sec.value)%60 also, but since we restricted the user to enter 2 digits only, hence the value of sec will never execeed 
            //beyond 1 min eg: max value for sec is 99 that a user can enter
        }

           //keep min in range, and increase hour by 1
        if(minute.value>60){
            hour.value++;
            minute.value=parseInt( minute.value)-60;
        }

        // minute.value = minute.value > 60 ? 60 : minute.value;

// update the timer logic---------------------------

        //if given time is already consumed, then reset everything
        if(second.value==0 && minute.value==0 && hour.value==0){
            second.value="";
            minute.value="";
            hour.value="";
            stopInterval();

            //play an alarm on completion
            playSound();
        }

        //actual timer update logic

        //if seconds are yet to be proceed
        else if(second.value!=0){
            console.log("seconds updated: ", second.value);
            //added extra '0' before sec, if second is of 1 digit only, finally decrease the value  by 1 to update the timer
            second.value=`${second.value<=10?'0':''}${second.value-1}`;
        }

        //seoconds already processed, now do minutes

        else if(minute.value!=0 && second.value==0){
            second.value=59;
            minute.value=`${minute.value<=10?'0':''}${minute.value-1}`;
        }

        //minutes done, now do hours
        else if(hour.value!=0 && minute.value==0){
            minute.value=60;
            hour.value=`${hour.value<10?0:''}${hour.value-1}`;
        }

        return;

    }

// Stop Interval Logic, depends if we need to pause or reset the timer
function stopInterval(state){

    //if we press pause button, then the text of start will be changed to 'continue'
    startBtn.innerHTML = state=='pause'?'continue':'start';

     //hide the start button and show the pause button
     startBtn.style.display='block';
     pauseBtn.style.display='none';

    clearInterval(countdownTimer);
}

//play alarm on completion
function playSound(){
    alarmSound.play();
}

//-------------------pause the Timer when "PAUSE" Button pressed manually------------------------

pauseBtn.addEventListener("click",function(){
    stopInterval('pause');
});


//-------------------Reset the timer when "RESET" button pressed manually-----------------------

resetBtn.addEventListener("click",function(){
    hour.value = "";
    minute.value = "";
    second.value = "";

    stopInterval();
});
})();