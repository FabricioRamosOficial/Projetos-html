document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const langToggleBtn = document.getElementById('lang-toggle');
    const themeToggleBtn = document.getElementById('theme-toggle'); // NOVO: Botão de tema

    const body = document.body;
    let presentationInterval;
    let currentSlide = 0;
    const sections = Array.from(document.querySelectorAll('.knowledge-section'));

    // --- Lógica de Modo Claro/Escuro ---
    // Função para aplicar o tema salvo
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light-mode') {
            body.classList.add('light-mode');
            // Atualiza o texto do botão para "Modo Escuro" quando o modo claro está ativo
            themeToggleBtn.innerHTML = themeToggleBtn.dataset.en === '🌙 Dark Mode' ? '🌙 Dark Mode' : '🌙 Modo Escuro';
        } else {
            // Garante que o modo escuro é o padrão e o texto do botão é "Modo Claro"
            body.classList.remove('light-mode');
            themeToggleBtn.innerHTML = themeToggleBtn.dataset.pt === '☀️ Modo Claro' ? '☀️ Modo Claro' : '☀️ Light Mode';
        }
    }

    // Função para alternar o tema
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode'); // Salva a preferência
            // Atualiza o texto para "Modo Claro"
            themeToggleBtn.innerHTML = themeToggleBtn.dataset.pt === '☀️ Modo Claro' ? '☀️ Modo Claro' : '☀️ Light Mode';
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode'); // Salva a preferência
            // Atualiza o texto para "Modo Escuro"
            themeToggleBtn.innerHTML = themeToggleBtn.dataset.en === '🌙 Dark Mode' ? '🌙 Dark Mode' : '🌙 Modo Escuro';
        }
    });

    // Aplica o tema salvo ao carregar a página
    applySavedTheme();

    // --- Restante do seu código JavaScript (mantenha o que já existe) ---

    // Lógica para rolagem suave para uma seção
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Lógica para iniciar apresentação
    function startPresentation() {
        if (presentationInterval) {
            clearInterval(presentationInterval);
        }
        currentSlide = 0;
        scrollToSection(sections[currentSlide].id);

        presentationInterval = setInterval(() => {
            currentSlide++;
            if (currentSlide < sections.length) {
                scrollToSection(sections[currentSlide].id);
            } else {
                clearInterval(presentationInterval);
                playPauseBtn.textContent = playPauseBtn.dataset.pt === '▶️ Iniciar Apresentação' ? '▶️ Iniciar Apresentação' : '▶️ Start Presentation';
            }
        }, 5000); // 5 segundos por slide
        playPauseBtn.textContent = playPauseBtn.dataset.pt === '⏸️ Pausar Apresentação' ? '⏸️ Pausar Apresentação' : '⏸️ Pause Presentation';
    }

    // Lógica para pausar/retomar apresentação
    playPauseBtn.addEventListener('click', () => {
        if (presentationInterval) {
            clearInterval(presentationInterval);
            presentationInterval = null;
            playPauseBtn.textContent = playPauseBtn.dataset.pt === '▶️ Iniciar Apresentação' ? '▶️ Iniciar Apresentação' : '▶️ Start Presentation';
        } else {
            startPresentation();
        }
    });

    // Lógica para resetar apresentação
    resetBtn.addEventListener('click', () => {
        clearInterval(presentationInterval);
        presentationInterval = null;
        currentSlide = 0;
        scrollToSection('basics'); // Volta para a primeira seção
        playPauseBtn.textContent = playPauseBtn.dataset.pt === '▶️ Iniciar Apresentação' ? '▶️ Iniciar Apresentação' : '▶️ Start Presentation';
    });

    // --- Lógica de Idioma (manter ou ajustar conforme necessário) ---
    const translations = {
        pt: {
            "Portfólio de Conhecimentos Java": "Portfólio de Conhecimentos Java",
            "Portfólio de Conhecimentos": "Portfólio de Conhecimentos",
            "▶️ Iniciar Apresentação": "▶️ Iniciar Apresentação",
            "⏸️ Pausar Apresentação": "⏸️ Pausar Apresentação",
            "🔄 Resetar": "🔄 Resetar",
            "Switch to English": "Switch to English",
            "☀️ Modo Claro": "☀️ Modo Claro", // Adicione aqui
            "🌙 Modo Escuro": "🌙 Modo Escuro", // Adicione aqui
            "Uma demonstração interativa de conhecimentos em Java. Use os controles no topo para iniciar uma apresentação automática ou explore manualmente.": "Uma demonstração interativa de conhecimentos em Java. Use os controles no topo para iniciar uma apresentação automática ou explore manualmente.",
            "Aprenda o Básico": "Aprenda o Básico",
            "Sintaxe Básica": "Sintaxe Básica",
            "A estrutura fundamental de um programa Java, incluindo a declaração de classe e o método main.": "A estrutura fundamental de um programa Java, incluindo a declaração de classe e o método main.",
            "🔗 Ver Documentação": "🔗 Ver Documentação",
            "Ver Exemplo": "Ver Exemplo",
            "Ciclo de Vida de um Programa": "Ciclo de Vida de um Programa",
            "Do código-fonte (.java) à compilação (.class) e execução (JVM).": "Do código-fonte (.java) à compilação (.class) e execução (JVM).",
            "Ver Explicação": "Ver Explicação",
            "Tipos de Dados": "Tipos de Dados",
            "Java possui tipos de dados primitivos (int, double, boolean) e tipos de referência (String, Objetos).": "Java possui tipos de dados primitivos (int, double, boolean) e tipos de referência (String, Objetos).",
            "Variáveis e Escopos": "Variáveis e Escopos",
            "Onde as variáveis são acessíveis: escopo de classe (static), de instância e local (método).": "Onde as variáveis são acessíveis: escopo de classe (static), de instância e local (método).",
            "Type Casting": "Type Casting",
            "Conversão de um tipo de dado para outro, seja implícita (widening) ou explícita (narrowing).": "Conversão de um tipo de dado para outro, seja implícita (widening) ou explícita (narrowing).",
            "Programação Orientada a Objetos": "Programação Orientada a Objetos",
            "Básicos de OOP": "Básicos de OOP",
            "OOP se baseia em quatro pilares: Encapsulamento, Herança, Polimorfismo e Abstração.": "OOP se baseia em quatro pilares: Encapsulamento, Herança, Polimorfismo e Abstração.",
            "Ver Conceitos": "Ver Conceitos",
            "Classes e Objetos": "Classes e Objetos",
            "Classes são os 'moldes' e objetos são as 'instâncias' criadas a partir desses moldes.": "Classes são os 'moldes' e objetos são as 'instâncias' criadas a partir desses moldes.",
            "Atributos e Métodos": "Atributos e Métodos",
            "Atributos (variáveis) definem o estado de um objeto, enquanto métodos (funções) definem seu comportamento.": "Atributos (variáveis) definem o estado de um objeto, enquanto métodos (funções) definem seu comportamento.",
            "Modificadores de Acesso": "Modificadores de Acesso",
            "Controlam a visibilidade de classes, atributos e métodos (public, private, protected, default).": "Controlam a visibilidade de classes, atributos e métodos (public, private, protected, default).",
            "Palavra-chave static": "Palavra-chave static",
            "Define membros que pertencem à classe em si, não a uma instância específica.": "Define membros que pertencem à classe em si, não a uma instância específica.",
            "Palavra-chave final": "Palavra-chave final",
            "Usada para criar constantes (variáveis), impedir a sobrescrita de métodos ou a herança de classes.": "Usada para criar constantes (variáveis), impedir a sobrescrita de métodos ou a herança de classes.",
            "Classes Aninhadas": "Classes Aninhadas",
            "Uma classe declarada dentro de outra. Pode ser estática (Nested) ou não-estática (Inner).": "Uma classe declarada dentro de outra. Pode ser estática (Nested) ou não-estática (Inner).",
            "Pacotes": "Pacotes",
            "Usados para agrupar classes relacionadas e evitar conflitos de nomes. Correspondem à estrutura de diretórios.": "Usados para agrupar classes relacionadas e evitar conflitos de nomes. Correspondem à estrutura de diretórios.",
            "Programação Funcional": "Programação Funcional",
            "Interfaces Funcionais": "Interfaces Funcionais",
            "Uma interface com apenas um método abstrato. É o alvo para expressões lambda e referências de método.": "Uma interface com apenas um método abstrato. É o alvo para expressões lambda e referências de método.",
            "Stream API": "Stream API",
            "Uma forma declarativa e funcional de processar coleções de dados em sequência.": "Uma forma declarativa e funcional de processar coleções de dados em sequência.",
            "Web Frameworks": "Web Frameworks",
            "Spring Boot": "Spring Boot",
            "Framework que simplifica a criação de aplicações Spring autônomas e prontas para produção, com configuração automática e servidor embutido.": "Framework que simplifica a criação de aplicações Spring autônomas e prontas para produção, com configuração automática e servidor embutido.",
            "Tópicos Diversos": "Tópicos Diversos",
            "Criptografia": "Criptografia",
            "Uso de APIs Java (JCA/JCE) para operações criptográficas como hashing e criptografia.": "Uso de APIs Java (JCA/JCE) para operações criptográficas como hashing e criptografia.",
            "Concorrência (Threads)": "Concorrência (Threads)",
            "Gerenciamento de múltiplas tarefas executando simultaneamente para melhorar o desempenho.": "Gerenciamento de múltiplas tarefas executando simultaneamente para melhorar o desempenho.",
            "Java NIO": "Java NIO",
            "API para operações de I/O de alta performance, utilizando buffers e canais para interagir com dados.": "API para operações de I/O de alta performance, utilizando buffers e canais para interagir com dados.",
            "&copy; 2024 Portfólio de Conhecimentos Java. Desenvolvido por <a href='https://github.com/FabricioRamosOficial' target='_blank' rel='noopener noreferrer'>Fabricio Ramos Coelho</a>. Todos os direitos reservados.": "&copy; 2024 Portfólio de Conhecimentos Java. Desenvolvido por <a href='https://github.com/FabricioRamosOficial' target='_blank' rel='noopener noreferrer'>Fabricio Ramos Coelho</a>. Todos os direitos reservados."
        },
        en: {
            "Portfólio de Conhecimentos Java": "Java Knowledge Portfolio",
            "Portfólio de Conhecimentos": "Knowledge Portfolio",
            "▶️ Iniciar Apresentação": "▶️ Start Presentation",
            "⏸️ Pausar Apresentação": "⏸️ Pause Presentation",
            "🔄 Resetar": "🔄 Reset",
            "Mudar para Português": "Mudar para Português",
            "☀️ Modo Claro": "☀️ Light Mode", // Adicione aqui
            "🌙 Dark Mode": "🌙 Dark Mode", // Adicione aqui
            "Uma demonstração interativa de conhecimentos em Java. Use os controles no topo para iniciar uma apresentação automática ou explore manualmente.": "An interactive demonstration of Java knowledge. Use the controls at the top to start an automatic presentation, or explore manually.",
            "Aprenda o Básico": "Learn the Basics",
            "Sintaxe Básica": "Basic Syntax",
            "A estrutura fundamental de um programa Java, incluindo a declaração de classe e o main method.": "The fundamental structure of a Java program, including the class declaration and the main method.",
            "🔗 View Docs": "🔗 View Docs",
            "View Example": "View Example",
            "Lifecycle of a Program": "Lifecycle of a Program",
            "From source code (.java) to compilation (.class) and execution (JVM).": "From source code (.java) to compilation (.class) and execution (JVM).",
            "View Explanation": "View Explanation",
            "Data Types": "Data Types",
            "Java has primitive data types (int, double, boolean) and reference types (String, Objects).": "Java has primitive data types (int, double, boolean) and reference types (String, Objects).",
            "Variables and Scopes": "Variables and Scopes",
            "Where variables are accessible: class scope (static), instance scope, and local scope (method).": "Where variables are accessible: class scope (static), instance scope, and local scope (method).",
            "Type Casting": "Type Casting",
            "Converting one data type to another, either implicitly (widening) or explicitly (narrowing).": "Converting one data type to another, either implicitly (widening) or explicitly (narrowing).",
            "Object Oriented Programming": "Object Oriented Programming",
            "Basics of OOP": "Basics of OOP",
            "OOP is based on four pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction.": "OOP is based on four pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction.",
            "View Concepts": "View Concepts",
            "Classes and Objects": "Classes and Objects",
            "Classes are the 'blueprints' and objects are the 'instances' created from these blueprints.": "Classes are the 'blueprints' and objects are the 'instances' created from these blueprints.",
            "Attributes and Methods": "Attributes and Methods",
            "Attributes (variables) define the state of an object, while methods (functions) define its behavior.": "Attributes (variables) define the state of an object, while methods (functions) define its behavior.",
            "Access Specifiers": "Access Specifiers",
            "Control the visibility of classes, attributes, and methods (public, private, protected, default).": "Control the visibility of classes, attributes, and methods (public, private, protected, default).",
            "Static Keyword": "Static Keyword",
            "Defines members that belong to the class itself, not to a specific instance.": "Defines members that belong to the class itself, not to a specific instance.",
            "Final Keyword": "Final Keyword",
            "Used to create constants (variables), prevent method overriding, or prevent class inheritance.": "Used to create constants (variables), prevent method overriding, or prevent class inheritance.",
            "Nested Classes": "Nested Classes",
            "A class declared within another class. Can be static (Nested) or non-static (Inner).": "A class declared within another class. Can be static (Nested) or non-static (Inner).",
            "Packages": "Packages",
            "Used to group related classes and avoid naming conflicts. They correspond to the directory structure.": "Used to group related classes and avoid naming conflicts. They correspond to the directory structure.",
            "Functional Programming": "Functional Programming",
            "Functional Interfaces": "Functional Interfaces",
            "An interface with only one abstract method. It's the target for lambda expressions and method references.": "An interface with only one abstract method. It's the target for lambda expressions and method references.",
            "Stream API": "Stream API",
            "A declarative and functional way to process collections of data in a sequence.": "A declarative and functional way to process collections of data in a sequence.",
            "Web Frameworks": "Web Frameworks",
            "Spring Boot": "Spring Boot",
            "Framework that simplifies creating stand-alone, production-grade Spring applications with auto-configuration and an embedded server.": "Framework that simplifies creating stand-alone, production-grade Spring applications with auto-configuration and an embedded server.",
            "Miscellaneous Topics": "Miscellaneous Topics",
            "Cryptography": "Cryptography",
            "Using Java APIs (JCA/JCE) for cryptographic operations like hashing and encryption.": "Using Java APIs (JCA/JCE) for cryptographic operations like hashing and encryption.",
            "Concurrency (Threads)": "Concurrency (Threads)",
            "Managing multiple tasks running concurrently to improve performance.": "Managing multiple tasks running concurrently to improve performance.",
            "Java NIO": "Java NIO",
            "API for high-performance I/O operations, using buffers e canais para interagir com dados.": "API for high-performance I/O operations, using buffers and channels to interact with data.",
            "&copy; 2024 Java Knowledge Portfolio. Developed by <a href='https://github.com/FabricioRamosOficial' target='_blank' rel='noopener noreferrer'>Fabricio Ramos Coelho</a>. All rights reserved.": "&copy; 2024 Java Knowledge Portfolio. Developed by <a href='https://github.com/FabricioRamosOficial' target='_blank' rel='noopener noreferrer'>Fabricio Ramos Coelho</a>. All rights reserved."
        }
    };

    let currentLang = 'pt'; // Define a linguagem inicial como português

    // Função para aplicar as traduções
    function applyLanguage(lang) {
        document.querySelectorAll('[data-pt], [data-en]').forEach(element => {
            if (lang === 'pt' && element.dataset.pt) {
                element.innerHTML = translations.pt[element.dataset.pt] || element.dataset.pt;
                // Para botões de controle que têm texto dinâmico, como o theme-toggle
                if (element.id === 'theme-toggle') {
                    if (body.classList.contains('light-mode')) {
                        element.innerHTML = translations.pt['🌙 Modo Escuro'];
                    } else {
                        element.innerHTML = translations.pt['☀️ Modo Claro'];
                    }
                }
            } else if (lang === 'en' && element.dataset.en) {
                element.innerHTML = translations.en[element.dataset.en] || element.dataset.en;
                // Para botões de controle que têm texto dinâmico
                if (element.id === 'theme-toggle') {
                    if (body.classList.contains('light-mode')) {
                        element.innerHTML = translations.en['🌙 Dark Mode'];
                    } else {
                        element.innerHTML = translations.en['☀️ Light Mode'];
                    }
                }
            }
        });

        // Atualiza o texto do botão de idioma
        if (lang === 'pt') {
            langToggleBtn.textContent = langToggleBtn.dataset.pt;
        } else {
            langToggleBtn.textContent = langToggleBtn.dataset.en;
        }
        currentLang = lang;
        localStorage.setItem('lang', lang); // Salva a preferência de idioma
    }

    // Carregar idioma salvo
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        applyLanguage(savedLang);
    } else {
        applyLanguage(currentLang);
    }

    // Alternar idioma
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        applyLanguage(newLang);
    });
});