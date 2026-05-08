-- =============================================================
-- SCRIPT: Crear usuario de solo lectura para sql-translator
-- =============================================================
-- Ejecuta este script conectado como superusuario (ej: postgres)
-- Reemplaza los valores entre <> con los tuyos reales.
-- =============================================================

-- 1. Crear el usuario de solo lectura
CREATE USER <readonly_username> WITH PASSWORD '<readonly_password>';

-- 2. Permitir que el usuario se conecte a la base de datos
GRANT CONNECT ON DATABASE <database_name> TO <readonly_username>;

-- 3. Permitir acceso al schema público
GRANT USAGE ON SCHEMA public TO <readonly_username>;

-- 4. Dar permisos de SELECT sobre todas las tablas actuales
GRANT SELECT ON ALL TABLES IN SCHEMA public TO <readonly_username>;

-- 5. Dar permisos de SELECT automáticamente sobre tablas futuras
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO <readonly_username>;

-- =============================================================
-- CÓMO USARLO EN EL PROYECTO:
-- =============================================================
-- Después de ejecutar este script, actualiza tu archivo .env
-- con las credenciales del nuevo usuario de solo lectura:
--
-- DB_USERNAME=<readonly_username>
-- DB_PASSWORD=<readonly_password>
--
-- De esta forma, aunque se genere un DELETE o UPDATE por error,
-- la base de datos rechazará la operación a nivel de permisos.
-- =============================================================
