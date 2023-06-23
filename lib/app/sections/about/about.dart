import 'package:flutter/material.dart';
import 'package:mysite/app/sections/about/about_desktop.dart';
import 'package:mysite/core/res/responsive.dart';

class About extends StatelessWidget {
  const About({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Responsive(
      mobile: AboutDesktop(),
      tablet: AboutDesktop(),
      desktop: AboutDesktop(),
    );
  }
}
