const stateModule = (()=>{
    let state = {
        users: [
            {
                "name": "Mark Webber",
                "avatar": "./assets/images/avatar-mark-webber.webp",
                "action": "reacted to your recent post",
                "link": "My first tournament today!",
                "lastSeen": "1m ago",
                "message": null,
                "isRead": true
            },
            {
                "name": "Angela Gray",
                "avatar": "./assets/images/avatar-angela-gray.webp",
                "action": "followed you",
                "link": null,
                "lastSeen": "5m ago",
                "message": null,
                "isRead": false
            },
            {
                "name": "Jacob Thompson",
                "avatar": "./assets/images/avatar-jacob-thompson.webp",
                "action": "has joined your group",
                "link": "Chess Club",
                "lastSeen": "1 day ago",
                "message": null,
                "isRead": false
            },
            {
                "name": "Rizky Hasanuddin",
                "avatar": "./assets/images/avatar-rizky-hasanuddin.webp",
                "action": "sent you a private message",
                "link": null,
                "lastSeen": "5 days ago",
                "message": "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
                "isRead": false
            },
            {
                "name": "Kimberly Smith",
                "avatar": "./assets/images/avatar-kimberly-smith.webp",
                "action": "commented on your picture",
                "link": null,
                "lastSeen": "1 week ago",
                "message": null,
                "isRead": false
            },
            {
                "name": "Nathan Peterson",
                "avatar": "./assets/images/avatar-nathan-peterson.webp",
                "action": "reacted to your recent post",
                "link": "5 end-game strategies to increase your win rate",
                "lastSeen": "2 weeks ago",
                "message": null,
                "isRead": false
            },
            {
                "name": "Anna Kim",
                "avatar": "./assets/images/avatar-anna-kim.webp",
                "action": "left the group",
                "link": "Chess Club",
                "lastSeen": "2 weeks ago",
                "message": null,
                "isRead": true
            }
        ],
        count: 0,
    }
    const getState = () => state
    const setIsRead = (name) => {
        const user = state.users.find(u=> u.name === name)
        if (user) {
            user.isRead = !user.isRead; 
        }
    }
    const setAllIsRead = () => {
        state.users.forEach(user =>
         user.isRead=true)
    }
    const getCount= () => {
         const unreadCount = state.users.filter(user => !user.isRead).length;
        return unreadCount
    }
    return {
        getState,
        setIsRead,
        setAllIsRead,
        getCount,
    }
})()

const updatePage = () => {
    const notifications = document.getElementById('output');
    const header = document.getElementById('header');
    const users = stateModule.getState().users
    const count = stateModule.getCount()
    
    const headerHTMLelement = `
        <div class="header">
            <div class="header-notification">
                <h3>Notifications</h3>
                <span id='counter' class="unread">${count}</span>
            </div>
            <a href="#" class="mark-all" onclick="markAllAsRead()">Mark all as read</a>
        </div>
        `
        
        const HTMLelement = users.map(user=>
            `
            <div id="${user.name}" class=${user.isRead? "notifications-container-read" : "notifications-conatainer"} >
                <div class="notification">
                    <img src="${user.avatar}" alt="" class="avatar">
                    <div class="text-container">
                        <div class="text">
                            <a href="#" class="user" onclick="markAsRead('${user.name}')">${user.name}</a>
                            <span class="action-text">${user.action}</span>
                            <a href="#"  class=${user.link? "link" : 'visibility: hidden' } onclick="markAsRead('${user.name}')">${user.link}</a>
                            <div class= ${user.isRead? 'visibility: hidden' : "unread-dot" }></div>
                        </div>
                        <span class="last-seen">${user.lastSeen}</span>
                        <div class=${user.message && user.isRead? "message" : 'visibility: hidden' }>${user.message}</div>
                    </div>
                </div>
            </div>
            `)
            
    header.innerHTML = headerHTMLelement
    notifications.innerHTML = HTMLelement.join('')

}
updatePage()

const markAsRead = function (user) {
    stateModule.setIsRead(user)
    updatePage()
}
const markAllAsRead = function () {
    stateModule.setAllIsRead()
   updatePage()
}
