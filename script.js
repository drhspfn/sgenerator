const LessonsTypes = {
    'lecture': 'ЛК',
    'lab': 'ЛБ',
    'seminar': 'СМ',
    'practic': 'ПР',
};




function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.style.display = 'none');

    const activeTab = document.getElementById(tabName);
    activeTab.style.display = 'block';
}

function toggleSecondWeek() {
    const secondWeekTab = document.getElementById('scheduleSecondWeek');
    secondWeekTab.style.display = secondWeekTab.style.display === 'none' ? 'block' : 'none';
}

function addLesson(day, weekType) {
    const weekNumber = weekType === 'denominator' ? '2' : '';
    const dayId = `${day}${weekNumber}`;
    const addButton = document.getElementById(`${dayId}-add-btn`);

    if (addButton) {
        const lessonsList = addButton.nextElementSibling;

        const lessonCount = lessonsList.getElementsByClassName('lesson-container').length + 1;
        const newLesson = document.createElement('li');
        newLesson.classList.add('lesson-container');

        const lessonInfo = document.createElement('div');
        lessonInfo.classList.add('lesson-info');

        const lessonNameLabel = document.createElement('label');
        lessonNameLabel.setAttribute('for', `${day}-${weekType}-lessonName`);
        lessonNameLabel.textContent = `Название #${lessonCount}:`;

        const lessonNameInput = document.createElement('input');
        lessonNameInput.setAttribute('type', 'text');
        lessonNameInput.setAttribute('id', `${day}-${weekType}-lessonName`);
        lessonNameInput.setAttribute('name', `${day}-${weekType}-lessonName`);
        lessonNameInput.placeholder = "Ввадите название урока";


        const lessonLinkLabel = document.createElement('label');
        lessonLinkLabel.setAttribute('for', `${day}-${weekType}-lessonLink`);
        lessonLinkLabel.textContent = 'Ссылка:';
        const lessonLinkInput = document.createElement('input');
        lessonLinkInput.setAttribute('type', 'text');
        lessonLinkInput.setAttribute('id', `${day}-${weekType}-lessonLink`);
        lessonLinkInput.setAttribute('name', `${day}-${weekType}-lessonLink`);
        lessonLinkInput.placeholder = "Введите ссылку на урок";

        const lessonTeacherLabel = document.createElement('label');
        lessonTeacherLabel.setAttribute('for', `${day}-${weekType}-lessonTeacher`);
        lessonTeacherLabel.textContent = 'Учитель (При необходимости):';
        const lessonTeacherInput = document.createElement('input');
        lessonTeacherInput.setAttribute('type', 'text');
        lessonTeacherInput.setAttribute('id', `${day}-${weekType}-lessonTeacher`);
        lessonTeacherInput.setAttribute('name', `${day}-${weekType}-lessonTeacher`);
        lessonTeacherInput.placeholder = "Введите имя учителя (Оставьте пустым)";

        const lessonOtherLabel = document.createElement('label');
        lessonOtherLabel.setAttribute('for', `${day}-${weekType}-lessonOther`);
        lessonOtherLabel.textContent = 'Другое (При необходимости):';
        const lessonOtherInput = document.createElement('input');
        lessonOtherInput.setAttribute('type', 'text');
        lessonOtherInput.setAttribute('id', `${day}-${weekType}-lessonOther`);
        lessonOtherInput.setAttribute('name', `${day}-${weekType}-lessonOther`);

        const lessonTypeLabel = document.createElement('label');
        lessonTypeLabel.setAttribute('for', `${day}-${weekType}-lessonType`);
        lessonTypeLabel.textContent = 'Тип:';

        const lessonTypeSelect = document.createElement('select');
        lessonTypeSelect.setAttribute('id', `${day}-${weekType}-lessonType`);
        lessonTypeSelect.setAttribute('name', `${day}-${weekType}-lessonType`);

        const options = [
            { value: 'lecture', text: 'Лекция' },
            { value: 'lab', text: 'Лабораторная работа' },
            { value: 'seminar', text: 'Семинар' },
            { value: 'practic', text: 'Практика' }
        ];

        options.forEach(optionData => {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            lessonTypeSelect.appendChild(option);
        });

        lessonInfo.appendChild(lessonNameLabel);
        lessonInfo.appendChild(lessonNameInput);

        lessonInfo.appendChild(lessonLinkLabel);
        lessonInfo.appendChild(lessonLinkInput);

        lessonInfo.appendChild(lessonTeacherLabel);
        lessonInfo.appendChild(lessonTeacherInput);

        lessonInfo.appendChild(lessonOtherLabel);
        lessonInfo.appendChild(lessonOtherInput);

        lessonInfo.appendChild(lessonTypeLabel);
        lessonInfo.appendChild(lessonTypeSelect);


        newLesson.appendChild(lessonInfo);
        lessonsList.appendChild(newLesson);
        
    }
}

function toggleDay(dayId) {
    const dayBlock = document.getElementById(dayId);
    const lessonsList = dayBlock.getElementsByClassName('lessons-list')[0];
    lessonsList.classList.toggle('expanded');
}

function saveSchedule() {
    const buttonSound = document.getElementById('billysound');
    buttonSound.play();
    const divisiontype = document.getElementById('divisiontype').value;
    const schedule = {
        calls: [],
        first_week: divisiontype,
        numerator: [],
        denominator: [] 
    };

    
    for (let i = 1; i <= 7; i++) {
        const startTime = document.getElementById(`startTime${i}`).value;
        const endTime = document.getElementById(`endTime${i}`).value;
        schedule.calls.push({ start: startTime, end: endTime });
    }

    
    for (let weekIndex = 0; weekIndex < 2; weekIndex++) {
        const weekType = weekIndex === 0 ? 'numerator' : 'denominator';
        const week = [];

        
        for (const day of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']) {
            const lessons = [];
            const dayId = `${day}${weekIndex + 1}`;
            const lessonsList = document.getElementById(`${dayId}`).getElementsByClassName('lessons-list')[0];

            
            const lessonContainers = lessonsList.getElementsByClassName('lesson-container');
            for (const lessonContainer of lessonContainers) {
                const lessonInfo = lessonContainer.querySelector('.lesson-info');

                const nameInput = lessonInfo.querySelector(`input[name^="${day}-${weekType}-lessonName"]`);
                const linkInput = lessonInfo.querySelector(`input[name^="${day}-${weekType}-lessonLink"]`);
                const teacherInput = lessonInfo.querySelector(`input[name^="${day}-${weekType}-lessonTeacher"]`);
                const otherInput = lessonInfo.querySelector(`input[name^="${day}-${weekType}-lessonOther"]`);
                const typeSelect = lessonInfo.querySelector(`select[name^="${day}-${weekType}-lessonType"]`);

                if (nameInput) {
                    const name = nameInput.value;
                    const link = linkInput ? linkInput.value : '';
                    const teacher = teacherInput ? teacherInput.value : '';
                    const other = otherInput ? otherInput.value : '';
                    const type = typeSelect ? typeSelect.value : '';
        
                    lessons.push({ name, type: LessonsTypes[type], link, teacher, other });
                    
                }
            }
            if (lessons.length > 0) {
                week.push(lessons);
            }
            
        }
        if (weekType === 'numerator') {
            schedule.numerator = week;
        }
        else{
            schedule.denominator = week;
        }
    }

    
    const jsonSchedule = JSON.stringify(schedule, null, 2);
    console.log(jsonSchedule);
    
    const blob = new Blob([jsonSchedule], { type: 'application/json' });

    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'schedule.json';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
