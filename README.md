Инструкция

1. Проверить наличие редактора или ide. При необходимости скачать 
Например VScode 
- https://code.visualstudio.com/download
2. Проверить наличие git на компьютере. При необходимости установить 
В редакторе VScode открыть терминал, и ввести команду
- winget install --id Git.Git -e --source winget\
или скачать с сайта https://git-scm.com/download/win\
Добавить git в переменную path
3. Необходимо склонировать проект на свой компьютер. 
- git clone https://github.com/dergunovmxm/react-dairy.git
4. Перейти в терминале в дерикторию проекта, использовать команду cd .\react-dairy.git\
5. Проверить наличие node js. При необходимости установить
- https://nodejs.org/en/download/
6. Установить пакетный менеджер npm
- https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
7. В терминал ввести команду 
- npm install 
8. Написать команду 
- npm start - для запуска фронта
9. Параллельно открыть еще один териминал. Написать команду 
- npm run server - для запуска бека
