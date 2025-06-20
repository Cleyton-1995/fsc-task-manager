<h1 align="center">✅ FSC Task Manager</h1>

<p align="center">
  Gerenciador de tarefas moderno e intuitivo, desenvolvido com <strong>React</strong> + <strong>Vite</strong>, com foco em produtividade e boas práticas de código. Ideal para controlar o seu fluxo de tarefas diárias.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-blue?logo=react" alt="React Badge" />
  <img src="https://img.shields.io/badge/Vite-5.1-purple?logo=vite" alt="Vite Badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss" alt="Tailwind CSS Badge" />
</p>

<hr />

<h2>🧪 Tecnologias Utilizadas</h2>

<ul>
  <li><strong>React 18</strong> com <strong>Vite</strong> para build rápido</li>
  <li><strong>Tailwind CSS</strong> + <code>tailwind-variants</code> para estilização moderna</li>
  <li><strong>React Hook Form</strong> para formulários e validações</li>
  <li><strong>@tanstack/react-query</strong> para gerenciamento de dados assíncronos</li>
  <li><strong>json-server</strong> como backend simulado (fake API)</li>
  <li><strong>UUID</strong> para gerar IDs únicas</li>
  <li><strong>Sonner</strong> para notificações toast</li>
  <li><strong>React Transition Group</strong> para animações suaves</li>
</ul>

<hr />

<h2>🚀 Funcionalidades</h2>

<ul>
  <li>✅ Criar, visualizar, editar e remover tarefas</li>
  <li>📌 Marcar tarefas como concluídas</li>
  <li>🔎 Filtros por status</li>
  <li>📁 Armazenamento simulado com <code>json-server</code></li>
  <li>📱 Interface responsiva e leve</li>
</ul>

<hr />

<h2>📦 Como rodar o projeto localmente</h2>

<ol>
  <li><strong>Clone o repositório:</strong><br />
    <code>git clone https://github.com/Cleyton-1995/fsc-task-manager.git</code>
  </li><br />

  <li><strong>Instale as dependências:</strong><br />
    <code>npm install</code> ou <code>yarn</code>
  </li><br />

  <li><strong>Inicie o <code>json-server</code> para simular a API:</strong><br />
    <code>npx json-server --watch db.json --port 3001</code>
  </li><br />

  <li><strong>Inicie a aplicação:</strong><br />
    <code>npm run dev</code>
  </li><br />

  <li><strong>Acesse no navegador:</strong><br />
    <a href="http://localhost:5173" target="_blank">http://localhost:5173</a>
  </li>
</ol>

<hr />

<h2>🖼️ Preview</h2>

<p align="center">
  <!-- Substitua pelos prints reais do app -->
  
![task-manager](https://github.com/user-attachments/assets/0e7ad779-d5a5-4cc9-9ac0-62967cab077e)
  
</p>

<hr />

<h2>🚀 Deploy na Vercel</h2>

<p>
  O projeto pode ser facilmente implantado na <a href="https://vercel.com" target="_blank">Vercel</a>, que é uma plataforma de hospedagem para aplicações front-end modernas como React e Vite.
</p>

<h3>📌 Passos para realizar o deploy:</h3>

<ol>
  <li>
    Acesse o site da <a href="https://vercel.com" target="_blank">Vercel</a> e crie uma conta (ou faça login).
  </li>
  <li>
    Clique em <strong>"New Project"</strong> e importe seu repositório do GitHub.
  </li>
  <li>
    A Vercel detectará automaticamente o framework <code>Vite</code> e preencherá os comandos corretos:
    <ul>
      <li><strong>Build Command:</strong> <code>vite build</code></li>
      <li><strong>Output Directory:</strong> <code>dist</code></li>
    </ul>
  </li>
  <li>
    Clique em <strong>"Deploy"</strong> e aguarde a publicação.
  </li>
  <li>
    Ao final do processo, você receberá uma URL como:<br />
    <code>https://fsc-task-manager.vercel.app</code>
  </li>
</ol>

<h3>🌐 Projeto publicado:</h3>

<p>
  🔗 <a href="https://fsc-task-manager.vercel.app" target="_blank"><strong>https://fsc-task-manager.vercel.app</strong></a>
</p>

<hr />

<h2>📁 Estrutura de Código</h2>

<ul>
  <li><code>src/components</code> – componentes reutilizáveis</li>
  <li><code>src/pages</code> – páginas principais (listagem, criação, edição)</li>
  <li><code>src/services</code> – API com Axios e React Query</li>
  <li><code>src/styles</code> – configuração do Tailwind e temas</li>
</ul>

<hr />

<h2>🧹 Qualidade de Código</h2>

<ul>
  <li>🎯 Eslint + Prettier configurados</li>
  <li>🧼 Husky e Lint-Staged para validações nos commits</li>
  <li>💅 Prettier Plugin Tailwind para ordenação automática de classes</li>
</ul>

<hr />

<h2>👨‍💻 Desenvolvedor</h2>

<p>
  Projeto desenvolvido por <a href="https://github.com/Cleyton-1995" target="_blank"><strong>Cleyton Costa</strong></a><br />
  No curso de <strong>React</strong> da <a href="https://fullstackclub.com.br" target="_blank">Full Stack Club</a>.
</p>
