# Colocar o StayOS online (link para validar)

Objetivo: obter um link (ex.: `https://stayos-miramar.onrender.com`) onde abres a app real e validas a Fase 1, sem instalar nada no teu PC. Usamos o **Render** (plano gratuito).

A app já está preparada: arranca sozinha e **semeia os dados automaticamente** no primeiro arranque.

---

## Passo a passo (só com o navegador, sem comandos)

### 1. Pôr o código no GitHub
1. Cria uma conta gratuita em **https://github.com** (se ainda não tens).
2. Clica em **New repository**. Nome: `stayos-miramar`. Deixa **Public**. Cria.
3. Na página do repositório, clica em **uploading an existing file**.
4. **Arrasta para lá todo o conteúdo da pasta `StayOS-system`** (as pastas `src`, `public`, `data` e os ficheiros `package.json`, `render.yaml`, `.node-version`, etc.).
5. Clica em **Commit changes**.

### 2. Publicar no Render
1. Cria conta gratuita em **https://render.com** e escolhe **"Sign in with GitHub"**.
2. Clica em **New +** → **Blueprint**.
3. Seleciona o repositório `stayos-miramar`. O Render lê o ficheiro `render.yaml` e configura tudo sozinho.
4. Clica em **Apply** / **Create**. Espera 1–2 minutos pelo deploy.
5. No fim, o Render mostra o link público (termina em `.onrender.com`).

> Em alternativa ao Blueprint: **New + → Web Service** → escolhe o repo → Start command `node --experimental-sqlite src/server.js` → Node version `22` → Create.

### 3. Abrir e validar
- Abre o link. **Login:** `admin@miramar.hotel` / `admin123`.
- No canto superior direito troca **EN / NL**.
- Envia-me o link e o teu feedback.

---

## Notas
- **Primeiro acesso lento:** no plano gratuito o serviço "adormece" após inatividade; o primeiro carregamento pode levar ~30 segundos. Depois fica rápido.
- **Dados de demonstração:** a base de dados é de exemplo e pode ser reposta num novo deploy — perfeito para validação. Para produção configura-se um disco persistente (Fase 4).
- **Sem GitHub?** Em alternativa podes usar o **Replit** (https://replit.com): "Create Repl" → Node.js → arrasta os ficheiros → Run. Dá também um link público.

Quando validares, avanço para a **Fase 2** (check-in/out digital, atribuição de quartos, housekeeping e manutenção operacionais).
