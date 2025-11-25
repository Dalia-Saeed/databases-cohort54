
import { client } from "./db_config.js";

async function run() {
    await client.connect();

    console.log("Inserting authors...");
    await client.query(`
        INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
        VALUES
        ('Alice Brown', 'MIT', '1975-04-05', 35, 'female', NULL),
        ('Bob Smith', 'Stanford', '1980-09-11', 42, 'male', 1),
        ('Charlie Lee', 'Harvard', '1988-02-21', 28, 'male', 1),
        ('Diana Rose', 'MIT', '1990-03-10', 22, 'female', 1),
        ('Ethan Clark', 'Oxford', '1979-12-03', 31, 'male', NULL),
        ('Fatima Noor', 'Cambridge', '1985-11-20', 44, 'female', 5),
        ('George Wilson', 'Tokyo University', '1977-06-07', 39, 'male', NULL),
        ('Hana Ali', 'Oxford', '1992-09-15', 25, 'female', 5),
        ('Ian Baker', 'Stanford', '1983-08-12', 33, 'male', 2),
        ('Judy Chan', 'Harvard', '1991-04-25', 27, 'female', 3),
        ('Kevin Park', 'MIT', '1987-09-13', 29, 'male', 1),
        ('Lara Green', 'Cambridge', '1993-11-11', 23, 'female', 6),
        ('Mike Ross', 'Stanford', '1981-12-09', 36, 'male', 2),
        ('Nora Saleh', 'Oxford', '1986-07-17', 40, 'female', 5),
        ('Omar Yassin', 'Tokyo University', '1990-01-30', 21, 'male', 7);
    `);

    console.log("Inserting research papers...");
    await client.query(`
        INSERT INTO research_papers (paper_title, conference, publish_date)
        VALUES
        ('AI Optimization Techniques', 'NeurIPS', '2020-12-05'),
        ('Deep Learning Advances', 'ICML', '2019-08-15'),
        ('Quantum Computing Models', 'QIP', '2021-03-22'),
        ('Natural Language Generation', 'ACL', '2022-07-10'),
        ('Neural Networks Explained', 'AAAI', '2018-02-11'),
        ('GPU Acceleration Methods', 'HPC Asia', '2020-05-19'),
        ('Reinforcement Learning Tricks', 'NeurIPS', '2021-12-09'),
        ('Big Data Analysis', 'KDD', '2020-08-22'),
        ('Robotics and AI', 'ICRA', '2021-04-10'),
        ('Medical Imaging AI', 'MICCAI', '2022-09-05'),
        ('Social Network Mining', 'WWW', '2019-04-14'),
        ('Computer Vision Updates', 'CVPR', '2021-06-20'),
        ('Blockchain Algorithms', 'Crypto', '2019-12-03'),
        ('Cybersecurity Threats', 'BlackHat', '2022-08-10'),
        ('Database Indexing Methods', 'VLDB', '2021-09-01'),
        ('Embedded Systems AI', 'DATE', '2018-03-12'),
        ('Optimization with Metaheuristics', 'GECCO', '2019-07-08'),
        ('Automated Reasoning', 'CADE', '2020-06-17'),
        ('AI in Education', 'EDM', '2022-10-29'),
        ('Search Engine Algorithms', 'SIGIR', '2021-07-15'),
        ('Speech Recognition Models', 'INTERSPEECH', '2020-09-09'),
        ('Energy-Efficient AI', 'ICML', '2021-08-12'),
        ('Ethical AI Frameworks', 'FAccT', '2022-06-09'),
        ('Data Compression Systems', 'ICDE', '2019-03-28'),
        ('Semantic Web Processing', 'ISWC', '2020-11-17'),
        ('Mobile Computing AI', 'MobiCom', '2022-09-14'),
        ('AI Fairness Metrics', 'AIES', '2021-02-25'),
        ('Distributed Systems AI', 'NSDI', '2020-02-18'),
        ('Cloud Optimization', 'SoCC', '2019-10-05'),
        ('Human-Computer Interaction AI', 'CHI', '2021-05-07');
    `);

    console.log("Linking authors to papers...");
    for (let author = 1; author <= 15; author++) {
        for (let paper = author; paper <= author + 2; paper++) {
            await client.query(`
                INSERT INTO author_papers (author_id, paper_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING;
            `, [author, paper]);
        }
    }

    console.log("Seed data inserted.");
    await client.end();
}

run().catch(console.error);
