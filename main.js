img = "";
status1 = "";
objects = [];
aud = "";

function preload(){
    aud = loadSound('music.wav');
}
function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    // objectDetector.detect(video, gotResult);
}
function gotResult(error, results)
{
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw()
{
    image(video, 0, 0, 400, 400);
    
    if(status1 != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                // document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
                aud.stop();
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            } else{
                document.getElementById("status").innerHTML = "Status : Baby not Detected";
                aud.play();
            }
        }
    }
    // fill("#FF0000");
    // text("Dog", 45, 75);
    // noFill();
    // stroke("#FF0000");
    // rect(30, 60, 450, 350);

    // fill("#FF0000");
    // text("Cat", 320, 120);
    // noFill();
    // stroke("#FF0000");
    // rect(300, 90, 270, 320);
}