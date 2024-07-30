# [Osmon clicker TMA](https://t.me/osmon_clicker_tma_bot) (React + TypeScript + Vite)

## Требуемое ПО

- Node.js, npm

### Переменные окружения

```VITE_APP_USER_ID = id текущего подзователя
VITE_APP_MAX_ENERGY = максимальное количество энергии
VITE_APP_API_URL = адрес api сервера(без endpoint'ов)
BOT = телеграм бот
WEBAPP_URL = ссылка на само веб приложение
```

### Инструкция по запуску

- Docker compose
  - `docker compose -f docker-compose.dev.yml up --build`
  - [localhost](http://localhost:5173/) - доступно после запуска
- Vite
  - `npm install`
  - `npm run dev`
  - [localhost/osmon-clicker-tma](http://localhost:5173/osmon-clicker-tma/) - путь к приложению

### Deploy

- GitHub Pages
  - `npm run deploy`
  - Подождите 3-5минут пока изменения не вступят в силу
  - После перейдите по [ссылке](https://osmon11.github.io/osmon-clicker-tma/) или запустите webapp через [телеграм бот](https://t.me/osmon_clicker_tma_bot)
