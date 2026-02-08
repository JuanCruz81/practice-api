DESCRIPCION DEL PROYECTO: PRACTICE API

practice-api es una API REST de práctica construida con Node.js y Express, implementada con autenticación JWT y gestión de múltiples ambientes.

================================================================================
ESTRUCTURA DEL PROYECTO
================================================================================

practice-api/
├── src/
│   └── server.js          - Servidor principal
├── .env.development       - Variables para desarrollo
├── .env.production        - Variables para producción
├── .env.test              - Variables para testing
├── .env.example           - Plantilla de referencia
├── .gitignore             - Archivos ignorados por Git
└── package.json           - Configuración del proyecto


================================================================================
STACK TECNOLOGICO
================================================================================

Runtime: Node.js
Framework: Express 5.2.1
Autenticación: JWT (jsonwebtoken 9.0.3)
Configuración: dotenv 17.2.4


================================================================================
FUNCIONALIDADES PRINCIPALES
================================================================================

1. AUTENTICACION JWT
   - Middleware de verificación de tokens
   - Ruta /login para obtener token (válido 1 hora)
   - Protección de rutas autenticadas con Bearer token

2. GESTION DE ITEMS (CRUD)
   - GET /api/items - Obtener items con info del usuario autenticado
   - POST /api/items - Crear nuevo item
   - GET /api/items/many - Obtener 1000 items de ejemplo
   - GET /api/items/paginated - Obtener items con paginación

3. AMBIENTES CONFIGURABLES
   - development - Puerto 3000, logs detallados
   - production - Puerto 8080, logs minimales
   - test - Puerto 3001, logs de advertencia


================================================================================
SCRIPTS NPM
================================================================================

npm start        - Ejecutar en desarrollo
npm run dev      - Ejecutar en desarrollo (alias)
npm run prod     - Ejecutar en producción
npm run test     - Ejecutar en testing


================================================================================
RAMAS GIT
================================================================================

main     - Rama de producción
develop  - Rama de desarrollo (actualizada)
staging  - Rama de pre-producción


================================================================================
SEGURIDAD
================================================================================

- Variables sensibles cargadas desde .env
- Archivos .env excluidos de Git (.gitignore)
- Claves secretas configurables por ambiente
- Tokens JWT con expiración


================================================================================
CONFIGURACION POR AMBIENTE
================================================================================

Cada ambiente carga automáticamente su archivo .env correspondiente con:
- NODE_ENV - Tipo de ambiente
- PORT - Puerto de escucha
- SECRET_KEY - Clave para firmar JWTs
- LOG_LEVEL - Nivel de logging
