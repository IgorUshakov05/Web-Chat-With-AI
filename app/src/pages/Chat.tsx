import React from "react";
import Header from "../component/Header";
import MessageTemplate from "../component/СhatComponent/Message";
import Aside from "../component/СhatComponent/Aside";
import Input from "../component/СhatComponent/Input";
const text = `
# Заголовок уровня 1
## Заголовок уровня 2
### Заголовок уровня 3
#### Заголовок уровня 4

---
Loerm awhd awdawiodiawda adauwdb jakwdo augwdbj aowjd9fa twcdg adauwdb jakwdo augwdbj aowjd9fa twcdgadauwdb jakwdo augwdbj aowjd9fa twcdgadauwdb jakwdo augwdbj aowjd9fa twcdgadauwdb jakwdo augwdbj aowjd9fa twcdg
## **Текстовое форматирование**

- *Курсив*
- **Жирный**
- ***Жирный курсив***
- ~~Зачёркнутый~~
- \`Моноширинный текст\`
- [Ссылка на Google](https://www.google.com)

---

## **Списки**

### Маркированный список

- Первый элемент
- Второй элемент
  - Вложенный элемент
    - Глубже

### Нумерованный список

1. Элемент 1
2. Элемент 2
   1. Подпункт 2.1
   2. Подпункт 2.2

---

## **Блоки цитирования**

> Это блок цитирования.
>> Вложенный блок цитирования.

---

## **Картинка**

![Альтернативный текст](https://th.bing.com/th/id/OIP.H2CVvZqgQCNegcnrCgak3QHaEK?w=289&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7 "Подсказка при наведении")

---

## **Код**

### Встроенный код

Текст с \`встроенным кодом\`.

### Блочный код

\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Игорь");
\`\`\`

\`\`\`bash
npm install
npm run build
\`\`\`

---

## **Таблица**

| Имя       | Возраст | Профессия       |
|-----------|--------:|-----------------|
| Игорь     |      19 | Разработчик     |
| Соня      |      20 | Дизайнер        |
| Алексей   |      35 | Аналитик        |

---

## **Контрольный список**

- [x] Сделано
- [ ] Не сделано
- [x] Ещё одно сделанное дело

---

## **HTML внутри Markdown**

<div style="color: red; font-weight: bold;">
Это HTML внутри Markdown (если поддерживается).
</div>
`;

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Aside />

        <section className="chat-area">
          <div className="chat-messages">
            <MessageTemplate
              data={{ sender: "Bot", text: text, timestamp: 201212 }}
            />
          </div>
          <Input />
        </section>
      </main>
    </div>
  );
};

export default ChatPage;
