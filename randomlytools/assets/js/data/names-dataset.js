/**
 * Curated Dataset for Random Name Generator
 * Organized by Country / Region with authentic First Names and Surnames
 */

export const NamesData = {
  countries: [
    { code: "all", name: "International / Mixed" },
    { code: "in", name: "India" },
    { code: "us", name: "United States" },
    { code: "uk", name: "United Kingdom" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "jp", name: "Japan" },
    { code: "de", name: "Germany" },
    { code: "fr", name: "France" },
    { code: "it", name: "Italy" },
    { code: "es", name: "Spain" },
    { code: "br", name: "Brazil" },
    { code: "mx", name: "Mexico" },
    { code: "kr", name: "South Korea" }
  ],

  byCountry: {
    in: {
      male: [
        "Aarav", "Vihaan", "Vivaan", "Aditya", "Reyansh", "Sai", "Arjun", "Kabir", "Krishna", "Ishan",
        "Shaurya", "Atharv", "Advait", "Pranav", "Rohan", "Dev", "Ayaan", "Dhruv", "Krrish", "Aryan",
        "Rishabh", "Yash", "Tanmay", "Ayush", "Rudra", "Varun", "Karan", "Abhimanyu", "Samar", "Vikram"
      ],
      female: [
        "Saanvi", "Aanya", "Aadhya", "Aaradhya", "Ananya", "Pari", "Anika", "Navya", "Diya", "Avani",
        "Myra", "Sara", "Riya", "Kavya", "Isha", "Pooja", "Meera", "Shreya", "Sneha", "Tanvi",
        "Priya", "Nandini", "Anjali", "Riddhi", "Deepika", "Aditi", "Bhavna", "Trisha", "Neha", "Divya"
      ],
      surnames: [
        "Sharma", "Patel", "Verma", "Gupta", "Mehta", "Singh", "Reddy", "Chopra", "Deshmukh", "Kapoor",
        "Joshi", "Nair", "Rao", "Bhat", "Agarwal", "Banerjee", "Chatterjee", "Mukherjee", "Kulkarni", "Iyer",
        "Pillai", "Menon", "Trivedi", "Mishra", "Pandey"
      ]
    },

    us: {
      male: [
        "Liam", "Noah", "Oliver", "James", "Elijah", "William", "Henry", "Lucas", "Benjamin", "Theodore",
        "Alexander", "Jackson", "Ethan", "Mason", "Michael", "Daniel", "Jacob", "Logan", "Aiden", "Samuel",
        "Joseph", "John", "David", "Wyatt", "Carter", "Luke", "Julian", "Grayson", "Levi", "Isaac"
      ],
      female: [
        "Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Isabella", "Ava", "Mia", "Evelyn", "Harper",
        "Luna", "Camila", "Gianna", "Elizabeth", "Eleanor", "Emily", "Abigail", "Chloe", "Mila", "Violet",
        "Penelope", "Aria", "Ella", "Avery", "Hazel", "Nora", "Layla", "Lily", "Aurora", "Nova"
      ],
      surnames: [
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Anderson", "Thomas",
        "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Clark", "Lewis",
        "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Hill", "Adams", "Baker"
      ]
    },

    uk: {
      male: [
        "Oliver", "George", "Arthur", "Noah", "Muhammad", "Leo", "Harry", "Oscar", "Archie", "Henry",
        "Jack", "Charlie", "Freddie", "Theo", "Thomas", "Finley", "Alfie", "Jacob", "William", "Edward",
        "Lucas", "Alexander", "Max", "Isaac", "Daniel", "Mason", "Joshua", "James", "Jaxon", "Logan"
      ],
      female: [
        "Olivia", "Amelia", "Isla", "Ava", "Ivy", "Freya", "Lily", "Florence", "Mia", "Willow",
        "Rosie", "Sophia", "Isabella", "Grace", "Poppy", "Elsie", "Emily", "Ella", "Evie", "Phoebe",
        "Daisy", "Harper", "Sienna", "Charlotte", "Jessica", "Ruby", "Alice", "Hallie", "Maya", "Millie"
      ],
      surnames: [
        "Smith", "Jones", "Taylor", "Brown", "Williams", "Wilson", "Johnson", "Davies", "Robinson", "Wright",
        "Thompson", "Evans", "Walker", "White", "Roberts", "Green", "Hall", "Wood", "Jackson", "Clarke",
        "Edwards", "Hughes", "Turner", "Campbell", "Harrison"
      ]
    },

    ca: {
      male: [
        "Liam", "Noah", "Oliver", "Jackson", "Benjamin", "Leo", "Lucas", "Jack", "William", "Theodore",
        "Logan", "Owen", "Nathan", "Felix", "Ethan", "Henry", "Samuel", "Alexander", "James", "Gabriel",
        "Thomas", "Jacob", "Louis", "Edouard", "Arthur", "Charles", "Theo", "Liam", "Maxime", "Victor"
      ],
      female: [
        "Olivia", "Emma", "Charlotte", "Amelia", "Sophia", "Chloe", "Mia", "Ava", "Lily", "Mila",
        "Isla", "Evelyn", "Alice", "Zoe", "Maya", "Hannah", "Clara", "Florence", "Lea", "Ellie",
        "Rose", "Beatrice", "Rosalie", "Juliette", "Romy", "Zoe", "Eva", "Adele", "Camille", "Victoria"
      ],
      surnames: [
        "Smith", "Brown", "Tremblay", "Roy", "Gagnon", "Wilson", "MacDonald", "Johnson", "Taylor", "Cote",
        "Campbell", "Leblanc", "Lee", "Jones", "Gauthier", "Morin", "Bouchard", "Williams", "Martin", "Belanger",
        "Pelletier", "Lavoie", "Fortin", "Simard", "Boucher"
      ]
    },

    au: {
      male: [
        "Oliver", "Noah", "Leo", "William", "Henry", "Charlie", "Jack", "Theodore", "Hudson", "Luca",
        "Thomas", "James", "Lucas", "Mason", "Ethan", "Archie", "Levi", "Max", "Elijah", "Harrison",
        "Alexander", "Cooper", "Lachlan", "Samuel", "Finn", "Oscar", "Liam", "Harry", "Isaac", "Jordan"
      ],
      female: [
        "Charlotte", "Amelia", "Isla", "Olivia", "Mia", "Ava", "Grace", "Willow", "Harper", "Hazel",
        "Ella", "Matilda", "Sophie", "Ruby", "Ivy", "Chloe", "Evie", "Florence", "Isabella", "Daisy",
        "Poppy", "Zara", "Georgia", "Freya", "Sienna", "Audrey", "Stella", "Mila", "Zoe", "Maya"
      ],
      surnames: [
        "Smith", "Jones", "Williams", "Brown", "Wilson", "Taylor", "Johnson", "White", "Martin", "Anderson",
        "Thompson", "Nguyen", "Thomas", "Walker", "Harris", "Lee", "Ryan", "Robinson", "Kelly", "King",
        "Watson", "Davis", "Wright", "Simpson", "Clarke"
      ]
    },

    jp: {
      male: [
        "Ren", "Haruto", "Yuma", "Sota", "Itsuki", "Minato", "Riku", "Aoi", "Ritsu", "Kenta",
        "Daiki", "Takumi", "Shohei", "Hiroshi", "Kenji", "Kazuki", "Yamato", "Ryota", "Kaito", "Hayato",
        "Shota", "Taiga", "Shin", "Yuki", "Koki", "Tsubasa", "Naoki", "Daisuke", "Ryusei", "Sousuke"
      ],
      female: [
        "Himari", "Rin", "Yuina", "Mei", "Tsumugi", "Sakura", "Aoi", "Mitsuki", "Yua", "Koharu",
        "Chiyo", "Kanon", "Riko", "Nanami", "Kaede", "Yui", "Hina", "Akari", "Mio", "Hana",
        "Suzu", "Ayaka", "Honoka", "Haruka", "Misaki", "Kana", "Nanako", "Momoka", "Yuka", "Emi"
      ],
      surnames: [
        "Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Kato",
        "Yoshida", "Yamada", "Matsumoto", "Inoue", "Kimura", "Hayashi", "Shimizu", "Yamazaki", "Mori", "Abe",
        "Ikeda", "Hashimoto", "Yamashita", "Ishikawa", "Nakajima"
      ]
    },

    de: {
      male: [
        "Noah", "Matteo", "Elias", "Finn", "Leon", "Theo", "Paul", "Emil", "Lukas", "Jonas",
        "Felix", "Maximilian", "Henry", "Anton", "Luis", "Ben", "Luca", "Liam", "Milan", "David",
        "Niklas", "Tim", "Philipp", "Moritz", "Julian", "Jan", "Simon", "Fabian", "Tobias", "Alexander"
      ],
      female: [
        "Emilia", "Mia", "Sophia", "Emma", "Hannah", "Lina", "Mila", "Ella", "Klara", "Lea",
        "Marie", "Ida", "Mathilda", "Frieda", "Charlotte", "Lia", "Emily", "Leni", "Laura", "Anna",
        "Johanna", "Luisa", "Nele", "Sophie", "Greta", "Lara", "Amelie", "Elena", "Marlene", "Victoria"
      ],
      surnames: [
        "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann",
        "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann",
        "Braun", "Krüger", "Hofmann", "Hartmann", "Lange"
      ]
    },

    fr: {
      male: [
        "Gabriel", "Léo", "Raphaël", "Louis", "Arthur", "Jules", "Maël", "Lucas", "Adam", "Tiago",
        "Hugo", "Noah", "Liam", "Paul", "Ethan", "Sacha", "Gabin", "Isaac", "Mohamed", "Nathan",
        "Antoine", "Maxime", "Alexandre", "Julien", "Clément", "Bastien", "Romain", "Théo", "Enzo", "Mathéo"
      ],
      female: [
        "Jade", "Louise", "Ambre", "Alba", "Emma", "Rose", "Alice", "Romy", "Anna", "Lina",
        "Léna", "Mia", "Lou", "Julia", "Chloé", "Agathe", "Iris", "Léa", "Inès", "Mila",
        "Manon", "Camille", "Juliette", "Zoé", "Léonie", "Margaux", "Elena", "Victoire", "Capucine", "Adèle"
      ],
      surnames: [
        "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent",
        "Simon", "Michel", "Lefebvre", "Leroy", "Roux", "David", "Bertrand", "Morel", "Fournier", "Girard",
        "Bonnet", "Dupont", "Lambert", "Fontaine", "Rousseau"
      ]
    },

    it: {
      male: [
        "Leonardo", "Francesco", "Tommaso", "Edoardo", "Alessandro", "Lorenzo", "Mattia", "Gabriele", "Riccardo", "Andrea",
        "Diego", "Nicolò", "Matteo", "Giuseppe", "Federico", "Antonio", "Samuele", "Giovanni", "Pietro", "Christian",
        "Davide", "Filippo", "Marco", "Simone", "Luca", "Michele", "Alessio", "Giacomo", "Elia", "Manuel"
      ],
      female: [
        "Sofia", "Aurora", "Giulia", "Ginevra", "Vittoria", "Beatrice", "Alice", "Ludovica", "Emma", "Matilde",
        "Chiara", "Giorgia", "Anna", "Camilla", "Nicole", "Bianca", "Greta", "Gaia", "Noemi", "Martina",
        "Elena", "Francesca", "Sara", "Gioia", "Arianna", "Viola", "Adele", "Margherita", "Caterina", "Elisa"
      ],
      surnames: [
        "Rossi", "Russo", "Ferrari", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco",
        "Bruno", "Gallo", "Conti", "De Luca", "Mancini", "Costa", "Giordano", "Rizzo", "Lombardi", "Moretti",
        "Barbieri", "Fontana", "Santoro", "Mariani", "Rinaldi"
      ]
    },

    es: {
      male: [
        "Hugo", "Mateo", "Martín", "Lucas", "Leo", "Daniel", "Alejandro", "Manuel", "Pablo", "Álvaro",
        "Adrián", "Enzo", "Mario", "Diego", "David", "Oliver", "Marcos", "Thiago", "Javier", "Marco",
        "Gonzalo", "Carlos", "Nicolás", "Sergio", "Iker", "Guillermo", "Jorge", "Gabriel", "Bruno", "Samuel"
      ],
      female: [
        "Lucía", "Sofía", "Martina", "María", "Valeria", "Julia", "Paula", "Emma", "Daniela", "Carla",
        "Alma", "Olivia", "Sara", "Carmen", "Vega", "Mía", "Noa", "Lara", "Claudia", "Chloé",
        "Alba", "Triana", "Elena", "Alejandra", "Adriana", "Manuela", "Inés", "Celia", "Aitana", "Marina"
      ],
      surnames: [
        "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín",
        "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro",
        "Torres", "Domínguez", "Vázquez", "Ramos", "Gil"
      ]
    },

    br: {
      male: [
        "Miguel", "Arthur", "Gael", "Heitor", "Theo", "Bernardo", "Gabriel", "Davi", "Samuel", "Noah",
        "Lorenzo", "Benjamin", "Pedro", "Lucas", "Matheus", "Nicolas", "Henrique", "Murilo", "Isaac", "Lucca",
        "Felipe", "Gustavo", "Rafael", "Enzo", "Guilherme", "Joao", "Levi", "Daniel", "Eduardo", "Vitor"
      ],
      female: [
        "Helena", "Alice", "Laura", "Maria Alice", "Sophia", "Manuela", "Maitê", "Liz", "Cecília", "Isabella",
        "Luísa", "Eloá", "Heloísa", "Júlia", "Ayla", "Maria Clara", "Lorena", "Lívia", "Maria Luísa", "Giovanna",
        "Mariana", "Lara", "Beatriz", "Antonella", "Melissa", "Yasmin", "Emanuelly", "Rebeca", "Clara", "Isadora"
      ],
      surnames: [
        "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
        "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
        "Rocha", "Dias", "Nascimento", "Andrade", "Moreira"
      ]
    },

    mx: {
      male: [
        "Santiago", "Mateo", "Sebastián", "Leonardo", "Matías", "Emiliano", "Diego", "Daniel", "Miguel Ángel", "Alexander",
        "Alejandro", "Jesús", "Gael", "David", "Fernando", "Carlos", "Ángel", "Gabriel", "Samuel", "Rodrigo",
        "Eduardo", "Mauricio", "Axel", "Juan Pablo", "José", "Maximiliano", "Emilio", "Rafael", "Adrián", "Luis"
      ],
      female: [
        "Sofía", "Valentina", "Regina", "María José", "Ximena", "Camila", "María Fernanda", "Valeria", "Natalia", "Renata",
        "Isabella", "Victoria", "Daniela", "Mariana", "Andrea", "Romina", "Jimena", "Samantha", "Alexa", "Carolina",
        "Fernanda", "Paulina", "Fátima", "Abril", "Guadalupe", "Dulce", "Aitana", "Alondra", "Luciana", "Aranza"
      ],
      surnames: [
        "Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez", "Ramírez", "Cruz",
        "Flores", "Gómez", "Morales", "Vázquez", "Reyes", "Jiménez", "Torres", "Díaz", "Gutiérrez", "Ruiz",
        "Mendoza", "Aguilar", "Ortiz", "Castillo", "Moreno"
      ]
    },

    kr: {
      male: [
        "Min-jun", "Seo-jun", "Ha-joon", "Do-yoon", "Eun-woo", "Si-woo", "Ji-ho", "Ye-jun", "Yu-jun", "Joo-won",
        "Min-jae", "Hyun-woo", "Joon-seo", "Do-hyun", "Geon-woo", "Woo-jin", "Seung-woo", "Ji-hoon", "Sung-min", "Tae-yang",
        "Jun-ho", "Dong-hyun", "Sang-woo", "Jae-hyun", "Kwang-min", "Young-ho", "Tae-min", "Bo-gum", "Jin-woo", "Min-ho"
      ],
      female: [
        "Seo-ah", "Ha-yoon", "Ji-an", "Seo-yoon", "Ah-rin", "Ha-eun", "Ji-woo", "Soo-ah", "Ji-yoo", "Chae-won",
        "Min-seo", "Yu-na", "Eun-seo", "Da-eun", "Ye-eun", "Su-bin", "Na-eun", "Bo-min", "Ji-min", "Hye-jin",
        "So-hee", "Yoo-jin", "Sun-mi", "Hae-won", "Min-ji", "Chae-young", "Ye-ji", "Ji-eun", "So-yeon", "Yoon-ah"
      ],
      surnames: [
        "Kim", "Lee", "Park", "Choi", "Jung", "Kang", "Cho", "Yoon", "Jang", "Lim",
        "Han", "Oh", "Seo", "Shin", "Kwon", "Hwang", "Ahn", "Song", "Ryu", "Hong",
        "Ko", "Moon", "Yang", "Son", "Bae"
      ]
    }
  },

  // Backwards compatibility helpers
  get maleFirst() {
    return Object.values(this.byCountry).flatMap(c => c.male);
  },
  get femaleFirst() {
    return Object.values(this.byCountry).flatMap(c => c.female);
  },
  get lastNames() {
    return Object.values(this.byCountry).flatMap(c => c.surnames);
  }
};
