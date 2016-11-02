Meteor.methods({
    "SimpleChat.newMessage": function (message, roomId, username, avatar, name, custom) {
        this.unblock()
        if (!SimpleChat.options.allow.call(this, message, roomId, username, avatar, name))
            throw new Meteor.Error(403, "Access deny")
        check(message, String);
        check(roomId, String);
        check(username, Match.Maybe(String));
        console.log('avatar',avatar)
        check(avatar, Match.Maybe(String));
        console.log('name',name)
        check(name, Match.Optional(String));
        message=_.escape(message)
        console.log(message, roomId, username, avatar, name)
        if (avatar) check(avatar, Match.Maybe(String));
        check(name, Match.Maybe(String));
        //todo borrar
        if (!this.isSimulation && Meteor.isDevelopment) {
            //Meteor._sleepForMs(800)
        }
        const msg={
            message,
            roomId,
            username,
            name,
            sent: !this.isSimulation,
            receivedBy: [],
            receivedAll: false,
            viewedBy: [],
            viewedAll: false,
            userId: this.userId,
            avatar,
            custom,
            date: new Date()
        }
        msg._id=SimpleChat.Chats.insert(msg)
        SimpleChat.options.onNewMessage(msg)
        return msg
    }
});