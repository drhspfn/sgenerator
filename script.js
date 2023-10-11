const LessonsTypes = {
    'lecture': 'ЛК',
    'lab': 'ЛБ',
    'seminar': 'СМ',
    'practic': 'ПР',
};

const day_names = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
const ID_PREFIX = (day, week) => `${day}${week}`;

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
        
        const newLesson = createLessonItem({'name':"", "link": "", "other": "", "teacher": "", 'type': "ЛК"}, day, weekType, lessonCount-1);//
        /*const newLesson = document.createElement('li');
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
        const selectedValue = Object.keys(LessonsTypes).find(key => LessonsTypes[key].toLowerCase() === lessonType.toLowerCase());
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
        

        newLesson.appendChild(lessonInfo);*/
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
            week.push(lessons);
            
            
        }
        if (weekType === 'numerator') {
            schedule.numerator = week;
        }
        else{
            schedule.denominator = week;
        }
        /*
        if (divisiontype == 'denominator'){
            if (weekType === 'numerator'){
                schedule.denominator = week;
            }else {
                schedule.numerator = week;
            }
        }
        else if (divisiontype == 'numerator'){
            if (weekType === 'denominator'){
                schedule.numerator = week;
            }else {
                schedule.denominator = week;
            }
        }*/
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

function editSchedule() {
    const fileInput = document.getElementById('fileInput');
    const reader = new FileReader();

    reader.onload = function (event) {
        const fileContent = event.target.result;

        try {
            const scheduleData = JSON.parse(fileContent);
            loadSchedule(scheduleData);
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
            alert('Невозможно прочитать файл JSON. Убедитесь, что файл имеет правильный формат.');
        }
    };

    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        reader.readAsText(selectedFile);
    } else {
        alert('Выберите файл JSON для загрузки расписания.');
    }
    /*const fileInput = document.getElementById('fileInput');
    
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const scheduleData = JSON.parse(e.target.result);
                loadSchedule(scheduleData);
            };

            reader.readAsText(file);
        }
    });*/
}
function updateCallsSchedule(calls) {
    const timeInputs = document.querySelector('.time-inputs');
    calls.forEach((call, index) => {
        const startTimeInput = timeInputs.querySelector(`#startTime${index + 1}`);
        const endTimeInput = timeInputs.querySelector(`#endTime${index + 1}`);
        startTimeInput.value = call.start;
        endTimeInput.value = call.end;
    });
}
function updateLessonSchedule(divisionType, lessons) {
    const weekElement = document.getElementById((divisionType === "numerator") ? "scheduleFirstWeek" : "scheduleSecondWeek");
    
    lessons.forEach((daySchedule, dayIndex) => {
        console.log(daySchedule);
        const dayElement = weekElement.querySelector(`#${getDayId(divisionType, dayIndex)}`);
        console.log(dayElement);
        const lessonsList = dayElement.querySelector('.lessons-list');
        daySchedule.forEach((lesson, lesson_index) => {
            const lessonItem = createLessonItem(lesson, day_names[dayIndex], divisionType, lesson_index);
            lessonsList.appendChild(lessonItem);
        });
    });
}
function createLessonItem(lesson, day_name, week_name, lessonIndex) {
    const newLesson = document.createElement('li');
    newLesson.classList.add('lesson-container');

    const lessonInfo = document.createElement('div');
    lessonInfo.classList.add('lesson-info');

    const lessonNameLabel = document.createElement('label');
    lessonNameLabel.setAttribute('for', `${day_name}-${week_name}-lessonName`);
    lessonNameLabel.textContent = `Название #${lessonIndex+1}:`;

    const  lessonNameInput = createInputElement('text', `${day_name}-${week_name}-lessonName`, `${day_name}-${week_name}-lessonName`, 'Ввадите название урока',  lesson.name);
    /*const lessonNameInput = document.createElement('input');
    lessonNameInput.setAttribute('type', 'text');
    lessonNameInput.setAttribute('id', `${day_name}-${week_name}-lessonName`);
    lessonNameInput.setAttribute('name', `${day_name}-${week_name}-lessonName`);
    lessonNameInput.placeholder = "Ввадите название урока";
    lessonNameInput.value = lesson.name;*/


    const lessonLinkLabel = document.createElement('label');
    lessonLinkLabel.setAttribute('for', `${day_name}-${week_name}-lessonLink`);
    lessonLinkLabel.textContent = 'Ссылка:';
    const  lessonLinkInput = createInputElement('text', `${day_name}-${week_name}-lessonLink`, `${day_name}-${week_name}-lessonLink`, 'Введите ссылку на урок',  lesson.link);
    /*const lessonLinkInput = document.createElement('input');
    lessonLinkInput.setAttribute('type', 'text');
    lessonLinkInput.setAttribute('id', `${day_name}-${week_name}-lessonLink`);
    lessonLinkInput.setAttribute('name', `${day_name}-${week_name}-lessonLink`);
    lessonLinkInput.placeholder = "Введите ссылку на урок";
    lessonLinkInput.value = lesson.link;*/

    const lessonTeacherLabel = document.createElement('label');
    lessonTeacherLabel.setAttribute('for', `${day_name}-${week_name}-lessonTeacher`);
    lessonTeacherLabel.textContent = 'Учитель (При необходимости):';
    const  lessonTeacherInput = createInputElement('text', `${day_name}-${week_name}-lessonTeacher`, `${day_name}-${week_name}-lessonTeacher`, 'Введите имя учителя (Оставьте пустым)',  lesson.teacher);
    /*const lessonTeacherInput = document.createElement('input');
    lessonTeacherInput.setAttribute('type', 'text');
    lessonTeacherInput.setAttribute('id', `${day_name}-${week_name}-lessonTeacher`);
    lessonTeacherInput.setAttribute('name', `${day_name}-${week_name}-lessonTeacher`);
    lessonTeacherInput.placeholder = "Введите имя учителя (Оставьте пустым)";
    lessonTeacherInput.value = lesson.teacher;*/

    const lessonOtherLabel = document.createElement('label');
    lessonOtherLabel.setAttribute('for', `${day_name}-${week_name}-lessonOther`);
    lessonOtherLabel.textContent = 'Другое (При необходимости):';
    
    const lessonOtherInput = createInputElement('text', `${day_name}-${week_name}-lessonOther`, `${day_name}-${week_name}-lessonOther`, 'Доп. информация',  lesson.other);
    //createInputElement('text', `${day_name}-${week_name}-lessonName`, `${day_name}-${week_name}-lessonName`, 'Введите название урока', lesson.name);
    /*document.createElement('input');
    lessonOtherInput.setAttribute('type', 'text');
    lessonOtherInput.setAttribute('id', `${day_name}-${week_name}-lessonOther`);
    lessonOtherInput.setAttribute('name', `${day_name}-${week_name}-lessonOther`);
    lessonOtherInput.value = lesson.other;*/

    const lessonTypeLabel = document.createElement('label');
    lessonTypeLabel.setAttribute('for', `${day_name}-${week_name}-lessonType`);
    lessonTypeLabel.textContent = 'Тип:';

    const lessonTypeSelect = document.createElement('select');
    lessonTypeSelect.setAttribute('id', `${day_name}-${week_name}-lessonType`);
    lessonTypeSelect.setAttribute('name', `${day_name}-${week_name}-lessonType`);

    const options = [
        { value: 'lecture', text: 'Лекция' },
        { value: 'lab', text: 'Лабораторная работа' },
        { value: 'seminar', text: 'Семинар' },
        { value: 'practic', text: 'Практика' }
    ];
    const lessonTypeKey = Object.keys(LessonsTypes).find(key => LessonsTypes[key] === lesson.type);
    options.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        if (optionData.value === lessonTypeKey) {
            option.selected = true; 
        }
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
    return newLesson;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function getDayId(divisionType, dayIndex) {
    const weekId = (divisionType === "numerator") ? 1 : 2;
    return ID_PREFIX(day_names[dayIndex], weekId);
}
function clearSchedule() {
    const callsTab = document.getElementById('scheduleCallsTab');
    const timeInputs = callsTab.querySelector('.time-inputs');
    timeInputs.reset();

    const firstWeek = document.getElementById('scheduleFirstWeek');
    const secondWeek = document.getElementById('scheduleSecondWeek');
    clearWeekSchedule(firstWeek);
    clearWeekSchedule(secondWeek);
}
function clearWeekSchedule(weekElement) {
    const days = weekElement.querySelectorAll('.day');
    days.forEach(day => {
        const lessonsList = day.querySelector('.lessons-list');
        lessonsList.innerHTML = '';
    });
}
function loadSchedule(scheduleData) {
    clearSchedule();
    const divisionTypeSelect = document.getElementById('divisiontype');
    divisionTypeSelect.value = scheduleData.first_week;
    updateCallsSchedule(scheduleData.calls);
    updateLessonSchedule('numerator', scheduleData.numerator);
    updateLessonSchedule('denominator', scheduleData.denominator);
}
function createInputElement(type, id, name, placeholder, value = '') {
    const element = document.createElement('input');
    element.setAttribute('type', type);
    element.setAttribute('id', id);
    element.setAttribute('name', name);
    element.placeholder = placeholder;
    element.value = value;
    return element;
}
