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
    banners: 'assets/imgs/1.png',
    icons: 'assets/imgs/github.png',
    titles: 'Eduwings Global',
    description:
        'This app Eduwings Global for the company Eduwings Global is made by me in Flutter for students so they can check their profile anytime.',
    links: 'https://github.com/arpankanwer/eduwings_global',
  ),
  ProjectUtils(
    banners: 'assets/imgs/2.png',
    icons: 'assets/imgs/github.png',
    titles: 'Chatie',
    description:
        'A real-time group chat application that allows users to send messages using Firebase Storage.',
    links: 'https://github.com/arpankanwer/chatie/',
  ),
  // ProjectUtils(
  //   banners: 'assets/imgs/3.png',
  //   icons: 'assets/imgs/flutter.png',
  //   titles: 'Exercise App',
  //   description:
  //       'This is a just Fully function Exercise App by using flutter, source code is also available, check below.',
  // ),
  // ProjectUtils(
  //   banners: 'assets/imgs/4.png',
  //   icons: 'assets/imgs/flutter.png',
  //   titles: 'Awesome Plant App UI',
  //   description:
  //       'This is a just Plant App UI by using flutter, source code is also available, check below.',
  // ),
];
