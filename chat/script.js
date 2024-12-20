fetch('data.json')
    .then(response => response.json())
    .then(messages => {
        const chatContainer = document.getElementById('chat-container');
        let index = 0;

        function scrollToBottom() {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function showMessage() {
            if (index < messages.length) {
                const msg = messages[index];
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', msg.role);

                const avatar = document.createElement('img');
                avatar.classList.add('avatar');
                avatar.src = msg.role === 'user' ? 'user-avatar.png' : 'ai-avatar.png';
                avatar.alt = msg.role === 'user' ? 'User Avatar' : 'AI Avatar';

                const bubble = document.createElement('div');
                bubble.classList.add('bubble');
                bubble.textContent = '';

                messageDiv.appendChild(msg.role === 'user' ? bubble : avatar);
                messageDiv.appendChild(msg.role === 'user' ? avatar : bubble);

                chatContainer.appendChild(messageDiv);
                messageDiv.style.opacity = 1;

                const text = msg.message;
                let charIndex = 0;

                function typeChar() {
                    if (charIndex < text.length) {
                        bubble.textContent += text[charIndex];
                        charIndex++;
                        scrollToBottom(); // 實時滾動到最底部
                        setTimeout(typeChar, 30);
                    } else {
                        index++;
                        setTimeout(showMessage, 500); // 延遲顯示下一條消息
                    }
                }
                typeChar();
            }
        }

        showMessage();
    })
    .catch(error => console.error('Error loading messages:', error));
