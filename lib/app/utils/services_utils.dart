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
    description: "Created several applications using flutter for all platforms",
    tool: ['Flutter', 'Dart', 'Firebase', 'MongoDb', 'Sql', 'PHP'],
    level: 1,
  ),
  Skill(
    name: 'Frameworks',
    icon: 'assets/icons/website.svg',
    description: "Created apps in these frameworks",
    tool: ['Flutter', 'Spring Boot', '.NET', 'Angular'],
    level: 1,
  ),
  Skill(
    name: 'Programming Languages',
    icon: 'assets/icons/graphic.svg',
    description: "Knowledgable in many programming languages and frameworks",
    tool: [
      'Java',
      'PHP',
      'Python',
      'Dart',
      'C++',
      'C#',
      'HTML, CSS and Javascript'
    ],
    level: 1,
  ),
  Skill(
    name: 'Version Control',
    icon: 'assets/icons/android.svg',
    description: "Used version control in many projects",
    tool: ['Git', 'TFS'],
    level: 1,
  ),
  Skill(
    name: 'Database',
    icon: 'assets/icons/database.svg',
    description: "Database management and creation",
    tool: ['Sql', 'MongoDB', 'Firestore Database'],
    level: 1,
  )
];
