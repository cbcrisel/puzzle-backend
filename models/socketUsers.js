class socketUsers {
    constructor(){
        this.users=[]
    }
    getUsersArray(){
        return Object.values(this.users);
    }
    addUser(user){
        /* const found=this.users.find(element===user)
        if() */
        this.users.push(user)
    }
    deleteUser(id){
        const index = this.users.indexOf(id);
        if (index > -1) {
        this.users.splice(index, 1); 
        }
    }
}
module.exports=
    socketUsers
