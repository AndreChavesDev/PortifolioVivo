import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  name: "André Cruz",
  title: "Desenvolvedor Criativo & Arquiteto de Software",
  bio: "Eu construo aplicações web bonitas, responsivas e inteligentes, do frontend ao backend.",
  profileImageUrl: "https://i.pravatar.cc/300?u=andre-cruz",
  about: {
    short: "Um desenvolvedor apaixonado com talento para UI/UX e arquitetura de sistemas.",
    long: "Eu sou um desenvolvedor full-stack baseado na Cidade Digital, com uma paixão por criar experiências web envolventes e sistemas robustos. Com vários anos de experiência, aprimorei minhas habilidades em React, Node.js, e tecnologias de nuvem. Eu prospero na resolução de problemas complexos e na transformação de ideias em realidade, desde o design inicial no Figma até o deploy final na Vercel e Render."
  },
  skills: [
    { name: "React" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "MongoDB" },
    { name: "Tailwind CSS" },
    { name: "Framer Motion" },
    { name: "JWT" },
    { name: "Git & GitHub" },
    { name: "Docker" },
    { name: "Vercel" },
    { name: "Render" }
  ],
  projects: [
    {
      id: '1',
      title: "Plataforma de E-Commerce",
      description: "Um site de e-commerce moderno e responsivo com um carrinho de compras completo.",
      longDescription: "Este projeto é uma solução completa de e-commerce construída com Next.js e Tailwind CSS. Possui um catálogo de produtos dinâmico, autenticação de usuário, e integração com gateway de pagamento.",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      imageUrl: "https://picsum.photos/seed/project1/600/400",
      githubUrl: "https://github.com",
      liveUrl: "#"
    },
    {
      id: '2',
      title: "Dashboard de Análise de Dados",
      description: "Um painel para visualizar conjuntos de dados com gráficos e filtros interativos.",
      longDescription: "Construído com React e uma API em Node.js, este dashboard fornece uma ferramenta poderosa para análise de dados com atualizações em tempo real e filtros personalizáveis.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      imageUrl: "https://picsum.photos/seed/project2/600/400",
      githubUrl: "https://github.com",
    },
    {
      id: '3',
      title: "Sistema de Gerenciamento de Conteúdo",
      description: "Um CMS (Headless) para gerenciar conteúdo de blogs e sites de forma dinâmica.",
      longDescription: "Com uma API RESTful construída em Node.js e um painel de administração em React, este sistema permite que os usuários gerenciem conteúdo de forma intuitiva e segura.",
      tags: ["React", "Node.js", "JWT", "MongoDB"],
      imageUrl: "https://picsum.photos/seed/project3/600/400",
      liveUrl: "#"
    }
  ],
  algorithms: [
    {
      id: 'alg1',
      name: 'Busca Binária',
      language: 'typescript',
      description: 'Um algoritmo de busca eficiente para encontrar um item em uma lista ordenada. Ele funciona dividindo repetidamente pela metade a porção da lista que poderia conter o item, até reduzir as localizações possíveis a apenas uma.',
      codeSnippet: `function binarySearch<T>(arr: T[], target: T): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid; // Retorna o índice do elemento encontrado
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Retorna -1 se o elemento não for encontrado
}`
    },
    {
      id: 'alg2',
      name: 'Quick Sort',
      language: 'javascript',
      description: 'Um algoritmo de ordenação eficiente, do tipo "dividir para conquistar". Ele funciona escolhendo um elemento como pivô e particionando os outros elementos em dois sub-arrays, de acordo com se eles são menores ou maiores que o pivô.',
      codeSnippet: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}`
    }
  ],
  experience: [
    {
      year: "2021 - Presente",
      title: "Engenheiro de Software Sênior na Tech Solutions Inc.",
      description: "Liderando o desenvolvimento de aplicações web full-stack usando React e Node.js. Arquitetando sistemas escaláveis e colaborando com equipes de produto e design."
    },
    {
      year: "2019 - 2021",
      title: "Desenvolvedor Full-Stack na Creative Agency",
      description: "Desenvolvi e mantive aplicações web completas para vários clientes, ganhando experiência em todo o ciclo de vida do desenvolvimento de software."
    },
    {
      year: "2018",
      title: "Início da Jornada Full-Stack",
      description: "Comecei minha jornada no desenvolvimento de software, apaixonando-me pela criação de soluções ponta a ponta."
    }
  ],
  contact: {
    email: "andre.cruz@email.com",
    whatsappNumber: "5511912345678" // Formato internacional com código do país
  },
  resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Substitua pela URL do seu currículo real
};