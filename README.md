# StayOS — Sistema de Gestão Hoteleira

Aplicação real, sem dependências externas. Fase 1 do roadmap (ver `ROADMAP.md`).

## Requisitos
- **Node.js 22.5 ou superior** (https://nodejs.org). É a única coisa a instalar.

## Como arrancar (3 passos)
```bash
cd StayOS-system
node src/seed.js      # cria a base de dados com os dados de exemplo
node src/server.js    # arranca o servidor
```
Depois abre no navegador: **http://localhost:4000**

Login de demonstração:
- **admin@stayos.hotel** / **admin123** (administrador)
- reception@stayos.hotel / reception123 (receção)
- housekeeping@stayos.hotel / house123 (limpeza)

> No canto superior direito há um seletor **EN / NL** para mudar o idioma da aplicação.

## O que já funciona (Fase 1)
- Login seguro (password com hash, token assinado) e perfis de utilizador.
- **Dashboard** com KPIs calculados a partir da base de dados (ocupação, ADR, RevPAR, receita, satisfação, canais).
- **Mapa de Quartos** (30 quartos, 3 pisos, estado em tempo real).
- **Reservas** (todos os canais e estados).
- **Pedidos de serviço**, **Housekeeping** e **Manutenção** (dados reais).
- **CRM de Hóspedes** (perfis, segmentos, preferências).
- Interface **EN/NL**.

## Estrutura
```
StayOS-system/
  src/
    db.js        # esquema relacional (SQLite) + helpers
    auth.js      # hash de password + tokens (crypto nativo)
    seed.js      # dados iniciais de exemplo
    server.js    # servidor HTTP: API REST + ficheiros estáticos
  public/        # frontend (login + painel staff, EN/NL)
  data/stayos.db # base de dados (gerada pelo seed)
```

## Notas técnicas
- Base de dados **SQLite** — adequada para 1 hotel; migrável para PostgreSQL para cadeias.
- Para mudar a porta: `PORT=8080 node src/server.js`.
- Próximas fases (check-in/out, faturação, portal do hóspede, integração Booking.com) em `ROADMAP.md`.































