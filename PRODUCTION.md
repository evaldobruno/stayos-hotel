# StayOS — Guia de produção e segurança (Fase 4)

A app já é funcional e sevura para demonstração. Para a pôr em produção real num hotel, estes são os passos recomendados.

## 1. Persistência da base de dados
No plano gratuito do Render o disco é temporário (a base de dados é recriada a cada deploy). Para dados reais:
- **Opção simples:** no Render, adicionar um **Persistent Disk** (1 GB chega) montado em `…/data`, para o ficheiro `stayos.sqlite` persistir.
- **Opção escalável:** migrar para **PostgreSQL** (o esquema relacional é o mesmo). Recomendado para cadeias ou vários utilizadores em simultâneo.

## 2. Backups e recuperação
- Com SQLite: cópia diária automática do ficheiro `data/stayos.sqlite` para um armazenamento externo (ex.: backup agendado).
- Com PostgreSQL: usar os backups automáticos do fornecedor (snapshots diários + retenção).
- Testar periodicamente o restauro.

## 3. Segurança
- Definir a variável de ambiente **`STAYOS_SECRET`** (chave forte) — o `render.yaml` já a gera automaticamente. Nunca usar a chave de desenvolvimento em produção.
- **HTTPS:** o Render fornece certificado automático (o link `https://` já é seguro).
- Passwords: já são guardadas com hash (scrypt) — nunca em texto simples.
- Forçar troca da password do admin no primeiro acesso real.

## 4. Conformidade (GDPR)
- **Minimização:** guardar apenas os dados necessários do hóspede.
- **Documentos de hóspedes:** se forem carregados (passaporte/CC), encriptar em repouso e definir prazo de eliminação automática.
- **Direito ao esquecimento:** procedimento para anonimizar/eliminar um hóspede a pedido.
- **Retenção:** política de retenção de reservas/faturas conforme a lei fiscal local.
- **Registo de atividade:** já existe (ecrã "Activity log") para rastreabilidade de acessos.

## 5. Integração real com Booking.com
A sincronização atual é **simulada** (demonstra a lógica e a prevenção de overbooking). Em produção, substituir o endpoint `/api/channels/sync` por uma de duas vias:
- **Channel manager** (ex.: SiteMinder, Cubilis, Smoobu) via a sua API — recomendado, liga Booking, Expedia, Airbnb e site próprio num só ponto.
- **Ligação direta** à Booking.com (Connectivity API) ou importação do calendário **iCal** de cada canal.
A estrutura de dados (tabela `reservations` com `channel`) já está preparada para isto.

## 6. Relatórios
- Exportação **CSV** já disponível (reservas, faturas) no ecrã "Reports".
- Para **PDF/Excel** nativos, adicionar uma biblioteca de geração num ambiente que permita instalação de pacotes (o deste protótipo está restrito). A app está preparada para receber esses formatos.

## 7. Faturação fiscal (Portugal/UE)
- Para faturação certificada (séries, comunicação à AT, SAF-T-PT), integrar com um fornecedor certificado (ex.: InvoiceXpress, Vendus, Moloni) através da sua API.

## 8. Escala e operação
- Migrar para PostgreSQL quando houver vários hotéis ou alta concorrência.
- Monitorização (uptime, erros) e alertas.
- App mobile futura pode reutilizar a mesma API.

## Resumo do estado atual
Fases 1–4 entregues: operação completa (reservas, quartos, check-in/out, housekeeping, manutenção, pedidos), negócio (faturação, reviews, mensagens, CRM), portal do hóspede, canais com anti-overbooking, relatórios CSV, definições, permissões e registo de atividade. Pronto para piloto; para produção plena seguir os pontos acima.
