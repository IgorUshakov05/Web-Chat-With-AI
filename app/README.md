# Простая программа на PySide6

Эта программа создаёт простое окно с кнопкой "Нажми меня!".  При нажатии кнопки выводится сообщение.

## Код:

```python
import sys
from PySide6.QtWidgets import QApplication, QWidget, QPushButton, QLabel, QVBoxLayout
from PySide6.QtGui import QIcon


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Моя первая программа на PySide6")
        self.setWindowIcon(QIcon("path/to/your/icon.png")) # Замените на путь к вашему значку

        # Кнопка
        button = QPushButton("Нажми меня!")
        button.clicked.connect(self.button_clicked)

        # Текстовая метка (Label)
        self.label = QLabel("Нажми на кнопку!")

        # Вертикальный layout
        layout = QVBoxLayout()
        layout.addWidget(button)
        layout.addWidget(self.label)
        self.setLayout(layout)


    def button_clicked(self):
        self.label.setText("Кнопка нажата!")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())