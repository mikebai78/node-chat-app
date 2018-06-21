class Users {
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }
  getUsersList(room){
    var users = this.users.filter((user) => user.room === room);
    var nameArray = users.map((user) => user.name)
    return nameArray;
  }
  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }
  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
}

module.exports = {Users};
