# ---"Forum"---/BACKEND/

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/5a87b5e4-72c0-48e8-a23c-dfadaa2c9003)

Краткое описание:
Для реализации своей практики на клиентской стороне решил изучить NodeJS для создания серверной части моего приложения. 
Это мой второй опыт работы с NodeJS. В логике серверной части в приложении создана база для регистрации, авторизации и создания статей. Работа велась на NodeJS с использоваанием такой базы данных, как MongoDB(очень удобная NoSQL-система, использующая близкие мне для понимания JSON-подобные документы). Также для размещения серверной части была использованная облачная PaaS-платформа - Heroku. Для тестирования запросов познакомился с такой удобной программой, как Postman. Ну и бонусом потестил прогу для организации работы - PomoDoneApp. 

Основные задачи: 
- Создать рабочую серверную часть приложения на JS.
- Понять принцип взаимодействия клиентской и серверной части приложения.
- Расширить пул своих инструментов. 

Функционал:
1. Создание маршрутов для регистрации и авторизации, получения информации о конкретном пользователе и обновления данных пользователя. 
При регистрации и авторизации формируется POST запрос с отправки на сервер данных в JSON формате и при успешном прохождении валидации и загрузки данных на клиентскую сторону приходит token (он генерируется с использованием jsonwebtoken). Предварительно с помощью bcrypt генерируется соль. Затем сгенерированная соль используется для хеширования пароля с помощью bcrypt.hash(password, salt). 
Вот пример кода, который реализует функцию register для регистрации нового пользователя:

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/7245fad1-01e9-4121-9afa-1841b50a9ea2)

3. В работе с созданием и использованием статей используются следующие маршруты:
- Создание статьи.
- Обновление статьи.
- Получение всех статей.
- Получение одной статьи.
- Система лайков.
- Удаление статьи.
- Получение тегов(категорий) статей.
В работе со статьями применялась валидация статей. Также при просмотре статьи автоматически работал счетчик на колличество просмотров:
![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/46fa5317-9d7b-4bdd-81ef-4c9ada43f43e)

- Также для подгрузки статей в базу данных и валидации использовался следующий скрипт:
![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/95a8bd37-b4a2-4730-af91-ff971d5523d6)
4. Для подгрузки изображений на сервер использовался Multer. Изначально была идея зранить изображения на облаке (было создано пару buckets в google cloud, но потом было принято решение, что для тестовой работы хватит и работы с серверной часть. Так делать нельзя, но тут это не играло большой роли. Пишу это для того, чтобы обозначить свою мысль по этому вопросу).
Для подгрузки изображений использовался следующий обработчик маршрута:

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/2f7b8e39-3e23-41d0-91b0-6a2349d5a0a3)

5. Для создания валидации и выявления ошибок при некоректной подгрузке информации на сервер был использован express-validator. 
Вот пример валидации создания и редактирования статей:
![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/a95c96a8-3b94-4074-823f-38255c16889c)

Инструментарий:
1. Express (этот фреймворк я использовал для организации моего веб-приложения и API, обработки маршрутов, управления запросами и ответами и т.д.).
2. Mongoose (для взаимодействия с MongoDB).
3. bcrypt (для хеширования паролей).
4. Multer (для загрузки файлов).
5. CORS (для управления доступом к моему приложению при возникающих ограничениях, возникающих с политикой Cross-Origin Resource Sharing).
6. dotenv (для обеспечения безопасности в работе с приложением и создания переменных в .env).
7. jsonwebtoken (для создания token).
8. express-validator (для валидации)

Набор маршрутов для взаимодействия с постами (posts) в приложении:

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_node-back/assets/147053338/36a9dcd6-1874-4374-a9f2-88b64247579d)


Вывод: 
1. В работе на серверной части я нашел много интересного и, когда-нибудь, я с удовольствием уйду в чистую логику моего любимого JS c позиции Frontend-developer. 
2. Пришло понимание специфики работы с backend разработчиками, что в значительной степени ускорило создание и реализацию API. 
3. Создание Fullstack приложения на JS это хорошая практика.

![image](https://github.com/Aleksandr-Khokhrin/MyForumApp_react-front/assets/147053338/d1421d97-c486-45f4-b34f-5faede758ca4)



