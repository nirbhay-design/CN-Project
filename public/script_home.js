const return_meet_link = () => {
    let meet_id = $('#meet_id')
    let peer_name = $('#peer_name')

    console.log(meet_id.val())
    if (meet_id.val().length === 0) {
        alert('meet_id cannot be empty');
    } else if (peer_name.val().length === 0) {
        alert('peer_name cannot be empty');
    } else {
        window.location.href = `/${meet_id.val()}`
    }
}