const showToastButton = document.getElementById('show-toast-button');
const notificationWrapper = document.querySelector('.notifications');
const topics = [];
let interval = null;
let flag = false;
showToastButton.addEventListener('click', () => {
    publish('Success');
})



const publish = (type) => {
    topics.push({
        label: `${type} toast`,
        type,
        timerCount: 5,
        id: topics.length + 1,
        timer: setInterval(timerSet, 1000, topics.length + 1)
    });
    showNotifications();

}

const showNotifications = () => {
    notificationWrapper.innerHTML = '';
    const notifications = topics.map((topic) => {
        const notification = document.createElement('div');
        notification.classList.add(topic.type);
        notification.classList.add('notification');
        const timer = document.createElement('div');
        timer.classList.add('timer');
        const timerLabel = document.createElement('span');
        timerLabel.classList.add('timerCount');
        timerLabel.textContent = topic.timerCount;
        timer.appendChild(timerLabel)
        notification.appendChild(timer);
        const notificationLabel = document.createElement('span');
        notificationLabel.textContent = topic.label;
        notification.appendChild(notificationLabel);
        const crossIcon = document.createElement('div');
        crossIcon.classList.add('cross');
        crossIcon.addEventListener('click', (e) => {
            notificationWrapper.querySelector(`[id="${e.srcElement.parentElement.getAttribute('id')}"]`).remove();
            topics.forEach((topic, index) => {

                if (topic.id == e.srcElement.parentElement.getAttribute('id')) {
                    clearInterval(topic.timer);
                    topics.splice(index, 1);
                }
            })
        })
        crossIcon.textContent = 'x';
        notification.appendChild(crossIcon);
        notification.setAttribute('id', topic.id);
        return notification;

    });
    for (let notifi of notifications) {
        notificationWrapper.appendChild(notifi);
    }

}

function timerSet(index) {
    let flag = true;
    let topic = topics.find((topic)=>{
        return topic.id === index
    })
    topic.timerCount = --topic.timerCount;
    if (topic.timerCount >= 0) {
        flag = false;
    }
    if(flag == true) {
        clearInterval(topic.timer);
    }
    if (topic.timerCount < 0) {

        topics.splice(topics.indexOf(topic), 1);
    }
    showNotifications();
}




