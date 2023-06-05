# Фронтенд к итоговой работе «Coin»

## Установка и запуск проекта
1. Для запуска данного проекта Вам понадобится nodejs и npm. 

2. Установите расширение 'CORS Unblock' в браузере и запустите. 
При этом нужно включить, при нажатии на раширение правой клавишей мыши: 

  * Enable Access-Control-Allow-Origin, 
  
  * Enable Access-Control-Allow-Credentials, 
  
  * Enable Access-Control-[Allow/Expose]-Headers.
  
3. Запускаем index.html из папки /dist c помощью web-сервера. Если установлен VSCode, то можно с помощью LiveServer. 

4. Также требуется запустить сервер с данными. Необходимо зайти в папку 'js-advanced-diploma-master'. Выполните `npm init` для установки и `npm start' для запуска сервера. По умолчанию сервер слушает на 3000-ом порту localhost.  


## Запуск тестов

1. Чтобы запустить unit-тесты, необходимо перейти в папку '__test__' и выполнить 'npm test'.
2. Чтобы запустить e2e-тесты, необходимо  перейти в папку 'Coin' и выполнить команду 'npx cypress open' и запустить скрипт 'coin-app.spec.js', предварительно переместив файл 'coin-app.spec.js' в папку 'cypress' - 'integration'.
