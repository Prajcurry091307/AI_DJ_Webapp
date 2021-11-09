//V 1.5
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist =0;

var song="";

function preload()
{
song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet is initiallized");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist =" +scoreRightWrist +"scoreLeftWrist = "+ scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX +" rightWristY = "+ rightWristY);

    }
}
function draw()
{
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
 
    circle(rightWristX, rightWristY,20);
if(scoreRightWrist>0.2)
{
    if(rightWristY>0 && rightWristY<=100)
    {
        document.getElementsById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

    if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementsById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }

    if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementsById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementsById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }

    if(rightWristY>400 && rightWristY<=500)
    {
        document.getElementsById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}


    if (scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    console.log(volume);
    console.log(scoreLeftWrist);
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);

    }
}

function play()
{
   // song.play();
    song.setVolume(1);
    song.rate(1);
}