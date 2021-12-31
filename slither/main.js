const useer = document.getElementById('user');
const socket = io();
// const {namee}= Qs.parse(location.search,{
//     ignoreQueryPrefix: true
// })
socket.on("message",message=>{
    (function gamme() {
        var game = new Phaser.Game(1350, 600, Phaser.AUTO, null);
        game.state.add('Game',Game);
        game.state.start('Game');
    })();
    console.log(message);
})
socket.on("messageLeft",message=>{
    console.log(message)
})
socket.on('roomUsers',({userr})=>{
    outputUsers(userr);
})
function outputUsers(user){
    useer.innerHTML=`${user.map(user=>`<li>${user.username}    ----  ${user.score}</li>`).join('')}`;
}