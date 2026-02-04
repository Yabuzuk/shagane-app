# Деплой на GitHub Pages

## Шаги для деплоя:

### 1. Создайте репозиторий на GitHub

1. Перейдите на [github.com](https://github.com)
2. Нажмите "New repository"
3. Название: `shagane-app`
4. Сделайте публичным (Public)
5. Создайте репозиторий

### 2. Инициализируйте Git и загрузите код

```bash
cd shagane-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/shagane-app.git
git push -u origin main
```

### 3. Установите зависимости и задеплойте

```bash
npm install
npm run deploy
```

### 4. Настройте GitHub Pages

1. Перейдите в Settings репозитория
2. Откройте раздел "Pages"
3. В Source выберите ветку `gh-pages`
4. Сохраните

### 5. Настройте Telegram бота

После деплоя ваше приложение будет доступно по адресу:
`https://ВАШ_USERNAME.github.io/shagane-app/`

Настройте домен в @BotFather:

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/setdomain`
3. Выберите `@shagane_delivery_bot`
4. Введите: `https://ВАШ_USERNAME.github.io`

## Обновление приложения

После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
npm run deploy
```

## Проверка

Откройте `https://ВАШ_USERNAME.github.io/shagane-app/` в браузере и войдите через Telegram!
