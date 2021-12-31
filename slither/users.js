const users =[];
//Join user to chat
function userJoin(id,username,room,points, score){
    const user = {id,username,room,points,score};
    users.push(user);
    return user;
}
function getCurrentUser(id){
    return users.find(user=>user.id===id)
}
function userPlay(){
    users.id+=1;
}
function userLeave(id){
    const index = users.findIndex(user=>user.id===id);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
}
function getRoomUsers(room){
    return users.filter(user=>user.room===room);
}
function getRoomUsers2(room,id){
    return users.filter(user=>{user.room===room});
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getRoomUsers2
}