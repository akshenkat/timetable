

            
        const schedule = [
            {
                "id": 1,
                "name": "Йога",
                "time": "10:00 - 11:00",
                "maxParticipants": 15,
                "currentParticipants": 8

            },
            {
                "id": 2,
                "name": "Пилатес",
                "time": "11:30 - 12:30",
                "maxParticipants": 10,
                "currentParticipants": 5

            },
            {
                "id": 3,
                "name": "Кроссфит",
                "time": "13:00 - 14:00",
                "maxParticipants": 20,
                "currentParticipants": 15

            },
            {
                "id": 4,
                "name": "Танцы",
                "time": "14:30 - 15:30",
                "maxParticipants": 12,
                "currentParticipants": 10

            },
            {
                "id": 5,
                "name": "Бокс",
                "time": "16:00 - 17:00",
                "maxParticipants": 8,
                "currentParticipants": 6

            }
        ];

        const table = document.getElementById('scheduleTable');

        schedule.forEach((item) => {
            const row = table.insertRow(-1);
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>${item.maxParticipants}</td>
                <td id="currentParticipants${item.id}">${item.currentParticipants}</td>
                <td>
                    <button onclick="signUp(${item.id}, ${item.maxParticipants}, ${item.currentParticipants})">
                        Записаться

                    </button>
                    <button id="cancelButton${item.id}" style="display: none" onclick="cancelSignUp(${item.id}, ${item.currentParticipants})">
                        Отменить запись

                    </button>
                </td>
            `;
            updateButtonState(item.id, item.maxParticipants, item.currentParticipants);
        });

        function signUp(id, maxParticipants, currentParticipants) {
            if (currentParticipants < maxParticipants) {
                const currentParticipantsElement = document.getElementById(`currentParticipants${id}`);
                currentParticipantsElement.textContent = ++currentParticipants;
                updateButtonState(id, maxParticipants, currentParticipants);
                saveToLocalStorage(id, currentParticipants);
            }
        }

        function cancelSignUp(id, currentParticipants) {
            const maxParticipants = schedule.find(item => item.id === id).maxParticipants;
            const currentParticipantsElement = document.getElementById(`currentParticipants${id}`);
            currentParticipantsElement.textContent = --currentParticipants;
            updateButtonState(id, maxParticipants, currentParticipants);
            saveToLocalStorage(id, currentParticipants);
        }

        function updateButtonState(id, maxParticipants, currentParticipants) {
            const signUpButton = document.querySelector(`#currentParticipants${id}`).previousElementSibling;
            signUpButton.disabled = currentParticipants >= maxParticipants;
            document.getElementById(`cancelButton${id}`).style.display = currentParticipants > 0 ? 'block' : 'none';
        }

        function saveToLocalStorage(id, currentParticipants) {
            localStorage.setItem(`participants_${id}`, currentParticipants);
        }

        window.onload = () => {
            schedule.forEach(item => {
                const savedParticipants = localStorage.getItem(`participants_${item.id}`);
                if (savedParticipants) {
                    const currentParticipantsElement = document.getElementById(`currentParticipants${item.id}`);
                    currentParticipantsElement.textContent = savedParticipants;
                    updateButtonState(item.id, item.maxParticipants, parseInt(savedParticipants));
                }
            });
        };