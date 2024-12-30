class ProjectUtils {
  final String banners;
  final String icons;
  final String titles;
  final String description;
  final String links;
  ProjectUtils({
    required this.banners,
    required this.icons,
    required this.titles,
    required this.description,
    required this.links,
  });
}

List<ProjectUtils> projectUtils = [
  ProjectUtils(
    banners: 'assets/imgs/projects/eduwings_global.png',
    icons: 'assets/imgs/appicons/github.png',
    titles: 'Eduwings Global',
    description:
        'This app Eduwings Global for the company Eduwings Global is made by me in Flutter for students so they can check their profile anytime.',
    links: 'https://github.com/arpankanwer/eduwings_global',
  ),
  ProjectUtils(
    banners: 'assets/imgs/projects/chatie.png',
    icons: 'assets/imgs/appicons/github.png',
    titles: 'Chatie',
    description:
        'A real-time group chat application that allows users to send messages using Firebase Storage.',
    links: 'https://github.com/arpankanwer/chatie/',
  ),
  ProjectUtils(
    banners: 'assets/imgs/projects/gigjet.png',
    icons: 'assets/imgs/appicons/youtube.png',
    titles: 'GigJet - where tasks meet talent',
    description:
        'GigJet is a full-stack capstone-winning mobile app for iOS and Android. It connects taskers who post tasks with talent seekers who apply to complete them, offering features like chat, task tracking, and geolocation.',
    links: 'https://www.youtube.com/watch?v=M1adKEKeFLo',
  ),
  ProjectUtils(
    banners: 'assets/imgs/projects/smartgarden.png',
    icons: 'assets/imgs/appicons/github.png',
    titles: 'SmartGarden - Automated Garden Management',
    description:
        'SmartGarden is a project featuring a zone-divided raised garden bed operated using motorized valves controlled by a microcontroller. It includes an internally hosted website for seamless garden management.',
    links: 'https://github.com/Evertz-Garden/SmartGarden',
  )
];
