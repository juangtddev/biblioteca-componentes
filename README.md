# Biblioteca de Blocos de UI (Landing Pages)

Este projeto é minha biblioteca pessoal de blocos de UI (Seções) para agilizar o desenvolvimento de landing pages como freelancer. O foco é a máxima reusabilidade e flexibilidade, permitindo criar sites para clientes de forma rápida e consistente.

## 🛠️ Stack Tecnológica

- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Componentes Base:** shadcn/ui
- **Validação de Dados:** Zod

---

## 🏛️ Arquitetura e Filosofia

O pilar deste projeto é a **portabilidade**. Cada bloco é desenhado para ser "copiado e colado" em um novo projeto com o mínimo de atrito.

### 1. Arquitetura por Feature (Co-location)

Cada bloco (seja um `template` como o Header, ou um `block` como um Hero) é auto-contido em sua própria pasta.

Exemplo (`/src/components/templates/Header/`):

- `Header.tsx`: O componente React (a estrutura).
- `header.schema.ts`: O "contrato" dos dados (schema Zod).
- `data.example.json`: Um arquivo de dados de exemplo (o conteúdo e tema).
- `index.ts`: O exportador do componente.

### 2. Dados via JSON + Validação com Zod

Os componentes são "burros". Eles não contêm _conteúdo_ (texto, links) nem _estilos_ fixos.

- Todo o **conteúdo** (textos, URLs) é injetado via `props` (`data`).
- Os dados são lidos de um arquivo **JSON** (`data.example.json`).
- O **Zod** (`.schema.ts`) valida esse JSON em tempo de execução (`schema.parse(jsonData)`), garantindo que os dados estão corretos e prevenindo erros.

### 3. Estilização Flexível com CSS Variables

Para permitir máxima flexibilidade de temas por cliente (cores, fontes, tamanhos), usamos CSS Variables controladas pelo JSON.

1.  O `data.example.json` define os valores de estilo na seção `styles`.
    ```json
    "styles": {
      "--header-bg": "hsl(0 0% 100%)",
      "--primary": "hsl(222 47% 11%)",
      "--header-height": "4rem"
    }
    ```
2.  O componente React (`Header.tsx`) aplica esses valores como CSS variables no seu elemento raiz.
    ```tsx
    <header style={{ ...data.styles } as React.CSSProperties}>...</header>
    ```
3.  O Tailwind no componente usa essas variáveis (com valores de fallback).
    ```tsx
    <div className="h-(--header-height,4rem) bg-(--header-bg,white)">...</div>
    ```

---

## 🚀 Rodando o Projeto

1.  Clone o repositório:
    ```bash
    git clone [URL-DO-SEU-REPOSITORIO]
    cd [NOME-DO-PROJETO]
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
4.  Acesse `http://localhost:3000` para ver os blocos em ação (renderizados na `app/page.tsx`).

---

## 🏗️ Como Adicionar um Novo Bloco

1.  Crie uma nova branch (ex: `feat/block-hero`).
2.  Crie a pasta do bloco (ex: `/src/components/blocks/Hero`).
3.  **Definir o Schema:** Crie `hero.schema.ts`. Defina a "forma" dos dados com Zod, incluindo uma seção `styles: z.object({...})` para as CSS Variables.
4.  **Criar Dados de Exemplo:** Crie `data.example.json` com base no schema.
5.  **Construir o Componente:** Crie `Hero.tsx`.
    - Deve receber `data: HeroData` como prop (onde `HeroData` é o tipo inferido do Zod).
    - Aplicar os `data.styles` como CSS variables no elemento raiz.
    - Usar Tailwind com as variáveis (ex: `text-(--hero-title-color)`).
6.  **Testar na Home:** Importe o bloco e seu JSON na `app/page.tsx`, valide com `.parse()` e renderize o componente.
7.  Faça o commit (`feat(blocks): criar componente Hero`) e abra a PR.
