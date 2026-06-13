# StayOS — Roadmap de implementação

Sistema de gestão hoteleira para o Demo Hotel (30 quartos), construído com base no protótipo aprovado.

## Stack escolhida (e porquê)

| Camada | Tecnologia | Razão |
|---|---|---|
| Backend / API | **Node.js (módulos nativos `http` + `node:sqlite`)** | Zero dependências externas — arranca com `node server.js`, sem `npm install`. Robusto e fácil de manter. |
| Base de dados | **SQLite** (ficheiro `data/stayos.db`) | Relacional, transacional e mais do que suficiente para 1 hotel. Migrável para PostgreSQL quando houver cadeia/escala. |
| Frontend | **HTML/CSS/JS estático** (mesmo design do protótipo) | Sem build, abre em qualquer navegador. Painel de staff + portal do hóspede. |
| Idiomas | **EN + NL** (sistema i18n) | Conforme definido. PT só para comunicação contigo. |
| Autenticação | Hash de password (`scrypt`) + token assinado (HMAC) | Nativo do Node, sem bibliotecas. |

> Para produção/escala futura, a arquitetura mapeia diretamente para Node+Express+PostgreSQL ou NestJS, reaproveitando o schema e a lógica.

## Fases (validas no fim de cada uma)

### ✅ Fase 1 — Núcleo operacional (EM CURSO)
Fundação real e navegável com dados de verdade:
- Base de dados relacional completa + dados do Demo Hotel (30 quartos, hóspedes, reservas).
- API REST + login seguro com perfis de utilizador.
- Painel de staff ligado à API: **Dashboard, Mapa de Quartos, Reservas, CRM de Hóspedes**.
- Interface EN/NL.

### Fase 2 — Fluxo do hóspede e operação
- **Check-in/Check-out** digital (validação, atribuição de quarto, estados da reserva).
- **Housekeeping** (tarefas por prioridade, confirmação de limpo).
- **Manutenção** (avarias, prioridades, bloqueio de quarto).
- **Pedidos de serviço** (encaminhamento por departamento, estados).

### Fase 3 — Negócio e comunicação
- **Faturação e pagamentos** (faturas/recibos/notas de crédito, métodos, exportação).
- **Reviews** (formulário, categorias, alertas, reencaminhamento externo).
- **Comunicação automática** (templates editáveis, gatilhos por evento).
- **Portal do hóspede** (link/QR, pedidos, info útil).

### Fase 4 — Integrações, gestão e produção
- **Channel manager / Booking.com** (importação de reservas, disponibilidade, anti-overbooking).
- **Dashboards e relatórios** avançados + exportação PDF/Excel/CSV.
- **Utilizadores e permissões** granulares + registo de atividade.
- **Segurança/GDPR** (encriptação de documentos, backups, logs) e **guia de produção/deploy**.

## MVP
A Fase 1 + Fase 2 constituem o MVP operacional: chega para gerir reservas, quartos, chegadas/saídas e limpeza no dia-a-dia.

## Como vais validar
No fim de cada fase entrego o sistema a correr e digo-te exatamente o que abrir/clicar. Tu validas e dou seguimento à fase seguinte.






