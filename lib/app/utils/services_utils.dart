class Skill {
  final String name;
  final String icon;
  final List<String> tool;
  final String description;
  final double level;

  Skill(
      {required this.name,
      required this.icon,
      required this.description,
      required this.tool,
      required this.level});
}

List<Skill> servicesUtils = [
  Skill(
    name: 'Flutter App Development',
    icon: 'assets/icons/flutter.svg',
    description:
        'Developed cross-platform applications using Flutter, implementing responsive UIs and integrating services like Firebase.',
    tool: ['Flutter and Dart', 'Firebase', 'SQLite'],
    level: 1,
  ),
  Skill(
    name: 'Web Development Frameworks',
    icon: 'assets/icons/web_development.svg',
    description:
        'Built web applications utilizing modern frameworks, ensuring scalability and performance.',
    tool: ['Angular/ReactJS', 'Spring Boot', '.NET'],
    level: 1,
  ),
  Skill(
    name: 'Programming Languages',
    icon: 'assets/icons/graphic.svg',
    description:
        'Proficient in multiple programming languages, enabling versatile software development across various domains.',
    tool: ['Java/Python', 'C++/C#', 'HTML/CSS/Javascript'],
    level: 1,
  ),
  Skill(
    name: 'Version Control Systems',
    icon: 'assets/icons/version.svg',
    description:
        'Experienced in collaborative development using version control systems, managing codebases effectively.',
    tool: ['Git', 'GitHub', 'TFS'],
    level: 1,
  ),
  Skill(
    name: 'Database Management',
    icon: 'assets/icons/database.svg',
    description:
        'Skilled in designing and managing databases, ensuring data integrity and optimal performance.',
    tool: ['MySQL', 'MongoDB', 'Firestore'],
    level: 1,
  ),
  Skill(
    name: 'Software Testing & Quality Assurance',
    icon: 'assets/icons/testing.svg',
    description:
        'Conducted comprehensive testing to ensure software reliability and performance.',
    tool: ['JUnit', 'Selenium', 'Postman'],
    level: 1,
  ),
];
