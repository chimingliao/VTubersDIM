fetch('data.json')
    .then(response => {
        if (!response.ok) {
            console.error(`Failed to load JSON file: ${response.status}`);
            return;
        }
        return response.json();
    })
    .then(messages => {
        const container = document.getElementById('chat-container');
        messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', msg.role);

            const avatar = document.createElement('img');
            avatar.classList.add('avatar');
            avatar.src = msg.role === 'user' ? 'user-avatar.png' : 'ai-avatar.png';
            avatar.alt = msg.role === 'user' ? 'User Avatar' : 'AI Avatar';

            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.textContent = msg.message;

            if (msg.role === 'user') {
                messageDiv.appendChild(bubble);
                messageDiv.appendChild(avatar);
            } else {
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(bubble);
            }

            container.appendChild(messageDiv);
        });
    })
    .catch(error => console.error('Error fetching messages:', error));
