status = ""
input_value = ""
objects = []

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) 
        {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("detecting_objects").innerHTML = "Number Of objects detected : " + objects.length;

            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == input_value) {
                video.stop();
                document.getElementById("detecting_objects").innerHTML = "Objects Found : " + objects[i].label;

                objectDetector.detect(gotResult);
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(input_value + "Found");
                synth.speak(utterThis);


            }
            else {
                document.getElementsById("detecting_objects").innerHTML = input_value + "Objects not found"

            }
        }

    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results);
        objects = results;
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_value = document.getElementById("input_id").value;
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

