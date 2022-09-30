song=""
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
scoreRightWrist=0
scoreLeftWrist=0

function preload() 
{
    song = loadSound("Baguntundhi.mp3")
}
function setup() {
    canvas=createCanvas(550,435)
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)
}
function modelLoaded(){
    console.log("poseNet Is Initialized")
}
function draw()
{
image(video,0,0,550,435)
fill("#FF0000")
stroke("#FF0000")


if (scoreRightWrist > 0.2) {
circle(rightWristX,rightWristY,20)
if (rightWrist > 0&& rightWrist <=100) {
    document.getElementById("speed").innerHTML = "Speed = 0.5x"
    song.rate(0.5)
}
else if (rightWrist >100 && rightWrist <=200) {
    document.getElementById("speed").innerHTML = "Speed = 1x"
    song.rate(1)
}
else if (rightWrist >200 && rightWrist <=300) {
    document.getElementById("speed").innerHTML = "Speed = 1.5x"
    song.rate(1.5)
}
else if (rightWrist >300 && rightWrist <=400) {
    document.getElementById("speed").innerHTML = "Speed = 2x"
    song.rate(2)
}
else if (rightWrist >400 && rightWrist <=500) {
    document.getElementById("speed").innerHTML = "Speed = 2x"
    song.rate(2.5)
}
}

if(scoreLeftWrist > 0.2)
{                                        
circle(leftWristX,leftWristY,20)
InNumberleftWristY = Number(leftWristY)
remove_decimals = floor(InNumberleftWristY)
volume = remove_decimals/500
document.getElementById("volume").innerHTML="volume="+ volume
song.setVolume(volume)
}
}
function play()
{
song.play()
document.getElementById("play").style.display="none"
document.getElementById("stop").style.display="inline-block"
song.setVolume(1)
song.rate(1)
}
function stop()
{
    document.getElementById("stop").style.display="none"
document.getElementById("play").style.display="inline-block"
song.stop()
}
function gotPoses(results) 
{
    if (results.length > 0)
     {
        console.log(results)
        scoreRighttWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist)

        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("leftWristX= "+leftWristX+"leftWristY="+leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX= "+rightWristX+"rightWristY="+rightWristY)
    }
}
