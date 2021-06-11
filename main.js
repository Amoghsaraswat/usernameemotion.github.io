prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 360,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='photo' src='" + data_uri + "'>";
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/nMrHgkchB/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    var synth = window.speechSynthesis;
    s1 = "the first prediction is " + prediction1;
    s2 = "and the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(s1 + s2);
    synth.speak(utterThis);
}

function predict() {
    img = document.getElementById("photo");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077"
        }
        if (results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#129304"
            if (results[0].label == "amazing") {
                document.getElementById("update_emoji").innerHTML = "#128076"
            }
            if (results[1].label == "best") {
                document.getElementById("update_emoji2").innerHTML = "&#128077";
            }
            if (results[1].label == "victory") {
                document.getElementById("update_emoji2").innerHTML = "&#129304";
            }
            if (results[1].label == "amazing") {
                document.getElementById("update_emoji2").innerHTML = "&#128076";
            }
        }
    }
