const socket = io();
const videogrid = document.getElementById('video-grid')
const myvideo = document.createElement("video");
// myvideo.muted = true;
myvideo.autoplay = true;

// console.log(videogrid)
var peer = new Peer(undefined, {
    path:'/peerjs',
    host:'/',
    port:'3000',
});



let myvideostream;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then((stream) => {
    myvideostream = stream;
    addvideostream(myvideo,stream)
    peer.on('call',call => {
        call.answer(stream)
        const video = document.createElement('video')
        // video.muted = true;
        // video.autoplay = true;
        call.on('stream',userVideoStream => {
            addvideostream(video,userVideoStream);
        })
    })
    socket.on('user-connected',(userId)=>{
        setTimeout(()=>{
            connectToNewUser(userId, stream);
        },1000)
    })
})

peer.on('open',id => {
    socket.emit('join-room',ROOM_ID,id);
})


const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId,stream)
    const video = document.createElement('video')
    // video.muted = true;
    video.autoplay = true;
    call.on('stream',userVideoStream => {
        addvideostream(video,userVideoStream);
    })

}

const addvideostream = (video,stream) => {
    video.srcObject = stream;
    video.addEventListener('loadmetadata',() => {
        video.play();
    })
    videogrid.append(video)
}

let text = $('input')
console.log(text.val())

$('input').keydown((e) =>{
    if (e.which == 13 && text.val().length !== 0) {
        socket.emit('message',text.val())
        // console.log(text.val())
        text.val('')
    }
})

socket.on('createMessage',message=>{
    // console.log('this is coming from server',message)
    let date = new Date()
    let hour = date.getHours()
    let mins = date.getMinutes()
    $('.messages').append(`<span class="message"><b style="font-weight:bold;">User: ${(hour > 12)?hour-12:hour}:${mins} ${(hour >= 12)?"PM":"AM"} </b> <br/>${message}</span>`)
})


const muteUnmute = () =>{
    const enabled = myvideostream.getAudioTracks()[0].enabled;
    if (enabled) {
        myvideostream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else{
        setMuteButton();
        myvideostream.getAudioTracks()[0].enabled = true;
    }
}

const setUnmuteButton = () =>{
    const myhtml = `
        <i class="unmute fa-solid fa-microphone-slash"></i>
        <span>UnMute</span>
    `

    $('.main__mute__button').html(myhtml)    
}

const setMuteButton = () =>{
    const myhtml = `
        <i class="fa fa-microphone"></i>
        <span>Mute</span>
    `

    $('.main__mute__button').html(myhtml)
}

const playStop = () =>{
    const enabled = myvideostream.getVideoTracks()[0].enabled;
    if (enabled) {
        myvideostream.getVideoTracks()[0].enabled = false;
        setPlayVideo();
    } else{
        setStopVideo();
        myvideostream.getVideoTracks()[0].enabled = true;
    }
}

const setPlayVideo = () =>{
    const myhtml = `
        <i class="unvideo fa-solid fa-video-slash"></i>
        <span>UnVideo</span>
    `

    $('.main__video__button').html(myhtml)    
}

const setStopVideo = () =>{
    const myhtml = `
    <i class="fa fa-video-camera"></i>
    <span>Video</span>
    `

    $('.main__video__button').html(myhtml)
}



