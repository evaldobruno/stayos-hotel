# Guia detalhado — pôr o StayOS no GitHub (só com o navegador)

Não instalas nada. Usa o **Chrome** ou **Edge** (o arrastar de pastas funciona melhor nestes).

---

## Parte 1 — Criar a conta e o repositório

1. Vai a **https://github.com** e cria uma conta gratuita (ou faz login).
2. No canto superior direito, clica no **`+`** → **New repository**.
3. Preenche:
   - **Repository name:** `stayos-miramar`
   - **Visibility:** deixa em **Public**
   - **NÃO** marques "Add a README" (queremos o repositório vazio)
4. Clica em **Create repository**.

Vais cair numa página com instruções. Procura a frase:
> *"…or **uploading an existing file**"*

Clica em **uploading an existing file**.
(Ou vai direto a: `https://github.com/O-TEU-NOME/stayos-miramar/upload/main`)

---

## Parte 2 — Carregar os ficheiros (o passo importante)

⚠️ **Tens de arrastar o que está DENTRO da pasta `StayOS-system`, não a pasta em si.**

1. No teu computador, **abre** a pasta `StayOS-system`. Deves ver lá dentro:
   ```
   src        (pasta)
   public     (pasta)
   data       (pasta)
   package.json
   render.yaml
   README.md
   DEPLOY.md
   .node-version
   ```
2. Seleciona **tudo** isto (clica num e faz **Ctrl + A**).
3. **Arrasta** a seleção para dentro da janela do navegador (para a zona que diz *"Drag files here"*).
4. Espera que apareçam todos na lista (as pastas mantêm a estrutura — vais ver `src/…`, `public/…`).
5. Desce até ao fundo da página e clica no botão verde **Commit changes**.

Pronto — o código está no GitHub. Confirma que, na página principal do repositório, vês o `render.yaml` e as pastas `src` e `public` **logo no topo** (não dentro de outra pasta).

> 💡 Se o `.node-version` não aparecer (no Windows os ficheiros que começam por ponto às vezes estão escondidos), **não há problema**: o `render.yaml` já define a versão do Node. Podes ignorar.

---

## Parte 3 — Seguir para o Render
Volta ao guia **DEPLOY.md**, Parte 2 ("Publicar no Render"): New → Blueprint → escolher `stayos-miramar` → Apply.

---

## Se preferires evitar o GitHub
Usa o **Replit** (https://replit.com): "Create Repl" → **Node.js** → arrasta os mesmos ficheiros para dentro → carrega em **Run**. Dá também um link público. Aviso: o Replit muda de interface com frequência.

---

### Resumo numa linha
GitHub → New repository (`stayos-miramar`, Public) → "uploading an existing file" → arrastar **o conteúdo** de `StayOS-system` → **Commit changes**.
