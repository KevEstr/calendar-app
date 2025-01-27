# 📅 Event Calendar

Event Calendar es una página web diseñada para gestionar eventos de manera intuitiva y eficiente. Inspirada en las mejores prácticas de herramientas de calendario digitales, esta aplicación ofrece una experiencia adaptable para usuarios que buscan organizar su tiempo de forma efectiva.

Con una interfaz amigable y opciones de personalización, nos permite: 
- La creación, edición y visualización de eventos en distintas vistas, facilitando una gestión fluida y optimizada.
- Conocer los días festivos de cada mes haciendo uso de una API que nos brinda toda la información.
- Ver los próximos eventos para un mayor orden en la agenda del cliente.
- Saber que eventos han expirado debido a que ya se pasó de la fecha y/o hora de éste.
- Tener controlado que no se añadan fechas incorrectas o pasadas del día actual, horas que se superponen o campos sin rellenar.

---

## 🚀 Instrucciones para ejecutar el proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/KevEstr/calendar-app
   cd calendar-app
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   - Ve a `http://localhost:5173/` para ver la aplicación en acción.

---

## 🧠 Enfoque tomado

Este proyecto ha sido desarrollado con un enfoque en:

- **Usabilidad:** Interfaz intuitiva y fácil de usar para gestionar eventos de manera eficiente.
- **Rendimiento:** Uso de Vite para tiempos de carga rápidos y optimización automática.
- **Escalabilidad:** Código modular y reutilizable para facilitar futuras mejoras.
- **Diseño responsive:** Adaptado para ofrecer una excelente experiencia en dispositivos móviles y de escritorio.
- **Componentización:** Arquitectura basada en componentes reutilizables para una mayor mantenibilidad.

Se desarrolló la página teniendo en cuenta las distintas formas en que un cliente puede acceder, añadir y ver todo tipo de eventos,
priorizando la experiencia de usuario y brindandole al cliente todas las opciones que tiene lo más minimalista y eficiente posible
desde el menu principal, teniendo varias opciones que se adaptan a distintos clientes segun sus necesidades. Por ejemplo, un calendario grande
con todos los eventos, un mini calendario que abarca una vista previa de todo el contenido o un botón de evento rápido para introducir 
el evento sin necesidad de navegar por todos los meses.

---

## 🛠️ Herramientas utilizadas

Este proyecto fue construido utilizando el siguiente stack tecnológico:

- **⚛️ React** – Librería para interfaces de usuario.
- **💻 TypeScript** – Tipado estático para mayor seguridad y mantenimiento del código.
- **⚡ Vite** – Herramienta de construcción rápida y eficiente.
- **🎨 Tailwind CSS** – Framework de utilidades para un diseño moderno y responsivo.
- 🔄 Redux – Librería para manejo de estado global en aplicaciones React.

---

## 🎨 Diseño en Figma

Puedes visualizar el diseño de la aplicación en el siguiente enlace:

[🔗 Diseño en Figma](https://www.figma.com/design/U0htWH1QMQ0xeRMU2iH68F/Untitled?node-id=0-1&m=dev&t=sY3CGqXgs9peBqks-1)

---

## 📂 Estructura del proyecto

```
├── src/
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Hooks personalizados
│   ├── store/        # Gestión del estado global de la aplicación
│   ├── utils/        # Helpers
│   ├── types/        # Definiciones de estructuras de datos de la aplicación
│   └── App.tsx       # Componente principal
├── public/           # Recursos estáticos
├── package.json      # Dependencias y scripts
└── README.md         # Documentación del proyecto
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

