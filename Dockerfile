# Используем официальный образ Node.js версии 18
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /m_apart_back

# Копируем файл package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем bcrypt с использованием предварительно собранного бинарного файла
RUN npm install bcrypt@5.1.1

# Копируем все файлы из текущей директории в контейнер
COPY . .

# Определяем порт, который будет использоваться в приложении
ENV PORT 3000

# Открываем порт наружу контейнера
EXPOSE $PORT

# Устанавливаем дополнительные зависимости, которые могут вызывать проблемы
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Сборка проекта
RUN npm run build

# Определяем команду, которая будет выполнена при старте контейнера
CMD ["npm", "start"]
