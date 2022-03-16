const videogrid = document.getElementById('video-grid')
const myvideo = document.createElement("video");
myvideo.muted = false;

console.log(videogrid)

let myvideostream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then((stream) => {
    myvideostream = stream;
    addvideostream(myvideo,stream)
})

const addvideostream = (video,stream) => {
    video.srcObject = stream;
    video.addEventListener('loadmetadata',() => {
        video.play();
    })
    videogrid.append(video)
}


