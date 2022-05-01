// import attendance from "./attendance"

// var userlist = {}
// const ejs = require('ejs')

const return_date = () => {
    let date = new Date()
    return `${date.getDate()}/${date.getMonth()}:${date.getHours()}/${date.getMinutes()}`
}

const return_meet_link = () => {
    let meet_id = $('#meet_id')
    let peer_name = $('#peer_name')

    // // attendance[peer_name] = {}
    // userlist[peer_name.val()] = return_date()
    // alert(json.stringify(userlist))

    console.log(meet_id.val())
    if (meet_id.val().length === 0) {
        alert('meet_id cannot be empty');
    } else if (peer_name.val().length === 0) {
        alert('peer_name cannot be empty');
    } else {
        window.location.href = `/${meet_id.val()}`
        // ejs.renderFile('../views/room.ejs',{})
    }
}

const join_host=(meet_id)=>{
    let host_name = $('#host_peer_name')
    // console.log(meet_id)
    // console.log(host_name.val())

    if (host_name.val().length === 0) {
        alert('first enter the host name before stating a new meeting');
    } else {
        // userlist[host_name.val()] = return_date()
        window.location.href = `${meet_id}`
    }
}